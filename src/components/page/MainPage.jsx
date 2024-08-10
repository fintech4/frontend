import React from "react";
import Navigation from "../ui/bar/Navigation";
import StockSearch from "../ui/bar/StockSearch";
import Wallet from "../ui/Wallet";
import OrderForm from "../ui/OrderForm";
import Guide from "../ui/Guide";
import styled from "styled-components";
import CandleChart from "../chart/CandleChart";
import ChartComponent from "../ui/ChartComponent";
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
  margin: 20px 360px 0 360px;
  display: flex;
  gap: 20px;
  flex: 1 0 0;
  width: calc(100% - 720px); /* 좌우 마진을 제외한 너비 계산 */
  ${media.mobile`
    display: flex;
    flex-direction : column;
    margin:0px;
    width : 100%;`}
`;

const Wrapper3 = styled.div`
  margin: 0 360px;
  width: calc(100% - 720px); /* 좌우 마진을 제외한 너비 계산 */

  ${media.mobile`
    margin: 20px 0px;
    width : 100%;
  `}
`;

function MainPage({ isLoggedIn, onLogout }) {
  return (
    <>
      <Navigation path={"/"} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <StockSearch />

      {/* 차트 관련 섹션 */}
      <Wrapper3>
        <ChartComponent />
      </Wrapper3>

      <Wrapper4>
        <WalletWrapper>
          <Wallet walletName="예수금" image="images/illustration/wallet.png" />
          <Wallet
            walletName="총 수익률"
            image="images/illustration/money.png"
          />
        </WalletWrapper>

        <OrderForm />
      </Wrapper4>
    </>
  );
}

export default MainPage;
