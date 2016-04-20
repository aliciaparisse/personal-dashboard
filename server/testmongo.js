/**
 * Created by parisse on 29.3.2016.
 */
var express = require('express');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://alicia:aliciamongo@ds013579.mlab.com:13579/personal-dashboard';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    test4(db, "bertron", (result)=>{
        console.log(result);
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

