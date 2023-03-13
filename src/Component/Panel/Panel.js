import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Panel.css";
import Resizer from "../Resizer/Resizer";
import { Direction } from "../Constants/Constant";

const Child = ({ data }) => {
  const [container, setContainer] = useState();

  const panelRef = useRef(null);
  const seletedIndex = useRef();
  const presistedObj = useRef();
  const presistedObjArray = useRef();

  useEffect(() => {
    setContainer(data);
  }, [data]);

  const handleMouseMove = useCallback((e) => {
    e.preventDefault();

    if (e.clientX < 439 || e.clientY < 33) {
      return () => {
        document.removeEventListener("mousemove", handleMouseMove.current);
      };
    }

    let newArray = [...presistedObjArray.current];
    let newUpdatedObj = { ...presistedObj.current, x: e.clientX, y: e.clientY };
    newArray[seletedIndex.current] = newUpdatedObj;
    setContainer(newArray);
  }, []);

  const handleMouseDown = (index) => (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { pageX, pageY } = e;
    let newArray = [...container];
    presistedObjArray.current = newArray;
    seletedIndex.current = index;
    let currentSelectedObj = container[index];
    presistedObj.current = currentSelectedObj;
    let upatedObj = {
      ...currentSelectedObj,
      x: pageX,
      y: pageY,
      coords: { ...currentSelectedObj.coords, x: pageX, y: pageY },
    };
    newArray.splice(index, 1, upatedObj);
    setContainer(newArray);

    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseUp = (e) => {
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleResize = (index) => (direction, movementX, movementY) => {
    const panel = document.getElementById(`resizablebox${index}`);

    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();

    const resizeTop = () => {
      panel.style.height = `${height - movementY}px`;
      panel.style.top = `${y + movementY}px`;
    };

    const resizeRight = () => {
      panel.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      panel.style.height = `${height + movementY}px`;
    };

    const resizeLeft = () => {
      panel.style.width = `${width - movementX}px`;
      panel.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;

      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;

      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;

      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;

      default:
        break;
    }
  };
  return (
    <div>
      {container?.map((ele, index) => {
        return (
          <div
            id={`resizablebox${index}`}
            ref={panelRef}
            key={index}
            index={index}
            className={ele.className}
            style={{
              width: ele?.width + "px",
              height: ele?.height + "px",

              position: "absolute",
              top: ele?.y,
              left: ele?.x,
            }}
            onMouseDown={handleMouseDown(index)}
            onMouseUp={handleMouseUp}
          >
            <Resizer key={index} onResize={handleResize(index)} />
          </div>
        );
      })}
    </div>
  );
};

export default Child;
