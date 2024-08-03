import React from "react";
import Navigation from "../ui/bar/Navigation";
import StockSearch from "../ui/bar/StockSearch";
import Wallet from "../ui/Wallet";
import OrderForm from "../ui/OrderForm";
import Guide from "../ui/Guide";

function MainPage() {
  return (
    <>
      <Navigation path={"/"} isLoggedIn={false} />
      <StockSearch />
      <div className="chart">
        <div>
          <h1>차트</h1>
          <p>달력</p>
        </div>
        <div>차트 컴포넌트 들어올 자리</div>
        <img src="" alt="로고" />
      </div>

      <div>
        <Wallet WalletName="잔고" />
        <Wallet WalletName="총 수익률" />
      </div>

      <div>
        <OrderForm /> {/* OrderForm 컴포넌트를 추가 */}
      </div>

      <div>
        <Guide />
      </div>
    </>
  );
}

export default MainPage;
