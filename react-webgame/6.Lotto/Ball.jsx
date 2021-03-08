import React, { memo, useEffect } from "react";

const Ball = ({ number }) => {
  useEffect(() => console.log("리렌더링"));
  let background; // 당첨 공 색깔
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
};

export default memo(Ball);
