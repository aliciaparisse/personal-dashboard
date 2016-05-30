// Test mongo file
// Author : Alicia Parisse
// Description :
//		This file was created to test some mongo DB tasks on a stand alone point of view
//      It should not really be pushed to git but is really useful sometimes.
// Last-comment date : 30/05/16


var express = require('express');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');



var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    //console.log("Connected correctly to server");
    remove(db, averageUser, (result) => {
        test5(db, averageUser, (result) =>{
            db.close();
        })
    })
});
var test = function(db, body, callback){
    var collection = db.collection("prefs");
    collection.update(
        {user_id:"alicia"},
        {"user_id" : "alicia","course_id": 22, "hidden":true},
        {upsert:true},
        function(err, result){
            callback(result);
        }
    )
}

var test2 = function(db, user_id, course_id, callback){
    var collection = db.collection("prefs");
    collection.find(
        //Selection
        {$and : [{user_id : {$eq : user_id}},
            {course_id : {$eq : course_id}}]}/*,
         //Projection
         {course_id:1, _id:0}
         ).toArray(function(err,res){
         callback(res);
         }*/)
}

var test3 = function(db, user_id, course_id, callback){
    var collection = db.collection("prefs");
    collection.remove(
        {user_id:user_id, course_id:course_id},
        function(err, result){
            console.log("Updated course to false to collection");
            callback(result);
        })
}
var test4 = function (db, user_id, callback){
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

var remove = function(db, docs, callback){
    var collection = db.collection("activity");
    collection.remove(
        {userId : docs[0].userId},
        (err,res) =>{
            if(err){
                console.log(err);
            }
            else{
                console.log("res")
                console.log(res.result);
                callback(res);
            }

        })

}

var test5 =  function (db, docs, callback){
    var collection = db.collection("activity");
    var error, result;
    collection.insert(
        docs,
        function(err, res){
            if(err){
                console.log("err")
                console.log(err);
                error = err
            }
            else{
                result = res;
                console.log("NO ERR");
                callback(result);
            }
        }
    )

}