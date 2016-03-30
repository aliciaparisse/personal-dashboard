var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


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

// Mongo DB Part -- Connecting to DB and handling the requests

//Route to get the hiddenCourses of a user
app.get('/mongo/hiddenCourses', function(req,res){
    // Connection URL
    var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        getHiddenCourses(db, "aparisse", (result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    });
})

var getHiddenCourses = function(db, user_id, callback)
{
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


app.put('/mongo/addHiddenCourses', function(req,res){
    // Connection URL
    var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        insertDocuments(db, (result) =>{
            db.close();
            res.send(result);
        })
    });
})


var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('prefs');
    // Insert some documents
    collection.insertMany([
        {user_id : 1, hiddenCourses : [25,45]},
        {user_id : 2, hiddenCourses : [12,24]},
        {user_id : 3, hiddenCourses : [7,85]}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}

app.put('/mongo/addHiddenCourse', function(req,res){
    // Connection URL
    var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
    // Use connect method to connect to the Server
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        upsertHiddenCourse(db, req.body, (result) =>{
            db.close();
            console.log("database closed");
            res.send(result);
        })
    });
})

var upsertHiddenCourse = function(db, doc, callback) {
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

app.put('/mongo/removeHiddenCourse', function(req, res){
    // Connection URL
    var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
    // Use connect method to connect to the Server
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        removeHiddenCourse(db, req.body, (result) =>{
            db.close();
            console.log("database closed");
            res.send(result);
        })
    });
})

var removeHiddenCourse = function(db, doc, callback){
    var collection = db.collection('prefs');
    collection.update(
        //Update criteria
        {user_id:doc.user_id, course_id:doc.course_id},
        //Update
        doc,
        {upsert:true},
        function(err, result){
            console.log("Updated course to false to collection");
            callback(result);
        }
    );
}