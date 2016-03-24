var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


app.use(express.static('dist'));

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
        getHiddenCourses(db, 2, (result) => {
            db.close();
            res.send(result);
        })
    });
})

var getHiddenCourses = function(db, _user_id, callback)
{
    var collection = db.collection("prefs");
    collection.find(
        //Selection
        {user_id : {$eq : _user_id}},
        //Projection
        {hiddenCourses:1, _id:0}
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
    console.log(req);
    /*MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        insertDocuments(db, (result) =>{
            db.close();
            res.send(result);
        })
    });*/
})