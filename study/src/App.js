import React, { useReducer, useRef, useMemo, useCallback, createContext } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";
import useInput from "./hooks/useInput";

function countActiveUsers(users) {
  console.log("활성 사용자 수 세는중");
  return users.filter((user) => user.active).length;
}

const initialState = {
  input: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "baek",
      email: "1234@naver.com",
      active: true,
    },
    {
      id: 2,
      username: "sang",
      email: "sang@google.com",
      active: false,
    },
    {
      id: 3,
      username: "heun",
      email: "heun@hanmail.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return {
        input: initialState.input,
        users: [
          ...state.users,
          { id: action.user.nextId, username: action.user.username, email: action.user.email },
        ],
      };

    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };

    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };

    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  // const [users, setUsers] = useState([
  //   { id: 1, username: "baek", email: "1234@naver.com", active: true },
  //   { id: 2, username: "sang", email: "sang@gmail.com", active: false },
  //   { id: 3, username: "heun", email: "heun@hanmail.com", active: false },
  // ]);

  // const [input, setInput] = useState({
  //   username: "",
  //   email: "",
  // });

  // const nextId = useRef(4);

  // const { username, email } = input;

  // const onChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   setInput((input) => ({
  //     ...input,
  //     [name]: value,
  //   }));
  // }, []);

  // const onCreate = useCallback(() => {
  //   setUsers((users) => [...users, { id: nextId.current, username, email }]);
  //   setInput({
  //     username: "",
  //     email: "",
  //   });
  //   nextId.current += 1;
  // }, [username, email]);

  // const onRemove = useCallback((id) => {
  //   setUsers((users) => users.filter((user) => user.id !== id));
  // }, []);

  // const onToggle = useCallback((id) => {
  //   setUsers((users) =>
  //     users.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
  //   );
  // }, []);

  // const count = useMemo(() => countActiveUsers(users), [users]);

  // UserDispatch라는 이름으로 내보내줌.

  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
