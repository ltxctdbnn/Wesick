import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const endpoint = "http://localhost:5000";

const Chat = ({ room, selectedUser }) => {
  console.log("Chat.js rendering");
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const socketIO = useRef();


  useEffect(() => {
    socketIO.current = io(endpoint);
    socketIO.current.emit("join", {
      name: sessionStorage.nickname,
      from_user: sessionStorage.userid,
      to_user: selectedUser,
      room: room
    });
    console.log("joined!");
    // alert('joined!');
    setMessages([]);
    async function getHistory() {
      try {
        const response = await axios.get(endpoint + `/history?room=${room}`, {
          headers: {
            'Content-type': 'application/json'
          },
          withCredentials: true
        });
        console.log(`==================${response}===============`);
        console.log(response.data)
        setMessages([...response.data.messages.map(msg => msg.nickname + " : " + msg.message)])
      } catch (error) {
        console.error(error);
      }
      // socketIO.current.emit('history', room = room)
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
    if (room !== undefined) {
      getHistory();
      console.log('call getHistory()')
    } else {
      console.log('room is undefiend', room);
    }
    socketIO.current.on("receiveMessage", (data) => {
      console.log(data, "emitMessage");
      setMessages((messages) => [...messages, data.greeting || data.message]);
    });
    return () => {
      console.log("왜?");
      console.log(room);
      console.log(selectedUser);
      socketIO.current.emit("leave", {
        name: sessionStorage.nickname,
        from_user: sessionStorage.userid,
        to_user: selectedUser,
        room: room
      });
    };
  }, [room]);

  const onSendMessage = () => {
    console.log(room);
    // console.log(`to_user == ${selectedUser}`)
    // alert(selectedUser);
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
      onSendMessage();
    }
  };

  return (
    <div>
      <h2>{room} : Messages</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <p>
        <input type="text" onKeyPress={handleKeyPress} ref={messageRef} />
      </p>
      <p>
        <input type="button" onClick={onSendMessage} value="Send" />
      </p>
    </div>
  );
};

export default Chat;
