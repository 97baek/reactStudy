import React, { useRef, useContext } from "react";
import { UserDispatch } from "./App";
import useInput from "./hooks/useInput";

function CreateUser() {
  const [{ username, email }, onChange, reset] = useInput({
    username: "",
    email: "",
  });
  const nextId = useRef(4);
  const dispatch = useContext(UserDispatch);

  const onCreate = () => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  };

  return (
    <>
      <input name="username" value={username} onChange={onChange} placeholder="계정명" />
      <input name="email" value={email} onChange={onChange} placeholder="이메일" />
      <button onClick={onCreate}>추가!</button>
    </>
  );
}

export default React.memo(CreateUser);
