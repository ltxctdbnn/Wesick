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
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '100%',
    //     height: '100vh',
    //   }}
    // >
    //   <div id="profile-register-container">
    //     <div className="profile-register-header">
    //       <h1>프로필 작성</h1>
    //     </div>
    //     <div id="profile-register-body">
    //       <div id="profile-photo">
    //         <label for="profile-photo-input">
    //           사진 업로드
    //           <input
    //             id="profile-photo-input"
    //             type="file"
    //             accept="image/*"
    //             onChange={onFileChange}
    //           />
    //         </label>
    //         <input id="self-introduction-input" type="text" placeholder="소개말을 입력해주세요." />
    //         {profilePhoto && (
    //           <div>
    //             <img src={profilePhoto} width="200px" height="150px" />
    //             <button onClick={onClearAttachment}>지우기</button>
    //           </div>
    //         )}
    //       </div>
    //       <br />
    //       <div>
    //         <h3>관심질환 설정하기</h3>
    //         <span>고혈압 </span>
    //         <span>다이어트 </span>
    //         <span>당뇨 </span>
    //         <span>운동 </span>
    //       </div>
    //       <br />
    //       <div>
    //         <h3>우리동네 설정하기</h3>
    //         <input id="address-input" type="text" placeholder="거주지 주소를 입력해주세요." />
    //       </div>
    //       <br />
    //       <div id="doctor-validate">
    //         <h3>토닥터 인증</h3>
    //         <label for="doctor-validate-input">
    //           의사 면허증을 업로드해주세요. (.pdf 파일 형식만 가능)
    //           <input id="doctor-validate-input" type="file" accept=".pdf" />
    //         </label>
    //       </div>
    //     </div>
    //     <div id="profile-register-footer">
    //       <button onClick={onSave}>저장</button>
    //     </div>
    //   </div>
    // </div>
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
              {/* <TextField
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
              /> */}
              <Button
                className={classes.ButtonRegister}
                variant="contained"
                size="large"
                // onClick={onSignUpHandler}
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
