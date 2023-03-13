import React, { useState, useRef } from "react";
import Panel from "../Panel/Panel";
import "../Panel/Panel.css";

const Main = () => {
  const [obj, setObj] = useState([]);
  const [initialArray, setInitialArray] = useState([
    {
      name: "square",
      width: "100",
      height: "100",
      color: "red",
      x: 500,
      y: 100,
      className: "image",
    },
    {
      name: "square",
      width: "100",
      height: "100",
      color: "red",
      x: 500,
      y: 100,
      className: "image",
    },
  ]);
  const panel = useRef(null);

  const handleDragEnd = (index) => (e) => {
    if (e.clientX < 436 || e.clientY < 9) {
      return;
    }
    let newArray = [...initialArray];
    let newObj = newArray[index];
    newObj = { ...newObj, x: e.clientX, y: e.clientY };
    newArray.splice(index, 1, newObj);
    setInitialArray(newArray);
    setObj([...obj, newObj]);
  };

  return (
    <div className="main-container">
      <div className="left-container">
        {initialArray.map((element, index) => {
          return (
            <div
              ref={panel}
              key={index}
              className={element.className}
              style={{
                margin: "10px 0px",
                width: element.width + "px",
                height: element.height + "px",
              }}
              draggable={true}
              onDragEnd={handleDragEnd(index)}
            ></div>
          );
        })}
      </div>
      <div className="right-container">
        <Panel data={obj.map((a, b) => ({ ...a, index: b }))} />
      </div>
    </div>
  );
};

export default Main;
