var io = io();

$(document).ready(function(){
    io.emit('user ready','0-0');
});

io.on('map construct',function(mapjson){
    var parsed = $.parseJSON(mapjson);
    console.log(parsed);
    var mapGenerated = jsonInterpreter(parsed);
    if(mapGenerated){
        io.emit('map ready');
    }
});