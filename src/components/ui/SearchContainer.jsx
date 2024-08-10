import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import StockList from "./StockList";
import { StocksContext } from "../../context/stocksContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-right: 15px;
  position: relative; /* 자식 요소의 위치를 기준으로 함 */
`;

const SearchTitle = styled.h2`
  color: #1e1e1e;
  width: 30%;
  margin-right: 16px;
  font-family: "Pretendard Varia  ble";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: -0.22px;
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 70%; /* 검색 입력창과 x 버튼의 길이를 제한합니다. */
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 35px; /* x 버튼과의 간격을 충분히 확보합니다. */
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box; /* padding과 border를 포함한 전체 너비를 보장합니다. */
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px; /* x 버튼의 위치 조정 */
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #aaa;
  &:hover {
    color: #333;
  }
`;

const StockListWrapper = styled.div`
  position: absolute;
  top: 100%; /* 검색 input 바로 아래에 위치 */
  right: 0; /* 부모 컨테이너의 오른쪽 끝에 맞춤 */
  width: 80%; /* 부모 컨테이너의 너비의 80%로 설정 */
  max-width: 260px; /* 최대 너비 설정 */
  z-index: 1; /* 검색 input 위에 나타나도록 */
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* padding과 border를 포함한 너비 계산 */
`;




const StockInfo = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const SearchContainer = ({
  searchTerm,
  onSearchTermChange,
  onKeyPress,
  errorMessage,
}) => {
  const { stocks, fetchStocks, updateSelectedStock, fetchStocksHistory } = useContext(StocksContext);
  const [isStockListVisible, setStockListVisible] = useState(false);

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchStocks(searchTerm);
      setStockListVisible(true); // 검색어가 있을 때는 리스트 보이기
    } else {
      setStockListVisible(false); // 검색어가 없을 때는 리스트 숨기기
    }
  }, [searchTerm, fetchStocks]);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleStockClick = (stock) => {
    // Update the search term with the selected stock name
    onSearchTermChange({ target: { value: stock.stockName } });

    // Use a timeout to ensure the searchTerm update has completed
    setTimeout(() => {
      // Update the selected stock in context
      updateSelectedStock(stock);

      // Fetch stock history
      const today = getTodayDate();
      fetchStocksHistory(stock.stockCode, "", today); // 예시 날짜

      // Hide the stock list
      setStockListVisible(false);
    }, 0); // Delay to ensure state update
  };

  const handleClearClick = () => {
    // Clear the search term
    onSearchTermChange({ target: { value: "" } });
  };

  return (
    <Container>
      <SearchTitle>종목검색</SearchTitle>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="원하시는 종목을 검색하세요."
          value={searchTerm}
          onChange={onSearchTermChange}
          onKeyPress={onKeyPress}
        />
        {searchTerm && (
          <ClearButton onClick={handleClearClick}>
            &times; {/* x 버튼 문자 */}
          </ClearButton>
        )}
      </SearchInputContainer>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {isStockListVisible && stocks.length > 0 && (
        <StockListWrapper>
          <StockList
            stockList={stocks}
            onStockClick={handleStockClick}
          />
        </StockListWrapper>
      )}
    </Container>
  );
};

export default SearchContainer;
