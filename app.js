var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 8080,

    //Load modules
    mapreader = require('./mapreader.js');

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(){
    console.log('new connection');
});