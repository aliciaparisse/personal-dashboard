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

//Route to get the archivedCourses of a user
app.get('/mongo/archivedCourses', function(req,res){
    // Connection URL
    var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        getArchivedCourses(db, "aparisse", (result) => {
            db.close();
            console.log(result);
            res.send(result);
        })
    });
})

var getArchivedCourses = function(db, user_id, callback)
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


/*app.put('/mongo/addArchivedCourses', function(req,res){
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
        {user_id : 1, archivedCourses : [25,45]},
        {user_id : 2, archivedCourses : [12,24]},
        {user_id : 3, archivedCourses : [7,85]}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}*/

app.put('/mongo/addArchivedCourse', function(req,res){
    // Connection URL
    var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
    // Use connect method to connect to the Server
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
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
    // Connection URL
    var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
    // Use connect method to connect to the Server
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
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