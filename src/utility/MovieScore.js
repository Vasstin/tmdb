import React, { useEffect, useRef } from "react";

const MovieScore = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const draw = (ctx, voteRate) => {
      const rateToPercent = voteRate * 10;
      const percentage = rateToPercent / 100;
      const degrees = percentage * 360;
      const radians = degrees * (Math.PI / 180);

      const canvArcX = ctx.canvas.width / 2;
      const canvArcY = ctx.canvas.height / 2;
      const radius = 16;
      const start = 1.5 * Math.PI;

      const green = "50, 205, 50";
      const yellow = "255, 215, 0";
      const red = "178, 34, 34";

      let color = "";

      if (voteRate <= 3) {
        color = red;
      } else if (voteRate > 3 && voteRate <= 6) {
        color = yellow;
      } else {
        color = green;
      }
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${color}, 0.2)`;
      ctx.lineWidth = 1.5;
      ctx.arc(canvArcX, canvArcY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${color}, 1)`;
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.arc(canvArcX, canvArcY, radius, start, radians + start);
      ctx.stroke();
    };
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context, props.rate);
  }, [props.rate]);

  return <canvas ref={canvasRef} {...props} width="40px" height="40px" />;
};

export default MovieScore;
