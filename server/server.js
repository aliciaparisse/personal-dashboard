/**
 * Created by alicia on 10/03/2016.
 */

var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();


app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});