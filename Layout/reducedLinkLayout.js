/**
 * Created by Divya on 4/14/2015.
 */

    var greenChannelCount, blackChannelCount;
    //var yFactor, xFactor;

var createReducedLinks = (function(){
    return function(color, linkMatrix){
        if(color == 'green'){
            return createReducedGreenLinks(linkMatrix);
        }
        else if(color == 'black'){
            return createReducedBlackLinks(linkMatrix);
        }
        else{
            console.log('Something is wrong');
        }
    }
})();



var createReducedGreenLinks = (function(){
    return function(linkMatrix){
        var links = [];
        var linkOccupancy = createLinkMatrix('green');
        var beg, end;
        var validChannel, channel;

        var centerX, centerY;
        var arcs = [];

        //var maxChannel = getChannelCountReduced('green', linkMatrix);

        //yFactor = (maxChannel+2) * params.channelGap;

        for(var k=0; k<linkMatrix.length; k++){
            for(var i=0; i<linkMatrix[k].length; i++){

                for(var j=0; j<linkMatrix[k][i].length; j++){
                    if(linkMatrix[k][i][j].left == true){
                        beg = Math.min(i, j);
                        end = Math.max(i, j);

                        for(var channelIdx = 0; channelIdx < linkMatrix[k].length; channelIdx++){
                            validChannel = true;
                            channel = channelIdx;

                            for(var col = beg; col <= end; col++){
                                if(linkOccupancy[k][channelIdx][col].seg == true){
                                    validChannel = false;
                                    break;
                                }
                            }
                            if(validChannel == true){
                                break;
                            }
                        }

                        for(col = beg; col < end; col++){
                            linkOccupancy[k][channel][col].seg = true;
                        }


                        sNodeX = beg*xFactor+params.margin;
                        sNodeY = k*yFactor+params.margin;
                        sNodeLinkY = sNodeY-(channel+1)*params.channelGap;

                        tNodeX = end*xFactor+params.margin;
                        tNodeY = k*yFactor+params.margin;
                        tNodeLinkY = tNodeY-(channel+1)*params.channelGap;

                        //try arc
                        center1X = sNodeX+params.channelGap;
                        center1Y = sNodeLinkY+params.channelGap;
                        arcs.push({"center": {"x": center1X, "y": center1Y}, "startAngle": 270, "endAngle": 360});

                        center2X = tNodeX-params.channelGap;
                        center2Y = center1Y;
                        arcs.push({"center": {"x": center2X, "y": center2Y}, "startAngle": 0, "endAngle": 90});

                        //try path

                        //links
                        links.push({"source":{"x":sNodeX , "y": sNodeY}, "target": {"x": sNodeX, "y": center1Y}});
                        links.push({"source": {"x": center1X, "y": sNodeLinkY}, "target": {"x": center2X, "y": tNodeLinkY}});
                        links.push({"source": {"x": tNodeX, "y": tNodeY}, "target": {"x": tNodeX, "y": center2Y}});
                    }
                }
            }
        }
        return {
            links: links,
            arcs: arcs
        };
    }
})();

var createReducedBlackLinks = (function(){
    return function(linkMatrix){

        console.log('y factor: ', params.yFactor);

        var links = [];
        var linkOccupancy = createLinkMatrix('black');
        var beg, end;
        var validChannel, channel;

        var centerX, centerY;
        var arcs = [];

        for(var k=0; k<linkMatrix.length; k++){
            for(var i=0; i<linkMatrix[k].length; i++){

                for(var j=0; j<linkMatrix[k][i].length; j++){
                    if(linkMatrix[k][i][j].left == true){
                        beg = Math.min(i, j);
                        end = Math.max(i, j);

                        for(var channelIdx = 0; channelIdx < linkMatrix[k].length; channelIdx++){
                            validChannel = true;
                            channel = channelIdx;

                            for(var col = beg; col <= end; col++){
                                if(linkOccupancy[k][channelIdx][col].seg == true){
                                    validChannel = false;
                                    break;
                                }
                            }
                            if(validChannel == true){
                                break;
                            }
                        }

                        for(col = beg; col < end; col++){
                            linkOccupancy[k][channel][col].seg = true;
                        }


                        sNodeX = k*xFactor+params.margin;
                        sNodeY = beg*yFactor+params.margin;
                        sNodeLinkX = sNodeX-(channel+1)*params.channelGap; //-

                        tNodeX = k*xFactor+params.margin;
                        tNodeY = end*yFactor+params.margin;
                        tNodeLinkX = tNodeX-(channel+1)*params.channelGap;

                        ////try arc
                        center1Y = sNodeY+params.channelGap;
                        center1X = sNodeLinkX+params.channelGap; //-
                        arcs.push({"center": {"x": center1X, "y": center1Y}, "startAngle": 270, "endAngle": 360});
                        //
                        center2Y = tNodeY-params.channelGap;
                        center2X = center1X;
                        arcs.push({"center": {"x": center2X, "y": center2Y}, "startAngle": 180, "endAngle": 270});

                        //links
                        links.push({"source":{"x":sNodeX , "y": sNodeY}, "target": {"x": center1X, "y": sNodeY}});
                        links.push({"source": {"x": sNodeLinkX, "y": center1Y}, "target": {"x": tNodeLinkX, "y": center2Y}});
                        links.push({"source": {"x": tNodeX, "y": tNodeY}, "target": {"x": center2X, "y": tNodeY}});
                    }
                }
            }
        }
        return {
            links: links,
            arcs: arcs
        };
    }
})();