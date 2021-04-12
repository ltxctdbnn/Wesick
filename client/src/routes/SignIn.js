import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import "routes/css/SignIn.css";
// import { Grid } from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";

axios.defaults.withCredentials = true;

// 로그인 페이지
function SignIn() {
  const url = `http://localhost:5000`;
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

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

  return (
    <div className="sign-container">
      {/* <form style={{ display: "flex", flexDirection: "column" }}>
        <h2>토닥토닥</h2>
        <input
          name="userEmail"
          type="email"
          value={userEmail}
          onChange={onChangeHandler}
          placeholder="이메일"
          required
        />
        <input
          name="userPassword"
          type="password"
          value={userPassword}
          onChange={onChangeHandler}
          placeholder="비밀번호"
          required
        />
        <br />
        <div className="sign-btn-container">
          <button
            id="signup-btn"
            onClick={() => {
              history.push({
                pathname: "/sign-up",
              });
            }}
          >
            회원가입
          </button>
          <button onClick={onSignInHandler}>로그인</button>
        </div>
      </form> */}
      <Container>
        <Row>
          <Col>로그인</Col>
        </Row>
        <Row>
          <Col>
            <input
              name="userEmail"
              type="email"
              value={userEmail}
              onChange={onChangeHandler}
              placeholder="이메일"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              name="userPassword"
              type="password"
              value={userPassword}
              onChange={onChangeHandler}
              placeholder="비밀번호"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              id="signup-btn"
              onClick={() => {
                history.push({
                  pathname: "/sign-up",
                });
              }}
            >
              회원가입
            </button>
          </Col>
          <Col>
            <button onClick={onSignInHandler}>로그인</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignIn;
