import React from "react";
import Navigation from "../ui/bar/Navigation";
import StockSearch from "../ui/bar/StockSearch";
import Wallet from "../ui/Wallet";
import OrderForm from "../ui/OrderForm";
import Guide from "../ui/Guide";
import Calandar from "react-calendar";


function MainPage() {
  return (
    <>
      <Navigation path={"/"} isLoggedIn={false} />
      <StockSearch />
      
      {/* 차트 관련 섹션 */}
      <div className="chart">
        <div>
          <h1>차트</h1>
          <Calandar />

        </div>
        <img src="" alt="로고" />
      </div>

      {/* 지갑 관련 섹션 */}
      <div>
        <Wallet walletName="예수금" />
        <Wallet walletName="총 수익률" />
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
