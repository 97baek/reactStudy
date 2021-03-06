import React, { memo } from "react";
import Td from "./Td";
const Tr = ({ rowData, rowIndex, dispatch }) => {
  console.log("tr rendered");
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td
            key={i}
            rowIndex={rowIndex}
            cellIndex={i}
            cellData={rowData[i]}
            dispatch={dispatch}
          ></Td>
        ))}
    </tr>
  );
};

export default React.memo(Tr);
