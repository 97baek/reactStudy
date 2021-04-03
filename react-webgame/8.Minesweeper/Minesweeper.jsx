import React, { useReducer } from "react";
import Table from "./Table";

const initialState = {
  tableData: [],
  timer: 0,
  result: 0,
};

const reducer = (state, aciton) => {
  switch (action.type) {
    default:
      return state;
  }
};

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </>
  );
};

export default Minesweeper;
