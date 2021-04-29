import React, { useReducer, createContext, useMemo } from "react";
import Form from "./Form";
import Table from "./Table";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
};

export const TableContext = createContext({
  // 초기값
  tableData: [
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-7, -7, -7, -7, -7, -7, -7],
    [-1, -7, -1, -7, -7, -7, -1],
    [],
    [],
  ],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: 0,
};

export const START_GAME = "START_GAME";

const reducer = (state, aciton) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      };
    default:
      return state;
  }
};

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ContextAPI를 사용하면 렌더링 때 마다 값을 불러와야 하므로 캐싱을 해서 성능 저하를 줄인다.
  const value = useMemo(() => {
    tableData: state.tableData, dispatch;
  }, [state.tableData]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default Minesweeper;
