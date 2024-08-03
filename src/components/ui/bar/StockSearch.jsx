import React from "react";

export const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더합니다.
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

const currentDate = getCurrentDateTime();

function StockSearch() {
  const priceChange = 14000; // 예시 데이터: 가격 변화 값
  const priceRatio = 4.54; // 예시 데이터: 현재 가격

  return (
    <>
      <div className="wrapper">
        <div className="stockname">
          <p className="data">삼성SDI</p>
          <div>
            <p className="kospi">코스피</p>
            <p className="data">{currentDate}</p>
          </div>
          <p className="price">123,000 KRW</p>
          {priceChange > 0 ? (
            <>
              <div>
                <p className="price-change">▲{priceChange}</p>
                <p className="price-ratio">+{priceRatio}%</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="price-change">▼{priceChange}</p>
                <p className="price-ratio">-{priceRatio}%</p>
              </div>
            </>
          )}
        </div>
        <div className="search">
          <input type="text" placeholder="원하시는 종목을 검색하세요." />
          <button type="submit">Search</button>
        </div>
      </div>
    </>
  );
}

export default StockSearch;
