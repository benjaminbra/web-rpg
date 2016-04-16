function jsonInterpreter(json){
    var name = json.name;
    generator(json.map,json.size);
}

function generator(map,size){
    makeGrid(size);
    map.req.forEach(function(e,i,a){
        conditionInterpreter(map,e,size);
    });
}

function conditionInterpreter(map,e,size){
    if(e.condition[0]=="!"){
        var condition = e.condition.substring(
            e.condition.lastIndexOf("!")+1,
            e.condition.lastIndexOf("?"));
        if(condition=="*-*"){
            mapAll(e.execution, size);
        } else if(condition[0]=="*"){
            mapCol(e.execution, size, condition);
        } else if(condition[condition.length-1]=="*"){
            mapLine(e.execution, size, condition);
        } else {
            mapCase(e.execution, condition);
        }
        var exception = e.condition.split('?')[1];
        exceptionInterpreter(map,exception);
    }

}

function exceptionInterpreter(map,exception){
    console.log(map.exception);
    console.log(exception);
    var exceptionList = exception
                            .substring(exception.lastIndexOf('[')+1,exception.lastIndexOf(']'))
                            .split(',');
    console.log(exceptionList);
    exceptionList.forEach(function(e,i,a){
        var execution = map.exception[e];

        mapCase(execution,e);
    });
}

function makeGrid(size){
    var grid = '<table >';
    for(var l = 0; l <= size.height; l++){
        grid += "<tr>";
        for(var c = 0; c <= size.width; c++){
            grid+='<td id="'+l+'-'+c+'"></td>';
        }
        grid+="</tr>";
    }
    grid += "</table>";

    $('#map').append(grid);
}

//if condition is *-*
function mapAll(execution,size){
    for(var l = 0; l <= size.height; l++){
        for(var c = 0; c <= size.width; c++){
            mapCase(execution,l+"-"+c);
        }
    }
}

//if condition is *-number
function mapCol(execution,size,coordinates){
    var coordinatesArray = coordinates.split('-');
    for(var l = 0; l <= size.height; l++){
        mapCase(execution,l+"-"+coordinatesArray[1]);
    }

}

//if condition is number-*
function mapLine(execution,size,coordinates){
    var coordinatesArray = coordinates.split('-');
    for(var c = 0; c <= size.width; c++){
        mapCase(execution,coordinatesArray[0]+"-"+c);
    }
}

//if condition is number-number
function mapCase(execution,coordinates){

    var layer1 = '<div class="layer1 t-'+
                        execution.layer1.type+' c-'+
                        execution.layer1.collision+'"></div>';
    var layer2 = '<div class="layer2 t-'+
                        execution.layer2.type+' c-'+
                        execution.layer2.collision+'"></div>';
    $('#'+coordinates).html('').append(layer1+layer2);
}