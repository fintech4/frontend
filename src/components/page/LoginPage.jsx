import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../ui/bar/Navigation";

function LoginPage({ isLoggedIn, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [loginResult, setLoginResult] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogin = async () => {
    try {
      const response = await axios.get("/toou/api/auth/login/kakao", {
        params: { kakaoId: email },
      });
      if (response.data.ok) {
        setLoginResult("로그인 성공");
        localStorage.setItem("token", "dummyToken"); // 필요시 토큰을 로컬 스토리지에 저장
        onLoginSuccess(); // 로그인 성공 시 상태 업데이트
        navigate("/main"); // 로그인 성공 시 /main 페이지로 리다이렉트
      } else {
        setLoginResult("로그인 실패");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginResult("로그인 실패");
    }
  };

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} />
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ID를 입력해주세요"
        />

        <button onClick={handleLogin}>로그인</button>
      </div>
    </>
  );
}

export default LoginPage;
