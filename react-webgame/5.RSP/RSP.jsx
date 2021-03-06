import React, { useState, useEffect, useRef } from "react";

// 클래스의 경우 life cycle
// constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
  rock: "0",
  scissors: "-142px",
  paper: "-284px",
};

const scores = {
  scissors: 1,
  rock: 0,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(scores.rock);
  const interval = useRef();
  const isStop = useRef(false);

  useEffect(() => {
    interval.current = setInterval(changeHand, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, [imgCoord]); // 배열에 넣은 값들이 바뀔 때 useEffect가 실행됨

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissors);
    } else if (imgCoord === rspCoords.scissors) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  const onClickBtn = (choice) => () => {
    if (isStop.current) {
      return;
    }
    if (interval.current) {
      clearInterval(interval.current);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult("비김");
      } else if ([-1, 2].includes(diff)) {
        setResult("이김!");
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult("짐");
        setScore((prevScore) => prevScore - 1);
      }
      isStop.current = true;
      setTimeout(() => {
        isStop.current = false;
        interval.current = setInterval(changeHand, 100);
      }, 1000);
    }
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
};

export default RSP;
