import React from "react";

function StockSearch() {
  return (
    <>
      <div className="wrapper">
        <div className="stockname"></div>
        <div className="search">
          <input type="text" placeholder="원하시는 종목을 검색하세요." />
          <button type="submit">Search</button>
        </div>
      </div>
    </>
  );
}

export default StockSearch;
