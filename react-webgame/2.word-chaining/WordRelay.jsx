const React = require("react");
// import React, { useState, useRef } from "react";
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("백상흔");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setResult("정답입니다");
      setValue("");
    } else {
      setValue("");
      setResult("땡");
    }
    inputRef.current.focus();
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
// export default WordRelay;
