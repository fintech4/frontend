import React from "react";
import styled from "styled-components";
import { media } from "../../media";

const WalletContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  background: var(--Schemes-On-Primary, #fff);
  height: 310px;
  position: relative; /* 자식 요소의 절대 위치를 기준으로 함 */
  ${media.mobile`
    width : 100%;
    height: 140px;
    `};
`;

const WalletImage = styled.img`
  width: 140px;
  height: 140px;
  margin-bottom: 29px;
  ${media.mobile`
   display: flex;
width: 50px;
height: 52.326px;
padding-bottom: 0.326px;
flex-direction: column;
justify-content: center;
align-items: center;
    `};
`;

const WalletName = styled.h2`
  font-size: 20px;
  margin: 0 0 29px 0;
`;

const WalletBalance = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  position: absolute;
  bottom: 25px;
  right: 25px;
  margin: 0;
`;

function Wallet({ walletName, image }) {
  console.log(walletName);
  console.log(image);

  // 하드코딩된 balance 데이터
  const getBalance = (name) => {
    switch (name) {
      case "예수금":
        return "₩100,000,000"; // 백엔드에서 예수금 데이터 요청
      case "총 수익률":
        return "15%"; // 백엔드에서 수익률 데이터 요청
      default:
        return "데이터 없음"; // 기본값
    }
  };

  const balance = getBalance(walletName);

  return (
    <WalletContainer>
      <WalletName>{walletName}</WalletName>
      <WalletImage src={image} alt={walletName} />
      <WalletBalance>{balance}</WalletBalance>
    </WalletContainer>
  );
}

export default Wallet;
