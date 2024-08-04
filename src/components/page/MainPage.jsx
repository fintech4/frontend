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
      <div className="chart">
        <div>
          <h1>차트</h1>
          <Calandar />
        </div>
        <div>차트 컴포넌트 들어올 자리</div>
        <img src="" alt="로고" />
      </div>

      <div>
        <Wallet walletName="예수금" />
        <Wallet walletName="총 수익률" />
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
