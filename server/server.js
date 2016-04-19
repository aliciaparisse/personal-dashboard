var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var test = require('./pointsActivityTreatment')

app.use(express.static('dist'));
app.use(bodyParser.json());

var renderIndex = (req, res) => {
    res.sendFile('/index.html');
}

app.get('/', renderIndex);

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});

var mongodb_url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';

// Mongo DB Part -- Connecting to DB and handling the requests

// GET requests -------------------------

//Route to get the archivedCourses of a user
app.get('/mongo/archivedCourses', function(req,res){
    // Use connect method to connect to the Server
    MongoClient.connect(mongodb_url, function(err, db) {
        assert.equal(null, err);
        getArchivedCourses(db, req.query.userId, (result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    });
})

var getArchivedCourses = function(db, user_id, callback) {
    var collection = db.collection("prefs");
    collection.find(
        //Selection
        {user_id : {$eq : user_id}},
        //Projection
        {course_id:1, _id:0}
    ).toArray(function(err,res){
        callback(res);
    });
}

app.get('/mongo/activity/userActivity', function(req, res){
    // Use connect method to connect to the Server
    MongoClient.connect(mongodb_url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        getUserActivity(db, req.query.userId, (result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    });
})

var getUserActivity = function (db, user_id, callback){
    var collection = db.collection("activity");
    collection.find(
        //Selection
        {userId : {$eq : user_id}},
        //Projection
        {date:1, nbEx:1, _id:0})
    .toArray(function(err,res){
        callback(res);
    });
}

//PUT Requests ---------------------------

app.put('/mongo/addArchivedCourse', function(req,res){
    // Use connect method to connect to the Server
    MongoClient.connect(mongodb_url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        upsertArchivedCourse(db, req.body, (result) =>{
            db.close();
            console.log("database closed");
            res.send(result);
        })
    });
})

var upsertArchivedCourse = function(db, doc, callback) {
    // Get the documents collection
    var collection = db.collection('prefs');
    collection.update(
        //Update criteria
        {course_id:doc.course_id, user_id:doc.user_id},
        //Update
        doc,
        //Upserting
        {upsert:true},
        //Function to execute after the update/upsert
        function(err, result) {
            console.log("Updated course to true to to collection");
            callback(result);
        }
    );
}

app.put('/mongo/removeArchivedCourse', function(req, res){
    // Use connect method to connect to the Server
    console.log(req.body);
    MongoClient.connect(mongodb_url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        removeArchivedCourse(db, req.body, (result) =>{
            db.close();
            console.log("database closed");
            res.send(result);
        })
    });
})

var removeArchivedCourse = function(db, doc, callback){
    var collection = db.collection('prefs');
    collection.remove(
        //Update criteria
        {user_id:doc.user_id, course_id:doc.course_id},
        function(err, result){
            console.log("Updated course to false to collection");
            callback(result);
        }
    );
}

app.put('/mongo/activity/upsertMultiple', function (req, res){
    // Use connect method to connect to the Server
    console.log(req.body);
    MongoClient.connect(mongodb_url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        upsertActivities(db, req.body, (result) =>{
            db.close();
            console.log("database closed");
            res.send(result);
        })
    });
})

var upsertActivities = function (db, docs, callback){
    var collection = db.collection("activity");
    var error, result;
    for (var i = 0 ; i < docs.length ; i++){
        var doc = docs[i];
        collection.update(
            //Update criteria
            {user_id:doc.user_id, date:doc.date},
            //Update
            doc,
            //Upserting
            {upsert:true},
            function(err, res){
                if(err){
                    error = err
                }
                else{
                    result = res;
                }
            }
        )
    }

    callback(result);
}


//test.mainfunc();