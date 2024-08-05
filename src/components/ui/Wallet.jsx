import React from "react";
import styled from "styled-components";

const WalletContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  background-color: #f9f9f9;
  width: 271px;
  height: 310px;
  margin: 20px auto;
  position: relative; /* 자식 요소의 절대 위치를 기준으로 함 */
`;

const WalletImage = styled.img`
  width: 140px;
  height: 140px;
  margin-bottom: 29px;
`;

const WalletName = styled.h2`
  font-size: 24px;
  margin: 0 0 29px 0;
`;

const WalletBalance = styled.p`
  font-size: 20px;
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
