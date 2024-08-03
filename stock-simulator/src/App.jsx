import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/styles.css";
import MainPage from "./components/page/MainPage";
import MyPage from "./components/page/MyPage";
import Navigation from "./components/ui/bar/Navigation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
