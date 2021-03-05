import React, { useState, useRef } from "react";

function ResponseCheck() {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("click to start");
  const [result, setResult] = useState([]);
  const changeTimeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("click when green");
      changeTimeout.current = setTimeout(() => {
        setState("now");
        setMessage("click now!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(changeTimeout.current);
      setState("waiting");
      setMessage("too fast to click! click when green");
    } else if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setMessage("click when green");
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, b) => a + b, 0) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
}

export default ResponseCheck;
