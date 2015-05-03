/**
 * Created by Divya on 4/8/2015.
 */

var createNaiveLinks = (function(){
    return function(color, linkMatrix){
        if(color == 'green'){
            return createNaiveGreenLinks(linkMatrix);
        }
        else if(color == 'black'){
            return createNaiveBlackLinks(linkMatrix);
        }
        else{
            console.log('Something is wrong');
        }
    }
})();


var createNaiveGreenLinks = (function(){
    return function(linkMatrix){
        var links = [];
        var arcs = [];

        for(var k=0; k<linkMatrix.length; k++){

            for(var i=0; i<linkMatrix[k].length; i++){
                var beg=0, end=0;

                for(var j=0; j<linkMatrix[k][i].length; j++){
                    if(linkMatrix[k][i][j].left == true){
                        beg = Math.min(i, j);
                        end = Math.max(i, j);

                        if(beg != end){
                            sNodeX = beg*params.xFactor+params.margin;
                            sNodeY = k*params.yFactor+params.margin;
                            tNodeX = end*params.xFactor+params.margin;
                            tNodeY = k*params.yFactor+params.margin;

                            channel = i;
                            //links.push({"source":{"x":sNodeX , "y": sNodeY}, "target": {"x": sNodeX, "y": sNodeY-(i+1)*params.channelGap}});
                            //links.push({"source": {"x": sNodeX, "y": sNodeY-(i+1)*params.channelGap}, "target": {"x": tNodeX, "y": tNodeY-(i+1)*params.channelGap}});
                            //links.push({"source": {"x": tNodeX, "y": tNodeY}, "target": {"x": tNodeX, "y": tNodeY-(i+1)*params.channelGap}})

                            sNodeX = beg*params.xFactor+params.margin;
                            sNodeY = k*params.yFactor+params.margin;
                            sNodeLinkY = sNodeY-(channel+1)*params.channelGap;

                            tNodeX = end*params.xFactor+params.margin;
                            tNodeY = k*params.yFactor+params.margin;
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

var createNaiveBlackLinks = (function(){
    return function(linkMatrix){
        var links = [];
        var arcs = [];

        for(var k=0; k<linkMatrix.length; k++){

            for(var i=0; i<linkMatrix[k].length; i++){
                var beg=0, end=0;

                for(var j=0; j<linkMatrix[k][i].length; j++){
                    if(linkMatrix[k][i][j].left == true){
                        beg = Math.min(i, j);
                        end = Math.max(i, j);

                        if(beg != end){
                            sNodeX = k*params.xFactor+params.margin;
                            sNodeY = beg*params.yFactor+params.margin;
                            sNodeLinkX = sNodeX-(i+1)*params.channelGap; //-

                            tNodeX = k*params.xFactor+params.margin;
                            tNodeY = end*params.yFactor+params.margin;
                            tNodeLinkX = tNodeX-(i+1)*params.channelGap;

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
        //return links;

        return {
            links: links,
            arcs: arcs
        };
    }
})();