import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = `http://localhost:5000`;

const ChatList = () => {
  const [users, setUsers] = useState({});

  async function onUserHandler(event) {
    const response = await axios.get(url + "/chatlist");
    setUsers(response.data.users);
  }

  const userName = Object.keys(users).map((id) => (
    <li key={id}>
      <Link to={{ pathname: "/chat", state: { targetUser: id } }}>
        {" "}
        {users[id]}{" "}
      </Link>
    </li>
  ));

  return (
    <>
      <h4>채팅하기</h4>
      <ul>{userName}</ul>
      <div>
        <button onClick={onUserHandler}>유저 불러오기</button>
      </div>
    </>
  );
};

export default ChatList;
