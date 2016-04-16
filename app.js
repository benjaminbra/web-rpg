var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 8080,
    fs = require('fs');

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log('new connection');
    socket.on('user ready', function(coordinates){
        var file = './gamebase/map/'+coordinates+'/'+coordinates+'.map';
        var mapJson = fs.readFileSync(file,'utf-8');
        socket.emit('map construct',mapJson);
    });

    socket.on('map ready', function(){
        var file = './gamebase/players/default.hero';
        var userJson = fs.readFileSync(file, 'utf-8');
    });
});