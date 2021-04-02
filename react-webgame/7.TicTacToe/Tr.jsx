import React from "react";
import Td from "./Td";
const Tr = ({ rowData, rowIndex, dispatch }) => {
  console.log(rowData);
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}></Td>
        ))}
    </tr>
  );
};

export default Tr;
