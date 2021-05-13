import React from "react";
import "./style.css";

function Box(props) {
  //draw X or O in Box
  function toggleTurn() {
    if (!(props.currentState === "X" || props.currentState === "O")) {
      props.changeTurn(props.row, props.col);
    }
  }

  return (
    <div
      className="box"
      style={
        (props.row % 2 === 0 && props.col % 2 === 1) ||
        (props.row % 2 === 1 && props.col % 2 === 0)
          ? { background: "lightgrey" }
          : { background: "white" }
      }
      onClick={toggleTurn}
    >
      {props.currentState}
    </div>
  );
}

export default Box;
