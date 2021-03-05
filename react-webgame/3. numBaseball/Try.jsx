import React, { memo } from "react";

// 첫 번째 매개변수 자리엔 props가 오기 때문에 tryInfo로 구조분해
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
  console.log("렌더링");
});

export default Try;
