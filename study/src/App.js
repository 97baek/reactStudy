import React, { useState, useRef, useMemo, useCallback } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

function countActiveUsers(users) {
  console.log("활성 사용자 수 세는중");
  return users.filter((user) => user.active).length;
}

function App() {
  const [users, setUsers] = useState([
    { id: 1, username: "baek", email: "1234@naver.com", active: true },
    { id: 2, username: "sang", email: "sang@gmail.com", active: false },
    { id: 3, username: "heun", email: "heun@hanmail.com", active: false },
  ]);

  const [input, setInput] = useState({
    username: "",
    email: "",
  });

  const nextId = useRef(4);

  const { username, email } = input;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
  }, []);

  const onCreate = useCallback(() => {
    setUsers((users) => [...users, { id: nextId.current, username, email }]);
    setInput({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
    );
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
