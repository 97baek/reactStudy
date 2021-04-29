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
  OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
  // 초기값
  tableData: [
    [-1, -1, -1, -1, -1, -1, -1],
    [-7, -7, -7, -7, -7, -7, -7],
    [-1, -7, -1, -7, -7, -7, -1],
    [-1, -1, -1, -1, -1, -7, -7],
    [-7, -1, -1, -1, -7, -7, -1],
  ],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: 0,
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);

  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });

  const shuffle = []; // 어느 칸에 지뢰가 있는지 담아둘 배열

  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // 2차원 배열 계산
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);

  return data;
};

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      };

    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED;
      return { ...state, tableData };
    }
    default:
      return state;
  }
};

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ContextAPI를 사용하면 렌더링 때 마다 값을 불러와야 하므로 캐싱을 해서 성능 저하를 줄인다.
  const value = useMemo(
    () => ({
      tableData: state.tableData,
      dispatch,
    }),
    [state.tableData]
  );

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
