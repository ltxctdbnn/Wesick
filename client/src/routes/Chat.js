import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const endpoint = "http://localhost:5000";

const Chat = ({ room, selectedUser }) => {
  console.log("Chat.js rendering");
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const socketIO = useRef();

  console.log(selectedUser);
  useEffect(() => {
    socketIO.current = io(endpoint);
    socketIO.current.emit("join", {
      name: sessionStorage.nickname,
      from_user: sessionStorage.userid,
      to_user: selectedUser,
      room: room
    });
    console.log("joined!");
    setMessages([]);
    async function getHistory() {
      const response = await axios.get(endpoint + `/history?room=${room}`, { withCredentials: true });
      console.log(`==================${response}===============`);
      console.log(response)
      setMessages([...response.data.messages.map(msg => msg.message)])
    }


    // div.addEventListener('onScroll', async (e) => {
    //   if (e.scrollTo < 20) {
    //     if (!loading) {
    //       setLoading(true)
    //       const response = await axios.get('message', {lastedId: messages[0].id})
    //       setMessages([...response.data, ...messages]);
    //       setLoading(false)
    //     }
    //   }
    // })
    getHistory();
    socketIO.current.on("receiveMessage", (data) => {
      console.log(data, "emitMessage");
      setMessages((messages) => [...messages, data.greeting || data.message]);
    });
    return () => {
      socketIO.current.emit("leave", {
        name: sessionStorage.nickname,
        from_user: sessionStorage.userid,
        to_user: selectedUser,
        room: room
      });
    };
  }, [room]);

  const onClick = () => {
    socketIO.current.emit("sendMessage", {
      message: messageRef.current.value,
      nickname: sessionStorage.nickname,
      room: room, // room is not defined?
      from_user: sessionStorage.userid,
      to_user: selectedUser
    });
    messageRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <p>
        <input type="text" onKeyPress={handleKeyPress} ref={messageRef} />
      </p>
      <p>
        <input type="button" onClick={onClick} value="Send" />
      </p>
    </div>
  );
};

export default Chat;
