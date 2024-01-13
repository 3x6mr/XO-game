import React, { useState } from "react";
import "./Game.css";
import { Cell } from "./Cell";

export const Game = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [isNext, setIsNext] = useState(true);
  function calculateWinner(cells) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (cells[index] || calculateWinner(cells)) {
      return;
    }
    const newCells = [...cells];
    if (newCells[index] === "") {
      if (isNext) {
        newCells[index] = "❌";
      } else {
        newCells[index] = "⭕️";
      }
      setIsNext(!isNext);
      setCells(newCells);
    }
    return;
  };
  const winner = calculateWinner(cells);
  let status;
  if (winner) {
    status = "Winner: " + winner + "       🎉";
  } else if (cells.every((element) => element !== "")) {
    status = 'Click "Restart Game"';
  } else {
    status = "Next player: " + (isNext ? "X" : "O");
  }
  return (
    <>
      <h1>{status}</h1>
      <div className="container">
        {cells.map((value, index) => {
          return (
            <Cell
              key={index}
              value={value}
              onSquareClick={() => handleClick(index)}
            />
          );
        })}
        <button onClick={() => setCells(Array(9).fill(""))}>
          Restart Game
        </button>
      </div>
    </>
  );
};
