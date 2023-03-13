import React, { useState, useEffect } from "react";

import { Direction } from "../Constants/Constant";
import "./Resizer.css";

const Resizer = ({ onResize }) => {
  const [direction, setDirection] = useState("");
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!direction) return;

      const ratio = window.devicePixelRatio;

      onResize(direction, e.movementX / ratio, e.movementY / ratio);
    };

    if (mouseDown) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, direction, onResize]);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (direction) => (e) => {
    e.stopPropagation();
    setDirection(direction);
    setMouseDown(true);
  };

  return (
    <>
      <div
        className="top-left"
        onMouseDown={handleMouseDown(Direction.TopLeft)}
      ></div>

      <div
        className="top-right"
        onMouseDown={handleMouseDown(Direction.TopRight)}
      ></div>

      <div
        className="right-bottom"
        onMouseDown={handleMouseDown(Direction.BottomRight)}
      ></div>

      <div
        className="bottom-left"
        onMouseDown={handleMouseDown(Direction.BottomLeft)}
      ></div>
    </>
  );
};

export default Resizer;
