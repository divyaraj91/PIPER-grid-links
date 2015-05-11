/**
 * Created by Divya on 4/8/2015.
 */
color = null;

var createNaiveLinks = (function(){
    return function(linkColor, linkMatrix){
        color = linkColor;

        return naiveLinks(linkMatrix);
    }
})();

var naiveLinks = (function(){
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

                        pos = linkPosition(k, beg, end, i);

                        if(color == 'green'){
                            arcs.push({"center": {"x": pos.center1X, "y": pos.center1Y}, "startAngle": 270, "endAngle": 360});
                            arcs.push({"center": {"x": pos.center2X, "y": pos.center2Y}, "startAngle": 0, "endAngle": 90});

                            //links
                            links.push({"source":{"x":pos.sNodeX , "y": pos.sNodeY}, "target": {"x": pos.sNodeX, "y": pos.center1Y}});
                            links.push({"source": {"x": pos.center1X, "y": pos.sNodeLinkY}, "target": {"x": pos.center2X, "y": pos.tNodeLinkY}});
                            links.push({"source": {"x": pos.tNodeX, "y": pos.tNodeY}, "target": {"x": pos.tNodeX, "y": pos.center2Y}});
                        }
                        else if(color == 'black'){
                            arcs.push({"center": {"x": pos.center1X, "y": pos.center1Y}, "startAngle": 270, "endAngle": 360});
                            arcs.push({"center": {"x": pos.center2X, "y": pos.center2Y}, "startAngle": 180, "endAngle": 270});

                            //links
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