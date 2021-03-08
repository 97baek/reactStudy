import React, { useState, useRef } from "react";

function InputSample() {
  const [input, setInput] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef();

  //   const { name, nickname } = input;

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onResetBtn = () => {
    setInput({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
  };
  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChangeInput} value={input.name} type="text" ref={nameInput} />
      <input name="nickname" placeholder="닉네임" onChange={onChangeInput} value={input.nickname} type="text" />
      <button onClick={onResetBtn}>초기화</button>
      <div>
        <b>값: </b>
        {input.name} {`(${input.nickname})`}
      </div>
    </div>
  );
}

export default InputSample;
