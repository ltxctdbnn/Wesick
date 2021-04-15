import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import io from "socket.io-client";
import "components/css/Chat.css"

const endpoint = "http://localhost:5000";
const url = `http://localhost:5000`;

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: "4vh"
    },
    userlist: {
      height: "100%",
      width: "100%"
    },
    user: {
      height: "100px",
      width: "100%"
    },
    userbutton: {
      height: "100%",
      width: "100%",
      background: "white"
    },
    message: {
      height: "350px",
      width: "100%",
      padding: "15px",
      overflow: "auto"
    },
    mymessage: {
      textAlign: "right"
    },
    inputsend: {
      height: "50px",
      padding: "15px"
    },
    inputtext: {
      width: "100%"
    },
    sendbutton: {
      margin: theme.spacing(1),
      background: "#ff8a4e",
      color: "white",
      width: "100%"
    }
  }));

const Chat = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState({});
  const [room, setRoom] = useState();
  console.log("Chat.js rendering");
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const socketIO = useRef();

  async function onUserHandler(event) {
    const response = await axios.get(url + "/chatlist");
    setUsers(response.data.users);
  }

  const enterRoom = async (targetUser) => {
    const response = await axios.post(url + "/room", {
      headers: { "Content-Type": "application/json" },
      data: {
        user1: sessionStorage.userid,
        user2: targetUser,
      },
      withCredentials: true,
    });
    if (response.data.status === 300) {
      setRoom(response.data.roomid);
    } else {
      alert("방 참여에 실패");
    }
  };

  useEffect(() => {
    socketIO.current = io(endpoint);
    console.log('room:', room);

    if (room > 0){
      socketIO.current.emit("join", {
        name: sessionStorage.nickname,
        room: room,
      });
      console.log("joined! Room: " + room);
    }
    

    socketIO.current.on("chatHistory", (data) => {
      setMessages([]);
      console.log("chatHistory: ", data);
      for(var i=0;i<data.length;i++){
        setMessages((messages) => [...messages, [data[i]['message'], data[i]['userid']]]);
      }
    });

    console.log(messages);

    socketIO.current.on("receiveMessage", (data) => {
      console.log(data, "emitMessage");
      setMessages((messages) => [...messages, [data.message, data.userid]]);
    });
    return () => {
      socketIO.current.emit("leave");
    };
  }, [room]);

  useEffect(() => {
    onUserHandler();
    console.log("유저목록출력");
    enterRoom(props.location.state['targetUser']);
  }, [])

  const userName = Object.keys(users).map((id) => (
      <li key={id} className={classes.user}>
        <button key={id} onClick={() => enterRoom(id) } className={classes.userbutton}>
          {" "}
          {users[id]}{" "}
          <p>마지막메세지</p>
        </button>
      </li>
  ));

  const onClick = () => {
    console.log("userid:", sessionStorage.userid);
    socketIO.current.emit("sendMessage", {
      message: messageRef.current.value,
      userid: sessionStorage.userid,
      room: room,
    });
    messageRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container item xs={4}>
            <ul className={classes.userlist}>{userName}</ul>
        </Grid>
        <Grid container item xs>
          <div container className={classes.message}>
              {messages.map((msg, idx) => (
                msg[1] == sessionStorage.userid ?
                 (<p className={classes.mymessage} key={idx}>{msg[0]}</p>):
                 (<p kye={idx}>{msg[0]}</p>)
              ))}
          </div>
          <Grid container className={classes.inputsend}>
            <Grid container item xs={9}>
                <input type="text" onKeyPress={handleKeyPress} ref={messageRef} className={classes.inputtext}/>
            </Grid>
            <Grid container item xs>
              <Button
                variant="contained"
                className={classes.sendbutton}
                endIcon={<Icon>send</Icon>}
                onClick={onClick}
              >
              보내기
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
