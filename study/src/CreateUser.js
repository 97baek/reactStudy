import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <>
      <input name="username" value={username} onChange={onChange} placeholder="계정명" />
      <input name="email" value={email} onChange={onChange} placeholder="이메일" />
      <button onClick={onCreate}>추가!</button>
    </>
  );
}

export default React.memo(CreateUser);
