/**
 * Created by divraj on 5/3/15.
 */

var getChannelCountReduced = (function(){
    return function(greenLinkMatrix, blackLinkMatrix){
        var channel;
        var greenChannelCount = 0, blackChannelCount = 0;
        var validChannel;
        var beg, end;

        var linkOccupancy = createLinkMatrix('green');
        for(var k=0; k<greenLinkMatrix.length; k++){
            for(var i=0; i<greenLinkMatrix[k].length; i++){

                for(var j=0; j<greenLinkMatrix[k][i].length; j++){
                    if(greenLinkMatrix[k][i][j].left == true){
                        beg = Math.min(i, j);
                        end = Math.max(i, j);

                        for(var channelIdx = 0; channelIdx < greenLinkMatrix[k].length; channelIdx++){
                            validChannel = true;
                            channel = channelIdx;

                            for(var col = beg; col <= end; col++){
                                if(linkOccupancy[k][channelIdx][col].seg == true){
                                    validChannel = false;
                                    break;
                                }
                            }
                            if(validChannel == true){
                                if(channel > greenChannelCount){
                                    greenChannelCount = channel;
                                }
                                break;
                            }
                        }

                        for(col = beg; col < end; col++){
                            linkOccupancy[k][channel][col].seg = true;
                        }
                    }
                }
            }
        }

        var linkOccupancy = createLinkMatrix('black');
        for(var k=0; k<blackLinkMatrix.length; k++){
            for(var i=0; i<blackLinkMatrix[k].length; i++){

                for(var j=0; j<blackLinkMatrix[k][i].length; j++){
                    if(blackLinkMatrix[k][i][j].left == true){
                        beg = Math.min(i, j);
                        end = Math.max(i, j);

                        for(var channelIdx = 0; channelIdx < blackLinkMatrix[k].length; channelIdx++){
                            validChannel = true;
                            channel = channelIdx;

                            for(var col = beg; col <= end; col++){
                                if(linkOccupancy[k][channelIdx][col].seg == true){
                                    validChannel = false;
                                    break;
                                }
                            }
                            if(validChannel == true){
                                if(channel > blackChannelCount){
                                    blackChannelCount = channel;
                                }
                                break;
                            }
                        }

                        for(col = beg; col < end; col++){
                            linkOccupancy[k][channel][col].seg = true;
                        }
                    }
                }
            }
        }

        yFactor = (greenChannelCount+3) * params.channelGap;
        xFactor = (blackChannelCount+3) * params.channelGap;

        return {
            greenChannelCount: greenChannelCount+1,
            blackChannelCount: blackChannelCount+1
        };
    }
})();

var getChannelCountCondensed = (function(){
    return function(greenLinkMatrix, blackLinkMatrix){
        //var xFactor, yFactor;
        var greenChannelCount = 0, blackChannelCount = 0;

        for(var k=0; k<greenLinkMatrix.length; k++){
            var channelLevel = new Map();
            var channelIdx = 1, channel;

            for(var i = 0; i<greenLinkMatrix[k].length; i++){
                var beg = 0, end = 0;

                for(var j=0; j<greenLinkMatrix[k][i].length; j++){

                    if(greenLinkMatrix[k][i][j].left == true){
                        beg = i;
                        end = j;

                        if(beg != end){
                            //sNodeX = beg*params.xFactor+params.margin;
                            //sNodeY = k*params.yFactor+params.margin;
                            //tNodeX = end*params.xFactor+params.margin;
                            //tNodeY = k*params.yFactor+params.margin;

                            if(channelLevel.has(i)){
                                channel = channelLevel.get(i);
                            }
                            else{
                                channelLevel.set(i, channelIdx);
                                channel = channelIdx;
                                channelIdx += 1;
                            }

                            if(channel > greenChannelCount){
                                greenChannelCount = channel;
                            }
                        }
                    }
                }
            }
        }

        for(var k=0; k<blackLinkMatrix.length; k++){
            var channelLevel = new Map();
            var channelIdx = 1, channel;

            for(var i = 0; i<blackLinkMatrix[k].length; i++){
                var beg = 0, end = 0;

                for(var j=0; j<blackLinkMatrix[k][i].length; j++){

                    if(blackLinkMatrix[k][i][j].left == true){
                        beg = i;
                        end = j;

                        if(beg != end){

                            if(channelLevel.has(i)){
                                channel = channelLevel.get(i);
                            }
                            else{
                                channelLevel.set(i, channelIdx);
                                channel = channelIdx;
                                channelIdx += 1;
                            }

                            if(channel > blackChannelCount){
                                blackChannelCount = channel;
                            }
                        }
                    }
                }
            }
        }

        return{
            greenChannelCount: greenChannelCount+1,
            blackChannelCount: blackChannelCount+1
        }
    }
})();

var getChannelCountNaive = (function(){
    return function(greenLinkMatrix, blackLinkMatrix) {
        var greenChannelCount = 0, blackChannelCount = 0;

        for (var k = 0; k < greenLinkMatrix.length; k++) {

            for (var i = 0; i < greenLinkMatrix[k].length; i++) {
                var beg = 0, end = 0;

                for (var j = 0; j < greenLinkMatrix[k][i].length; j++) {
                    if (greenLinkMatrix[k][i][j].left == true) {
                        beg = Math.min(i, j);
                        end = Math.max(i, j);

                        if (beg != end) {
                            if (i > greenChannelCount) {
                                greenChannelCount = i;
                            }
                        }
                    }
                }
            }
        }

        for (var k = 0; k < blackLinkMatrix.length; k++) {

            for (var i = 0; i < blackLinkMatrix[k].length; i++) {
                var beg = 0, end = 0;

                for (var j = 0; j < blackLinkMatrix[k][i].length; j++) {
                    if (blackLinkMatrix[k][i][j].left == true) {
                        beg = Math.min(i, j);
                        end = Math.max(i, j);

                        if (beg != end) {
                            if (i > blackChannelCount) {
                                blackChannelCount = i;
                            }
                        }
                    }
                }
            }
        }

        return{
            greenChannelCount: greenChannelCount+1,
            blackChannelCount: blackChannelCount+1
        }
    }

})();