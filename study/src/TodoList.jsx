import React from "react";

const TodoList = ({ todo }) => {
  return (
    <ul>
      {todo.map((todos) => (
        <li>{todos}</li>
      ))}
    </ul>
  );
};

export default TodoList;
