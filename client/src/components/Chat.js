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
    container: {
      height: "100%"
    },
    spacingControl: {
      height: "100%",
      padding: theme.spacing(1),
    },
    userContainer: {
      height: "100%",
      width: "100%",
      boxShadow: "0px 2px 10px lightgray",
      borderRadius: "1rem",
      color: theme.palette.text.secondary
    },
    titleLeft: {
      height: "10%",
      width: "100%",
      fontWeight: "bold",
      lineHeight: "50px",
      borderBottom: "1px solid #e5e5e5"
    },
    titleText: {
      color: "black",
      verticalAlign: "middle"
    },
    titleRight: {
      height: "10%",
      width: "100%",
      fontWeight: "bold",
      lineHeight: "50px",
      borderBottom: "1px solid #e5e5e5"
    },
    userlist: {
      height: "85%",
      width: "100%",
      overflow: "auto",
      '&::-webkit-scrollbar': {
        width: "5px"
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: "#ff8a4e",
        borderRadius: "5px"
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "inset 0px 0px 2px white"
      },
    },
    user: {
      height: "90px",
      width: "100%",
      borderTop: "1px solid #e5e5e5",
      borderBottom: "1px solid #e5e5e5"
    },
    userPic: {
      width: "100%",
      height: "100%"
    },
    userNickname: {
      fontWeight: "bold",
      textAlign: "left",
      marginBottom: "1px"
    },
    lastMessage: {
      textAlign: "left"
    },
    userButton: {
      height: "100%",
      width: "100%",
      background: "white",
      border: "1px solid white",
      borderRadius: "1rem"
    },
    userlistFooter: {
      height: "5%",
      width: "100%",
      borderTop: "1px solid #e5e5e5"
    },
    messageContainer: {
      height: "100%",
      width: "100%",
      boxShadow: "0px 2px 10px lightgray",
      borderRadius: "1rem"
    },
    message: {
      height: "75%",
      width: "100%",
      padding: "15px",
      overflow: "auto",
      '&::-webkit-scrollbar': {
        width: "5px"
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: "#ff8a4e",
        borderRadius: "5px"
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "inset 0px 0px 2px white"
      },
    },
    mymessage: {
      textAlign: "right"
    },
    othermessage: {
      textAlign: "left"
    },
    inputContainer: {
      height: "15%",
      padding: theme.spacing(1),
      borderTop: "1px solid #e5e5e5"
    },
    inputText: {
      width: "100%",
      padding: "10px",
      border: "1px solid #e5e5e5",
      borderRadius: "1rem",
      "&:focus, &:active": {
        width: "100%",
        border: "2px solid #d6d6d6",
        borderRadius: "1rem",
        outline: "none",
      },
    },
    sendButton: {
      padding: theme.spacing(1),
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
      socketIO.current.emit("leave", {
        room: room
      });
    };
  }, [room]);

  useEffect(() => {
    onUserHandler();
    console.log("유저목록출력");
    enterRoom(props.targetuser);
  }, [])

  const userName = Object.keys(users).map((id) => (
      <li key={id} className={classes.user}>
        <Grid container className={classes.spacingControl}>
          <Grid container item xs={3} className={classes.spacingControl}>
            <img src="./images/default_profile_img.png" className={classes.userPic} />
          </Grid>
          <Grid container item xs className={classes.spacingControl}>
            <button key={id} onClick={() => enterRoom(id) } className={classes.userButton}>
              <p className={classes.userNickname}>{users[id]}</p>
              <p className={classes.lastMessage}>마지막메세지</p>
            </button>
          </Grid>
        </Grid>
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
    <>
      <Grid container className={classes.container}>
        <Grid container item xs={4} className={classes.spacingControl}>
          <div className={classes.userContainer}>
            <div className={classes.titleLeft}>
              <p className={classes.titleText}>메세지 목록</p>
            </div>
            <ul className={classes.userlist}>{userName}</ul>
          </div>
        </Grid>
        <Grid container item xs className={classes.spacingControl}>
          <div className={classes.messageContainer}>
            <Grid className={classes.titleLeft}>
              <p>Online</p>
            </Grid>
            <Grid className={classes.message}>
              {messages.map((msg, idx) => (
                msg[1] == sessionStorage.userid ?
                (<p className={classes.mymessage} key={idx}>{msg[0]}</p>):
                (<p className={classes.othermessage} key={idx}>{msg[0]}</p>)
              ))}
            </Grid>
            <Grid container className={classes.inputContainer}>
              <Grid container item xs={9} className={classes.spacingControl}>
                  <input type="text" placeholder="메세지 입력하기" onKeyPress={handleKeyPress} ref={messageRef} className={classes.inputText}/>
              </Grid>
              <Grid container item xs className={classes.spacingControl}>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  endIcon={<Icon>send</Icon>}
                  onClick={onClick}
                >
                보내기
                </Button>
              </Grid>
            </Grid>
            </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
