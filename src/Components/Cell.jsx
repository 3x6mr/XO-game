import React, { useState } from "react";

export const Cell = ({ value, onSquareClick }) => {
  return <div onClick={onSquareClick}>{value}</div>;
};
