/**
 * Created by Divya on 4/14/2015.
 */
color = null;

var createCondensedLinks = (function(){
    return function(linkColor, linkMatrix){
        color = linkColor;

        return condensedLinks(linkMatrix);

        //if(color == 'green'){
        //    return createCondensedGreenLinks(linkMatrix);
        //}
        //else if(color == 'black'){
        //    return createCondensedBlackLinks(linkMatrix);
        //}
        //else{
        //    console.log('Something is wrong');
        //}

    }
})();

var condensedLinks = (function(){
    return function(linkMatrix){
        var links = [];
        var arcs= [];

        for(var k=0; k<linkMatrix.length; k++){
            var channelLevel = new Map();
            var channelIdx = 1, channel;

            for(var i = 0; i<linkMatrix[k].length; i++){
                var beg = 0, end = 0;

                for(var j=0; j<linkMatrix[k][i].length; j++){

                    if(linkMatrix[k][i][j].left == true){
                        beg = i;
                        end = j;


                        if(channelLevel.has(i)){
                            channel = channelLevel.get(i);
                        }
                        else{
                            channelLevel.set(i, channelIdx);
                            channel = channelIdx;
                            channelIdx += 1;
                        }

                        pos = linkPosition(k, beg, end, channel);

                        if(color == 'green'){
                            arcs.push({"center": {"x": pos.center1X, "y": pos.center1Y}, "startAngle": 270, "endAngle": 360});
                            arcs.push({"center": {"x": pos.center2X, "y": pos.center2Y}, "startAngle": 0, "endAngle": 90});

                            //links
                            links.push({"source":{"x": pos.sNodeX , "y": pos.sNodeY}, "target": {"x": pos.sNodeX, "y": pos.center1Y}});
                            links.push({"source": {"x": pos.center1X, "y": pos.sNodeLinkY}, "target": {"x": pos.center2X, "y": pos.tNodeLinkY}});
                            links.push({"source": {"x": pos.tNodeX, "y": pos.tNodeY}, "target": {"x": pos.tNodeX, "y": pos.center2Y}});
                        }
                        else if(color == 'black'){
                            arcs.push({"center": {"x": pos.center1X, "y": pos.center1Y}, "startAngle": 270, "endAngle": 360});
                            arcs.push({"center": {"x": pos.center2X, "y": pos.center2Y}, "startAngle": 180, "endAngle": 270});

                            links.push({"source":{"x":pos.sNodeX , "y": pos.sNodeY}, "target": {"x": pos.sNodeLinkX, "y": pos.sNodeY}});
                            links.push({"source": {"x": pos.sNodeLinkX, "y": pos.center1Y}, "target": {"x": pos.tNodeLinkX, "y": pos.center2Y}});
                            links.push({"source": {"x": pos.tNodeX, "y": pos.tNodeY}, "target": {"x": pos.tNodeLinkX, "y": pos.tNodeY}});
                        }


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

var createCondensedGreenLinks = (function(){
    return function(linkMatrix){
        var links = [];
        var arcs= [];

        for(var k=0; k<linkMatrix.length; k++){
            var channelLevel = new Map();
            var channelIdx = 1, channel;

            for(var i = 0; i<linkMatrix[k].length; i++){
                var beg = 0, end = 0;

                for(var j=0; j<linkMatrix[k][i].length; j++){

                    if(linkMatrix[k][i][j].left == true){
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

                            //links
                            links.push({"source":{"x":sNodeX , "y": sNodeY}, "target": {"x": sNodeX, "y": center1Y}});
                            links.push({"source": {"x": center1X, "y": sNodeLinkY}, "target": {"x": center2X, "y": tNodeLinkY}});
                            links.push({"source": {"x": tNodeX, "y": tNodeY}, "target": {"x": tNodeX, "y": center2Y}});

                        }
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

var createCondensedBlackLinks = (function(){
    return function(linkMatrix){
        var links = [];
        var arcs= [];

        for(var k=0; k<linkMatrix.length; k++){
            var channelLevel = new Map();
            var channelIdx = 1, channel;

            for(var i = 0; i<linkMatrix[k].length; i++){
                var beg = 0, end = 0;

                for(var j=0; j<linkMatrix[k][i].length; j++){

                    if(linkMatrix[k][i][j].left == true){
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
                            links.push({"source":{"x":sNodeX , "y": sNodeY}, "target": {"x": sNodeLinkX, "y": sNodeY}});
                            links.push({"source": {"x": sNodeLinkX, "y": center1Y}, "target": {"x": tNodeLinkX, "y": center2Y}});
                            links.push({"source": {"x": tNodeX, "y": tNodeY}, "target": {"x": tNodeLinkX, "y": tNodeY}});
                        }
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