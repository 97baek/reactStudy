import React from "react";

function Try({ tryInfo }) {
  return (
    <>
      <li>
        <p>{tryInfo.try}</p>
        <p>{tryInfo.result}</p>
      </li>
    </>
  );
}

export default Try;
