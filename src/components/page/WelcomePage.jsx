import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../media";

function WelcomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/main"); // 로그인 페이지 또는 메인 페이지로 이동하도록 설정
  };

  const Wrapper = styled.div`
    background-image: url(${"images/logo/bg.png"});
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;

  const Container = styled.div`
    display: flex;
    padding: 0px 24px 30px 24px;
    flex-direction: column;
    align-items: center;
    gap: 67px;

    ${media.mobile`
      width : 80%;
      `}
  `;
  const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  `;
  const WelcomeTitle = styled.h1`
    color: var(--primary-primary-800, #058077);
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    flex: 1 0 0;
    align-self: stretch;

    ${media.mobile`
      color: var(--primary-primary-800, #058077);
text-align: center;
font-family: "Pretendard Variable";
font-size: 20px;
font-style: normal;
font-weight: 600;
`}
  `;
  const LogoImg = styled.img`
    width: 428px;
    height: 114px;
    flex-shrink: 0;

    ${media.mobile`
      width : 80%;
      height : auto;
      `}
  `;
  const WelcomeButton = styled.button`
    display: flex;
    width: 482px;
    padding: 14px 65px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: var(--Pill, 100px);
    border: none;
    background: var(--primary-primary-800, #058077);
    color: var(--black-black-100, var(--Schemes-On-Primary, #fff));
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 48px */
    cursor: pointer;

    ${media.mobile`
      width : 80%;
      padding: 14px 65px;
      font-size : 20px;
      `}
  `;

  return (
    <Wrapper>
      <Container>
        <Contents>
          <WelcomeTitle>투유로 만나는 무한한 투자여정</WelcomeTitle>
          <LogoImg src="images/logo/header_logo.png" />
        </Contents>
        <WelcomeButton onClick={handleStart}>투자하기</WelcomeButton>
      </Container>{" "}
    </Wrapper>
  );
}

export default WelcomePage;
