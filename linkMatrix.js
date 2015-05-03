/**
 * Created by Divya on 4/14/2015.
 */


var linkMatrixElement = (function linkMatrixElement(d){
    return function(d){
        return element = {
            "seg": false,
            "right": false,
            "left": false};
    }
})();

var createLinkMatrix = (function createLinkMatrix(){
    return function(color){
        if(color == 'green'){
            return constructLinkMatrix(6, 16);
        }
        else if(color == 'black'){
            console.log('black link constructed');
            return constructLinkMatrix(16, 6);

        }
    }

})();

var constructLinkMatrix =(function createLinkMatrix(){
    return function(axis, channels){
        var linkMat = new Array();
        for(var k=0; k<axis; k++){
            var row = new Array();

            for(var i=0; i<channels; i++){
                var channel = new Array();

                for(var j=0; j<channels; j++){
                    channel.push(linkMatrixElement());
                }
                row.push(channel);
            }
            linkMat.push(row);
        }
        return linkMat;
    }
})();

var populateLinkMatrix = (function populateLinkMatrix(){
    return function(color, matrix, data, dataLink){
        if(color == 'green'){
            return populateGreenLinkMatrix(matrix, data, dataLink);
        }
        else if(color == 'black'){
            return populateBlackLinkMatrix(matrix, data, dataLink);
        }
    }

})();

var populateGreenLinkMatrix = (function populateGreenLinkMatrix(){

    return function(matrix, data, dataLink){
        var source, target;

        dataLink.forEach(function(d){
            source = data.get(d.s);
            target = data.get(d.t);

            if(source.row == target.row){
                matrix[source.row][source.col][source.col].seg = true;
                matrix[source.row][source.col][source.col].right = true;

                matrix[source.row][source.col][target.col].seg = true;
                matrix[source.row][source.col][target.col].left = true;
            }
        })
        return matrix;
    }
})();

var populateBlackLinkMatrix = (function populateBlackLinkMatrix(){

    return function(matrix, data, dataLink){
        var source, target;

        dataLink.forEach(function(d){
            source = data.get(d.s);
            target = data.get(d.t);
            console.log(source);
            if(source.col == target.col){
                matrix[source.col][source.row][source.row].seg = true;
                matrix[source.col][source.row][source.row].right = true;

                matrix[source.col][source.row][target.row].seg = true;
                matrix[source.col][source.row][target.row].left = true;
            }
        })
        return matrix;
    }
})();