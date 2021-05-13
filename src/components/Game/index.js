import React, { useState } from "react";
import "./style.css";
import Box from "../Box";
import Confetti from "react-confetti";

function Game() {
  const [turn, setTurn] = useState("X");
  const [winningtext, setWinningText] = useState("");
  const [board, setBoard] = useState([[], [], []]);
  const [state, setState] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  function changeTurn(row, col) {
    board[row][col] = turn;
    setTurn((turn) => (turn === "X" ? "O" : "X"));
    const winner = checkForWin();
    if (winner) {
      setWinningText(winner + " Won!");
      timer();
      setTimeout(reset, 4500);
    }
  }

  // winning game logic
  function checkForWin() {
    // row test
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      if (row[0] === row[1] && row[1] === row[2] && row[0]) {
        return row[0];
      }
    }

    //column test
    for (let i = 0; i < board.length; i++) {
      const el1 = board[0][i];
      const el2 = board[1][i];
      const el3 = board[2][i];
      if (el1 === el2 && el2 === el3 && el1) {
        return el1;
      }
    }

    //diagonal test
    const d1 = board[0][0];
    const d2 = board[1][1];
    const d3 = board[2][2];

    if (d1 === d2 && d2 === d3 && d1) {
      return d1;
    }

    const p1 = board[0][2];
    const p2 = board[1][1];
    const p3 = board[2][0];

    if (p1 === p2 && p2 === p3 && p1) {
      return p1;
    }
    return false;
  }

  function reset() {
    //Clear all grids and winner message
    setWinningText("");
    setTurn("X");
    setBoard([[], [], []]);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function timer() {
    //timer for conffeti animation
    setState(true);
    sleep(5000).then(() => {
      setState(false);
    });
  }

  return (
    <div className="game">
      <div className="text_title">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="text">
        <h3>{winningtext === "" ? turn + " Turn" : winningtext}</h3>
      </div>

      <div>
        {state ? (
          <Confetti width={width} height={height} recycle={state} />
        ) : (
          ""
        )}
      </div>

      <div className="row row-1">
        <Box
          row={0}
          col={0}
          currentState={board[0][0]}
          changeTurn={changeTurn}
        />
        <Box
          row={0}
          col={1}
          currentState={board[0][1]}
          changeTurn={changeTurn}
        />
        <Box
          row={0}
          col={2}
          currentState={board[0][2]}
          changeTurn={changeTurn}
        />
      </div>
      <div className="row row-2">
        <Box
          row={1}
          col={0}
          currentState={board[1][0]}
          changeTurn={changeTurn}
        />
        <Box
          row={1}
          col={1}
          currentState={board[1][1]}
          changeTurn={changeTurn}
        />
        <Box
          row={1}
          col={2}
          currentState={board[1][2]}
          changeTurn={changeTurn}
        />
      </div>
      <div className="row row-3">
        <Box
          row={2}
          col={0}
          currentState={board[2][0]}
          changeTurn={changeTurn}
        />
        <Box
          row={2}
          col={1}
          currentState={board[2][1]}
          changeTurn={changeTurn}
        />
        <Box
          row={2}
          col={2}
          currentState={board[2][2]}
          changeTurn={changeTurn}
        />
      </div>
      <button className="reset button" onClick={reset}>
        Reset Game
      </button>
    </div>
  );
}

export default Game;
