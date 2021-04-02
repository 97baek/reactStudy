import React, { useState, useRef, memo } from "react";
import Try from "./Try";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let answerNumber = "";
  for (let i = 0; i < 4; i++) {
    answerNumber += candidate.splice(Math.floor(Math.random() * (9 - i)), 1);
  }
  console.log(answerNumber);
  return answerNumber;
}

const NumBaseball = memo(() => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);
  const inputRef = useRef();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === answer) {
      alert("정답입니다!");
      setResult("");
      setValue("");
      setAnswer(getNumbers);
      setTries([]);
    } else {
      let strike = 0;
      let ball = 0;
      for (let i = 0; i < answer.length; i++) {
        console.log(value[i]);
        if (answer[i] === value[i]) {
          strike++;
          console.log(`strike: ${strike}`);
        } else if (answer.includes(value[i])) {
          ball++;
          console.log(`ball: ${ball}`);
          console.log(value[i]);
        }
      }
      console.log(strike, ball);
      setTries((prevTries) => [
        ...prevTries,
        { try: value, result: `${strike}스트라이크 ${ball}볼입니다` },
      ]);

      setValue("");
      if (tries.length === 10) {
        alert(`10번 이상 틀려서 다시 시도, 결과는 ${answer}이었습니다!`);
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      }
    }
    inputRef.current.focus();
  };

  return (
    <>
      <div>{result}</div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} maxLength={4} value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
        })}
      </ul>
    </>
  );
});

export default NumBaseball;
