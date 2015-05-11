/**
 * Created by divraj on 5/11/15.
 */
var linkPosition = (function linkPosition(){
    return function(k, beg, end, channel){

        if(color == 'green'){
            sNodeX = beg*xFactor+params.margin;
            sNodeY = k*yFactor+params.margin;

            tNodeX = end*xFactor+params.margin;
            tNodeY = k*yFactor+params.margin;

            sNodeLinkY = sNodeY-(channel+1)*params.channelGap;
            tNodeLinkY = tNodeY-(channel+1)*params.channelGap;

            center1X = sNodeX+params.channelGap;
            center1Y = sNodeLinkY+params.channelGap;

            center2X = tNodeX-params.channelGap;
            center2Y = center1Y;

            return{
                sNodeX: sNodeX,
                sNodeY: sNodeY,

                tNodeX: tNodeX,
                tNodeY: tNodeY,

                sNodeLinkY: sNodeLinkY,
                tNodeLinkY: tNodeLinkY,

                center1X: center1X,
                center1Y: center1Y,

                center2X: center2X,
                center2Y: center2Y
            }
        }

        else if(color == 'black'){
            sNodeX = k*xFactor+params.margin;
            sNodeY = beg*yFactor+params.margin;

            tNodeX = k*xFactor+params.margin;
            tNodeY = end*yFactor+params.margin;

            sNodeLinkX = sNodeX-(channel+1)*params.channelGap;
            tNodeLinkX = tNodeX-(channel+1)*params.channelGap;


            center1Y = sNodeY+params.channelGap;
            center1X = sNodeLinkX+params.channelGap;

            center2Y = tNodeY-params.channelGap;
            center2X = center1X;

            return {
                sNodeX: sNodeX,
                sNodeY: sNodeY,

                tNodeX: tNodeX,
                tNodeY: tNodeY,

                sNodeLinkX: sNodeLinkX,
                tNodeLinkX: tNodeLinkX,

                center1X: center1X,
                center1Y: center1Y,

                center2X: center2X,
                center2Y: center2Y
            }
        }
    }
})();
