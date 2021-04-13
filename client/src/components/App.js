import React, { useState, useEffect } from "react";
import axios from "axios";
import AppRouter from "components/Router";
import "components/css/App.css";

axios.defaults.baseURL = `http://localhost:5000`;
axios.defaults.withCredentials = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    // 로그인 되어 있는 상태인지 확인
    setIsLoggedIn(sessionStorage.userid);
  }, []);

  return (
    <>
      <AppRouter isLoggedIn={Boolean(isLoggedIn)} />
    </>
  );
}

export default App;
