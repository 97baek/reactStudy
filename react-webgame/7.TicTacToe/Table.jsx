import React from "react";
import Tr from "./Tr";
const Table = ({ onClick, tableData, dispatch }) => {
  console.log(tableData);
  return (
    <table onClick={onClick}>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr rowData={tableData[i]} rowIndex={i} dispatch={dispatch} />
        ))}
    </table>
  );
};

export default Table;
