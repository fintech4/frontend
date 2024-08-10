import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/styles.css";
import MainPage from "./components/page/MainPage";
import MyPage from "./components/page/MyPage";
import WelcomePage from "./components/page/WelcomePage";
import "./assets/css/styles.css";
import LoginPage from "./components/page/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져와 로그인 상태를 확인
    const token = localStorage.getItem("token");
    console.log("Token found:", token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    console.log("Token after removal:", localStorage.getItem("token")); // 토큰 제거 후 확인
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/main"
          element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
        <Route path="/mypage" element={<MyPage />} />{" "}
        <Route
          path="/login"
          element={
            <LoginPage
              isLoggedIn={isLoggedIn}
              onLoginSuccess={handleLoginSuccess}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
