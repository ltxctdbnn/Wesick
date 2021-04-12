import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      flexGrow: 1,
      background: "#f1f3f5",
    },
  },

  paper: {
    padding: theme.spacing(12),
    textAlign: "center",
  },

  paperBody: {
    height: 350,
    padding: theme.spacing(2),
  },

  paperLogo: {
    marginBottom: "3vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  paperSlogan: {
    fontSize: "1.5vw",
    fontFamily: "Spoqa Han Sans Neo",
  },

  paperSignUp: {
    width: "35vw",
    position: "absolute",
    zIndex: "1",
    background: "white",
    boxShadow: "5px 5px 5px gray",
    borderRadius: "0.5rem",
    padding: theme.spacing(5.75),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  paperFooter: {
    zIndex: "-1",
    marginTop: "10vh",
    padding: theme.spacing(0),
    background: "#f1f3f5",
  },

  signInTitle: {
    fontSize: "2.0vw",
    fontFamily: "Spoqa Han Sans Neo",
    marginBottom: "2vh",
  },

  TextField: {
    width: "25vw",
    margin: "0.5vw",
    fontFamily: "Spoqa Han Sans Neo",
    borderRadius: "0",
  },

  ButtonRegister: {
    width: "10vw",
    margin: "1vw",
    fontFamily: "Spoqa Han Sans Neo",
    fontWeight: "bold",
    color: "#ff8a4e",
    background: "white",
    border: "2px solid #ff8a4e",
    boxShadow: "none",
    "&:hover": {
      background: "#ff8a4e",
      color: "white",
      boxShadow: "none",
    },
  },
}));

// 회원가입 페이지
function SignUp() {
  const url = `http://localhost:5000`;
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwWarning, setPwWarning] = useState(<></>);

  // (회원가입 폼) 입력 핸들러
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordCheck") {
      setPasswordCheck(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  // (비밀번호 재확인 입력 시) 비밀번호 일치 확인
  useEffect(() => {
    if (password !== "" || passwordCheck !== "") {
      if (password !== passwordCheck) {
        setPwWarning(<p>비밀번호가 일치하지 않습니다.</p>);
      } else {
        setPwWarning(<></>);
      }
    }
  }, [passwordCheck]);

  // 회원가입 버튼 핸들러
  const onSignUpHandler = async (event) => {
    event.preventDefault();
    if (password === passwordCheck) {
      try {
        const response = await axios.post(url + "/sign-up", {
          headers: { "Content-Type": "application/json" },
          data: {
            email: email,
            password: password,
            name: name,
            nickname: nickname,
          },
          withCredentials: true,
        });
        if (response.data.status === 300) {
          window.location.replace("/profile");
        } else if (response.data.status === 301) {
          alert("필수 입력 사항이 모두 입력되지 않았습니다.");
        } else if (response.data.status === 302) {
          alert("이미 등록된 이메일 주소입니다.");
        } else if (response.data.status === 303) {
          alert("이미 등록된 별명입니다.");
        } else {
          alert("error");
        }
      } catch (error) {
        alert("error");
      }
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.paper}></div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paperBody}></div>
        </Grid>
        <Grid item xs={3}>
          <Grid item xs={12}>
            <div className={classes.paperLogo}>
              <img
                src="./images/todak_logo.png"
                width="100%"
                alt="Todak Logo"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.paperSlogan}>
              토닥토닥에서 우리 동네에 나와 같은 아픔을 가진 사람들과 따뜻한
              이야기를 나눠보세요.
            </div>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <div className={classes.paperBody}></div>
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <div className={classes.paperSignUp}>
              <h2 className={classes.signInTitle}>회원가입</h2>
              <TextField
                className={classes.TextField}
                id="outlined-basic"
                label="이메일을 입력해주세요"
                variant="outlined"
                name="email"
                type="email"
                value={email}
                onChange={onChangeHandler}
                required
              />
              <TextField
                className={classes.TextField}
                id="outlined-basic"
                label="비밀번호를 입력해주세요"
                variant="outlined"
                name="password"
                type="password"
                value={password}
                onChange={onChangeHandler}
                required
              />
              <TextField
                className={classes.TextField}
                id="outlined-basic"
                label="비밀번호 확인"
                variant="outlined"
                name="passwordCheck"
                type="password"
                value={passwordCheck}
                onChange={onChangeHandler}
                required
              />
              <TextField
                className={classes.TextField}
                id="outlined-basic"
                label="이름을 입력해주세요"
                variant="outlined"
                name="name"
                type="text"
                value={name}
                onChange={onChangeHandler}
                required
              />
              <TextField
                className={classes.TextField}
                id="outlined-basic"
                label="닉네임을 입력해주세요"
                variant="outlined"
                name="nickname"
                type="text"
                value={nickname}
                onChange={onChangeHandler}
                required
              />
              <Button
                className={classes.ButtonRegister}
                variant="contained"
                size="large"
                onClick={onSignUpHandler}
              >
                회원 가입하기
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.paperBody}></div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.paperFooter}>
            <img src="./images/grass.png" width="100%" alt="Todak Logo" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
