import React from "react";

function UserList({ users, onRemove, onToggle }) {
  const list = users.map((user) => {
    return (
      <li key={user.id}>
        <b
          style={{
            cursor: "pointer",
            color: user.active ? "green" : "black",
          }}
          onClick={() => onToggle(user.id)}
        >
          {user.username}
        </b>{" "}
        <span>({user.email}) </span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
      </li>
    );
  });
  return <ul>{list}</ul>;
}

export default React.memo(UserList);
