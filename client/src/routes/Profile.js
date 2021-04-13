import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

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
    boxShadow: "0px 2px 10px lightgray",
    borderRadius: "1rem",
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

  paperProfile: {
    padding: theme.spacing(5),
    textAlign: "center",
  },

  paperIntro: {
    width: "20vw",
    height: "12vh",
    border: "1px solid lightgray",
    borderRadius: "0.5rem",
  },

  uploadProfileImg: {
    width: "7vw",
    height: "14vh",
    color: "white",
    background: "lightgray",
    marginRight: "2vw",
    // padding: theme.spacing(),
    border: "1px solid lightgray",
    borderRadius: "5rem",
    textAlign: "center",
  },

  signInTitle: {
    fontSize: "2.0vw",
    fontFamily: "Spoqa Han Sans Neo",
    marginBottom: "1.5vh",
  },

  TextField: {
    width: "25vw",
    margin: "0.5vw",
    fontFamily: "Spoqa Han Sans Neo",
    borderRadius: "0",
  },

  interest: {
    fontFamily: "Spoqa Han Sans Neo",
    float: "left",
    color: "dark",
    marginLeft: "1.5vw",
    fontWeight: "bold",
  },

  location: {
    fontFamily: "Spoqa Han Sans Neo",
    float: "left",
    marginLeft: "1.5vw",
    fontWeight: "bold",
  },

  certification: {
    fontFamily: "Spoqa Han Sans Neo",
    float: "left",
    marginLeft: "1.5vw",
    fontWeight: "bold",
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

  input: {
    display: "none",
  },
}));

// 프로필 작성 컴포넌트 (미완성)
const Profile = () => {
  const url = `http://localhost:5000`;
  const classes = useStyles();
  const history = useHistory();
  const [profilePhoto, setProfilePhoto] = useState("");

  // 프로필 사진 업로드 핸들러
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(files[0]);
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setProfilePhoto(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 프로필 사진 Clear 핸들러
  const onClearAttachment = () => setProfilePhoto(null);

  // 작성 프로필 저장 핸들러
  const onSave = () => {
    history.push({
      pathname: "/",
    });
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
              <h2 className={classes.signInTitle}>프로필 작성</h2>
              <div className={classes.paperProfile}>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={4}>
                    <div className={classes.uploadProfileImg}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <input
                      className={classes.paperIntro}
                      id="self-introduction-input"
                      type="text"
                      placeholder="  소개말을 입력해주세요."
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.interest}>
                <h5>관심질환 설정하기</h5>
              </div>
              <br />
              <br />
              <div className={classes.location}>
                <h5>우리동네 설정하기</h5>
              </div>
              <br />
              <br />
              <div className={classes.certification}>
                <h5>토닥터 인증</h5>
                <input id="doctor-validate-input" type="file" accept=".pdf" />
              </div>
              <br />
              <br />
              <Button
                className={classes.ButtonRegister}
                variant="contained"
                size="large"
                onClick={onSave}
              >
                저장
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
};

export default Profile;
