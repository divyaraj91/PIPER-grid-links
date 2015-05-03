/**
 * Created by Divya on 4/8/2015.
 */


//not being used now
var layout = (function layout(d){

    var nodes = [];
    return function(d){
        d.forEach(function(value, key){
            nodes.push({"x": value.col*params.xFactor+params.margin, "y": value.row*params.yFactor+params.margin});
        });
    }
})();


