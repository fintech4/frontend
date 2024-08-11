import React, { useContext } from "react";
import styled from "styled-components";
import { media } from "../../media";
import { StocksContext } from "../../context/stocksContext";

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
  position: relative;
  ${media.mobile`
    width: 100%;
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
  ${media.mobile`
    font-size: 16px;
  `};
`;

const WalletBalance = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  position: absolute;
  bottom: 25px;
  right: 25px;
  margin: 0;
  ${media.mobile`
    font-size: 20px;
  `};
`;

function Wallet({ walletName, image }) {
  const { myAsset } = useContext(StocksContext);

  // Log myAsset to check if it's being received correctly
  console.log("myAsset:", myAsset);

  // Ensure myAsset is not undefined
  const getBalance = (name) => {
    if (!myAsset) {
      return "로딩 중";
    }

    switch (name) {
      case "예수금":
        return (myAsset.deposit).toLocaleString();
      case "총 수익률":
        return `${(myAsset.yield)}%`;
      default:
        return "데이터가 없어요:(";
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
