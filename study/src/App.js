import React, { useState, useRef, useEffect } from "react";
// import Try from "./Try.jsx";
import TodoList from "./TodoList.jsx";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState(["할일1"]);
  const inputRef = useRef();

  useEffect(() => {
    console.log("렌더링!!");
  }, [todos]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTodos([...todos, value]);
    setValue("");
    inputRef.current.focus();
  };

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("rock")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("scissors")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("paper")}>
          보
        </button>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </div>
    </>
  );
}

export default App;
