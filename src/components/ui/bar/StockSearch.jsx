import React, { useState } from "react";

export const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더합니다.
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

const currentDate = getCurrentDateTime();

function StockSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const priceChange = selectedStock ? selectedStock.priceChange : 14500; // 예시 데이터: 가격 변화 값
  const priceRatio = selectedStock ? selectedStock.priceRatio : 4.54; // 예시 데이터: 현재 가격

  const fetchStockList = async (query) => {
    try {
      // 실제 API 요청 코드 작성할 것임.
      // const response = await axios.get(`/api/search-stocks?query=${query}`);
      // setStockList(response.data.stocks); // assuming the response has a "stocks" array

      // 로컬 환경을 위해 가짜 데이터 사용
      setStockList(["삼성전자", "LG전자", "SK하이닉스", "현대자동차"]);
    } catch (error) {
      console.error("Error fetching stock list:", error);
      // 로컬 환경을 위해 가짜 데이터 사용
      setStockList(["삼성전자", "LG전자", "SK하이닉스", "현대자동차"]);
    }
  };

  const fetchStockDetails = async (stockName) => {
    try {
      // 여기에 실제 API 요청 코드를 추가하세요.
      // const response = await axios.get(`/api/stock-details?name=${stockName}`);
      // setSelectedStock(response.data); // assuming the response has stock details

      // 로컬 환경을 위해 가짜 데이터 사용
      setSelectedStock({
        name: stockName,
        priceChange: 2000,
        priceRatio: 2.5,
        price: "120,000 KRW",
      });

      console.log(selectedStock);
    } catch (error) {
      console.error("Error fetching stock details:", error);
      // 로컬 환경을 위해 가짜 데이터 사용
      setSelectedStock({
        name: stockName,
        priceChange: 2000,
        priceRatio: 2.5,
        price: "120,000 KRW",
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = /^[가-힣]+$/;

    setSearchTerm(value);

    if (regex.test(value) || value === "") {
      setErrorMessage("");
      if (value !== "") {
        fetchStockList(value);
      } else {
        setStockList([]);
      }
    } else {
      setErrorMessage("완전한 한글만 입력해주세요.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm) {
      fetchStockDetails(searchTerm);
    }
  };

  const handleStockClick = (stockName) => {
    fetchStockDetails(stockName);
  };

  return (
    <>
      <div className="wrapper">
        <div className="stockname">
          <p className="data">삼성SDI</p>
          <div>
            <p className="kospi">코스피</p>
            <p className="data">{currentDate}</p>
          </div>
          <p className="price">
            {selectedStock ? selectedStock.price : "123,000 KRW"}
          </p>
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
          <input
            type="text"
            placeholder="원하시는 종목을 검색하세요."
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {stockList.length > 0 && (
            <ul className="stock-list">
              {stockList.map((stock) => (
                <li key={stock} onClick={() => handleStockClick(stock)}>
                  {stock}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default StockSearch;
