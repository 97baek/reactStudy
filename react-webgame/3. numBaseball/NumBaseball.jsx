import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumBaseball extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      value: "",
      answer: getNumbers(),
      tries: [],
    };
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      // 정답인 경우
      this.setState({
        result: "홈런!",
        tries: [...this.state.tries, { try: this.state.value, result: "홈런!" }],
      });
      alert("게임을 다시 시작합니다");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      // 틀린 경우
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length > 9) {
        // 10번 이상 틀렸을 때
        this.setState({
          result: `실패! 답은 ${this.state.answer.join(",")} 였습니다`,
        });
        alert("게임을 다시 시작합니다");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike++;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.setState({
          tries: [...this.state.tries, { try: this.state.value, result: `${strike}스트라이크 ${ball}볼입니다` }],
          value: "",
        });
      }
    }
  };

  render() {
    return (
      <>
        <div>{this.state.result}</div>
        <form onSubmit={this.onSubmit}>
          <input maxLength={4} value={this.state.value} onChange={this.onChange} />
          <button>입력!</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumBaseball;
