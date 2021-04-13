import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

// import io from "socket.io-client";
import "components/css/Chat.css"

// const endpoint = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: "4vh"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  }));

const Chattest = () => {
  const classes = useStyles();
  const [users, setUsers] = useState({});
  const url = `http://localhost:5000`;
  console.log("Chat.js rendering");
//   const messageRef = useRef();
//   const [messages, setMessages] = useState([]);
//   const socketIO = useRef();
  async function onUserHandler(event) {
    const response = await axios.get(url + "/chatlist");
    setUsers(response.data.users);
  }

  useEffect(() => {
    onUserHandler();

    // socketIO.current = io(endpoint);
    // socketIO.current.emit("join", {
    //   name: sessionStorage.nickname,
    //   room: room,
    // });
    // console.log("joined!");
    // setMessages([]);

    // socketIO.current.on("receiveMessage", (data) => {
    //   console.log(data, "emitMessage");
    //   setMessages((messages) => [...messages, data.greeting || data.message]);
    // });
    // return () => {
    //   socketIO.current.emit("leave");
    // };
  }, []);

  const userName = Object.keys(users).map((id) => (
    <li key={id}>
      {/* <button key={id} onClick={() => enterRoom(id)}> */}
      <button key={id}>
        {" "}
        {users[id]}{" "}
      </button>
    </li>
  ));

//   const onClick = () => {
//     socketIO.current.emit("sendMessage", {
//       message: messageRef.current.value,
//       nickname: sessionStorage.nickname,
//       room: room,
//     });
//     messageRef.current.value = "";
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       onClick();
//     }
//   };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={3} spacing={1}>
            <ul>{userName}</ul>
        </Grid>
        <Grid container item xs spacing={1}>
            <h1>테스트용 문구!</h1>
            {/* <h2>Messages</h2>
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
            </p> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Chattest;
