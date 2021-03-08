import React, { Component } from "react";

function getWinNumbers() {
  console.log("getWinNumbers"); // 반복 실행 되는지 안되는지 체크
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (RTCIceCandidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p, c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 처음에 숫자를 미리 뽑아둠
    winBalls: [], // 앞에 숫자 6개
    bonus: null, // 보너스 공
    redo: false,
  };

  componentDidMount() {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winballs, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  }

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="result">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        <button onClick={redo ? onClickRedo : () => {}}>한 번 더!</button>
      </>
    );
  }
}

export default Lotto;
