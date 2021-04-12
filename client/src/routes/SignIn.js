import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "routes/css/SignIn.css";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

axios.defaults.withCredentials = true;

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

  paperSignIn: {
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

  ButtonSignIn: {
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

  ButtonSignUp: {
    width: "10vw",
    margin: "1vw",
    fontFamily: "Spoqa Han Sans Neo",
    fontWeight: "bold",
    color: "gray",
    background: "white",
    border: "2px solid gray",
    boxShadow: "none",
    "&:hover": {
      background: "gray",
      color: "white",
      boxShadow: "none",
    },
  },
}));

// 로그인 페이지
function SignIn() {
  const url = `http://localhost:5000`;
  const classes = useStyles();
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  // (로그인 폼) 입력 핸들러
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "userEmail") {
      setUserEmail(value);
    } else if (name === "userPassword") {
      setUserPassword(value);
    }
  };

  // 로그인 핸들러
  const onSignInHandler = async (event) => {
    event.preventDefault();
    await axios
      .post(url + "/", {
        method: "POST",
        body: JSON.stringify({
          userEmail: userEmail,
          userPassword: userPassword,
        }),
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 400) {
          alert("로그인 성공");
          sessionStorage.setItem("accessToken", response.data.access_token);
          sessionStorage.setItem("refreshToken", response.data.refresh_token);
          sessionStorage.setItem(
            "userid",
            JSON.stringify(response.data.user_object.id)
          );
          sessionStorage.setItem(
            "nickname",
            JSON.stringify(response.data.user_object.nickname)
          );
          sessionStorage.setItem(
            "email",
            JSON.stringify(response.data.user_object.email)
          );
          sessionStorage.setItem(
            "usertype",
            JSON.stringify(response.data.user_object.usertype)
          );

          window.location.replace("/");
        } else if (response.data.status === 401) {
          alert("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
        } else {
          alert("error");
        }
      })
      .catch(() => {
        alert("error for some reason");
      });
  };

  const onMoveSignUp = () => {
    history.push({
      pathname: "/sign-up",
    });
  };

  const handleChange = (prop) => (event) => {
    setUserPassword(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <div className={classes.paperSignIn}>
              <h2 className={classes.signInTitle}>로그인하기</h2>
              <TextField
                className={classes.TextField}
                id="outlined-basic"
                label="이메일"
                variant="outlined"
                name="userEmail"
                type="email"
                value={userEmail}
                onChange={onChangeHandler}
                borderRadius={16}
                required
              />
              <FormControl
                className={clsx(classes.margin, classes.TextField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  비밀번호
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <Button
                // style={{ margin: "0 auto" }}
                className={classes.ButtonSignUp}
                variant="contained"
                size="large"
                onClick={onMoveSignUp}
              >
                회원가입
              </Button>
              <Button
                className={classes.ButtonSignIn}
                variant="contained"
                size="large"
                onClick={onSignInHandler}
              >
                로그인
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

export default SignIn;
