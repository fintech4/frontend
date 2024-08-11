import React, { useState, useEffect, useContext } from "react";
import Navigation from "../ui/bar/Navigation";
import StockSearch from "../ui/bar/StockSearch";
import Wallet from "../ui/Wallet";
import OrderForm from "../ui/OrderForm";
import Guide from "../ui/Guide";
import styled from "styled-components";

import ChartComponent from "../ui/ChartComponent";
import { StocksProvider } from "../../context/stocksContext";
import { media } from "../../media";

const WalletWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  ${media.mobile`
    display: flex;
    width : 100%;
    flex-direction: row;
   s`}
`;

const Wrapper4 = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  ${media.mobile`
    display: flex;
    flex-direction : column;
    margin:0px;
    width : 100%;`}
`;

const Container4 = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  gap: 20px;
  ${media.mobile`
    display: flex;
    flex-direction : column;
    width : 100%;
    `}
`;

const Container5 = styled.div`
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  display: flex;
  height: 310px;
  padding: 60px 29px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  border-radius: 8px;
  background: var(--Schemes-On-Primary, #fff);
`;

const Wrapper2 = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Wrapper3 = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;

  ${media.mobile`
    margin: 20px 0px;
    width : 100%;
  `}
`;
const WarnImage = styled.img`
width: 72px;
height: 107px;
flex-shrink: 0;s
`;

const WarnLogout = styled.p`
  color: var(--black-black-900, #15181e);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 33px */
  letter-spacing: -0.242px;
`;

function MainPage({ isLoggedIn, onLogout }) {
  return (
    <StocksProvider>
      <Navigation path={"/"} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Wrapper2>
        <StockSearch />
      </Wrapper2>

      {/* 차트 관련 섹션 */}
      <Wrapper3>
        <ChartComponent />
      </Wrapper3>
      <Wrapper4>
        {isLoggedIn ? (
          <Container4>
            <WalletWrapper>
              <Wallet
                walletName="예수금"
                image="images/illustration/wallet.png"
              />
              <Wallet
                walletName="총 수익률"
                image="images/illustration/money.png"
              />
            </WalletWrapper>
            <OrderForm />
          </Container4>
        ) : (
          <Container5>
            <WarnImage src="images/illustration/lock.png"></WarnImage>
            <WarnLogout>
              로그인 후, 예수금, 총 수익률, 매도 및 매수 내역을 확인하고 모의
              투자를 시작해보세요💚
            </WarnLogout>
          </Container5>
        )}
      </Wrapper4>
    </StocksProvider>
  );
}

export default MainPage;
