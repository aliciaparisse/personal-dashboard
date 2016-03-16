var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();


app.use(express.static('dist'));

var renderIndex = (req, res) => {
    res.sendFile('/index.html');
}

app.get('/*', renderIndex);

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});