/**
 * Created by Divya on 5/1/2015.
 */
function renderPath(beg, k, end, channel){
    console.log('dfsd13123');

      console.log('i am here');

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

      //try path

      //links
      links.push({"source":{"x":sNodeX , "y": sNodeY}, "target": {"x": sNodeX, "y": center1Y}});
      links.push({"source": {"x": center1X, "y": sNodeLinkY}, "target": {"x": center2X, "y": tNodeLinkY}});
      links.push({"source": {"x": tNodeX, "y": tNodeY}, "target": {"x": tNodeX, "y": center2Y}})

      return {
          links: links,
          arcs: arcs
      };

};