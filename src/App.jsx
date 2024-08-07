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
    // 로그인 상태를 확인하는 로직 (예: 로컬 스토리지에서 토큰 확인)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage isLoggedIn={isLoggedIn} />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
