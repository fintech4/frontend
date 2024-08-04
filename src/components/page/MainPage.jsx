import React from "react";
import Navigation from "../ui/bar/Navigation";
import StockSearch from "../ui/bar/StockSearch";
import Wallet from "../ui/Wallet";
import OrderForm from "../ui/OrderForm";
import Guide from "../ui/Guide";
import CandleChart from "../chart/CandleChart";

function MainPage() {
  return (
    <>
      <Navigation path={"/"} isLoggedIn={false} />
      <StockSearch />
      
      {/* 차트 관련 섹션 */}
      <div className="chart">
        <div>
          <h1>차트</h1>
          <p>달력</p>
          <p>삼성전자 3개월 주가데이터</p>
        </div>
        <div>
          <CandleChart /> {/* CandleChart 컴포넌트 추가 */}
        </div>
        <img src="" alt="로고" />
      </div>

      {/* 지갑 관련 섹션 */}
      <div>
        <Wallet WalletName="잔고" />
        <Wallet WalletName="총 수익률" />
      </div>

      {/* 주문 폼 섹션 */}
      <div>
        <OrderForm />
      </div>

      {/* 가이드 섹션 */}
      <div>
        <Guide />
      </div>
    </>
  );
}

export default MainPage;
