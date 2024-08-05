import React from "react";
import Navigation from "../ui/bar/Navigation";
import StockSearch from "../ui/bar/StockSearch";
import Wallet from "../ui/Wallet";
import OrderForm from "../ui/OrderForm";
import Guide from "../ui/Guide";
import Calandar from "react-calendar";
import styled from "styled-components";
import CandleChart from "../chart/CandleChart";

const WalletWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Wrapper4 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 260px;
`;

function MainPage() {
  return (
    <>
      <Navigation path={"/"} isLoggedIn={false} />
      <StockSearch />

      {/* 차트 관련 섹션 */}
      <div className="chart">
        <div>
          <h1>차트</h1>
          <CandleChart />
        </div>
        <img src="" alt="로고" />
      </div>

      <Wrapper4>
        <WalletWrapper>
          <Wallet walletName="예수금" image="images/illustration/wallet.png" />
          <Wallet
            walletName="총 수익률"
            image="images/illustration/money.png"
          />
        </WalletWrapper>

        <div>
          <OrderForm /> {/* OrderForm 컴포넌트를 추가 */}
        </div>

        <div>
          <Guide />
        </div>
      </Wrapper4>
    </>
  );
}

export default MainPage;
