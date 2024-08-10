import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/styles.css";
import MainPage from "./components/page/MainPage";
import MyPage from "./components/page/MyPage";
import WelcomePage from "./components/page/WelcomePage";
import Navigation from "./components/ui/bar/Navigation";
import "./assets/css/styles.css";

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

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
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
        <Route
          path="/mypage"
          element={<MyPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
