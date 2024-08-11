import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../ui/bar/Navigation";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  background-image: url(${"images/logo/bg.png"});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container1 = styled.div`
  display: flex;
  width: 100%;
  max-width: 521px;
  flex-direction: column;
  align-items: center;
  gap: 52px;
`;

const Container2 = styled.div`
  display: flex;
  width: 100%;
  max-width: 521px;
  flex-direction: column;
  gap: 34px;
  align-items: center;
  align-items: center;
  padding: 46px 37px;
  border-radius: 13.397px;
  border: 2px solid var(--primary-primary-400, #b7e6e2);
  background: var(--Schemes-On-Primary, #fff);

  /* menu-shadow */
  box-shadow: 0px 4px 10px 1px rgba(113, 205, 199, 0.3);
`;

const InputTitle = styled.p`
  color: var(--primary-primary-800, #058077);
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 10%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`;

const InputContent = styled.input`
  display: flex;
  height: 52px;
  padding: 20px 21px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 5.024px;
  border: 0.5px solid var(--black-black-700, #5b6b86);
  background: var(--Schemes-On-Primary, #fff);
`;

const ButtonStyle = styled.button`
  display: flex;
  height: 46px;
  padding: 10px 22px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: var(--Pill, 100px);
  background: var(--primary-primary-800, #058077);
  color: var(--black-black-100, var(--Schemes-On-Primary, #fff));
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 33px */
  border: none;
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WelcomeTitle = styled.h1`
  color: var(--primary-primary-800, #058077);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  flex: 1 0 0;
  align-self: stretch;
`;
const LogoImg = styled.img`
  width: 297.46px;
  height: auto;
  margin-bottom: 0px;
  flex-shrink: 0;
`;

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
      <Wrapper>
        <Container1>
          <Contents>
            <WelcomeTitle>투유로 만나는 무한한 투자여정</WelcomeTitle>
            <LogoImg src="/images/logo/logo.gif" />
          </Contents>
          <Container2>
            {" "}
            <InputWrapper>
              <InputTitle>아이디</InputTitle>
              <InputContent
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ID를 입력해주세요"
              />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>비밀번호</InputTitle>
              <InputContent
                type="password"
                placeholder="비밀번호를 입력해주세요"
              ></InputContent>
            </InputWrapper>
            <ButtonStyle onClick={handleLogin}>로그인</ButtonStyle>
          </Container2>
        </Container1>
      </Wrapper>
    </>
  );
}

export default LoginPage;
