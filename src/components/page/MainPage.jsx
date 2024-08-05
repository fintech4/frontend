import React from "react";
import Navigation from "../ui/bar/Navigation";
import StockSearch from "../ui/bar/StockSearch";
import Wallet from "../ui/Wallet";
import OrderForm from "../ui/OrderForm";
import Guide from "../ui/Guide";
import Calandar from "react-calendar";
import styled from "styled-components";
import CandleChart from "../chart/CandleChart";
import ChartComponent from "../ui/ChartComponent";

const WalletWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Wrapper4 = styled.div`
  display: flex;
  margin: 20px 260px;
  gap: 20px;
  position: relative;
  align-items: flex-start;
`;

const Wrapper3 = styled.div`
  margin: 0 260px;
`;

const Logo = styled.div`
  position: absolute;
  top: 120px; // 상단에서의 거리
  right: -130px; // 우측에서의 거리 (OrderForm 옆으로 이동)
  width: 265.169px;
  height: 113.644px;
  background-image: url("images/logo/header_logo.png"); // 로고 이미지 경로
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
function MainPage() {
  return (
    <>
      <Navigation path={"/"} isLoggedIn={false} />
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

        <div>
          <OrderForm />
        </div>

        <Logo />
      </Wrapper4>
    </>
  );
}

export default MainPage;
