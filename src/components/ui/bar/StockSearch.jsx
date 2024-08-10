import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import SearchContainer from "../SearchContainer";
import { StocksContext } from '../../../context/stocksContext';
import { media } from "../../../media";
export const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const currentDate = getCurrentDateTime();

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  ${media.mobile`
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    margin: 20px 0;
    padding: 0;
    `}
`;

const StockContainer = styled.div`
  display: flex;
  max-width: 500px;
  background-color: #ffffff;
  padding: 10px;
  padding-bottom: 0px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 15px;

  ${media.mobile`
    width : 100%;
     display: flex; 
     background: none;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 24px 18px 24px;
    margin : 0px ;
    `}
`;

const SearchContainerWrapper = styled.div`
  display: flex;
  width: 80%;
  max-width: 400px;
  margin-right: 15px;
  ${media.mobile`
    width : 100%;
    margin: 0px;
    `}
`;

const StockNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 0px;
`;

const StockName = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin: 0px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockText = styled.div`
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Kospi = styled.p`
  font-size: 18px;
  margin: 0;
  margin-right: 5px;
  font-size: 15px;
  color: black;
  font-weight: bold;
`;

const DateText = styled.p`
  font-size: 18px;
  margin: 0;
  font-size: 15px;
  color: black;
  padding-top: 2px;
  font-weight: bold;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0px;

  ${media.mobile`
      align-items: flex-end;
    `}
`;

const PriceNumContainer = styled.div`
  display: flex;
  width: 100%;
  ${media.mobile`
  display: flex; 
  flex-direction: row;
 justify-content: flex-end;
    `}
`;

const Price = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  position: relative;
`;

const PriceAmount = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: ${({ positive, zero }) => (zero ? "#000000" : positive ? "#FF4E36" : "#0C67EF")};
  margin: 0;
`;

const PriceLabel = styled.p`
  font-size: 12px;
  color: ${({ positive, zero }) => (zero ? "#000000" : positive ? "#FF4E36" : "#0C67EF")};
  margin: 0;
  font-weight: bold;
  margin-left: 5px; 
  align-self: flex-start; 
`;

const PriceChange = styled.p`
  font-size: 15px;
  color: ${({ positive, zero }) => (zero ? "#000000" : positive ? "#FF4E36" : "#0C67EF")};
  margin: 0;
  margin-right: 5px;
  font-weight: bold;
`;

const PriceRatio = styled.p`
  font-size: 15px;
  color: ${({ positive, zero }) => (zero ? "#000000" : positive ? "#FF4E36" : "#0C67EF")};
  margin: 0;
  font-weight: bold;
`;

function StockSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stockList, setStockList] = useState([]);
  const { stocks, selectedStockCode, stockHistory, fetchStocks, fetchStocksHistory } = useContext(StocksContext);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedStockCode) {
      // Fetch stock history based on the selected stock code
      const today = getTodayDate();
      fetchStocksHistory(selectedStockCode, "2023-07-01", today);
    }
  }, [selectedStockCode, fetchStocksHistory]);

  const isCompleteCharacters = (value) => {
    const regex = /^[가-힣a-zA-Z\s]+$/;
    return regex.test(value) || value === "";
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (isCompleteCharacters(value)) {
      if (value !== "") {
        try {
          await fetchStocks(value);
          setStockList(stocks); // Update stockList with the fetched stocks
        } catch (error) {
          console.error("Error fetching stocks:", error);
        }
      } else {
        setStockList([]);
      }
    } else {
      setErrorMessage("완전한 한글만 입력해주세요.");
    }
  };

  const priceChange = stockHistory && stockHistory.dailyHistories.length > 0
    ? stockHistory.stockNewestPrice - (stockHistory.dailyHistories[stockHistory.dailyHistories.length-2]?.prices[3] || stockHistory.stockNewestPrice)
    : 0;

  const isPositive = priceChange > 0;
  const isZero = priceChange === 0;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const [year, month, day] = dateString.split('-');
    return `${year}.${month}.${day}`;
  };

  
  return (
    <Wrapper>
      <StockContainer>
        <StockNameContainer>
          <StockName>
            {stockHistory ? stockHistory.stockName : ""}
          </StockName>
          <StockText>
            <DateText>{stockHistory ? formatDate(stockHistory.newestDate) : "" }</DateText>
          </StockText>
        </StockNameContainer>
        <PriceContainer>
          <Price>
            <PriceAmount positive={isPositive} zero={isZero}>
              {stockHistory ? formatNumber(stockHistory.stockNewestPrice) : ""}
            </PriceAmount>
            <PriceLabel positive={isPositive} zero={isZero}>   
              {stockHistory ? "KRW" : ""}
            </PriceLabel>
          </Price>
          {stockHistory && stockHistory.dailyHistories.length > 0 ? (
            <PriceNumContainer>
              <PriceChange positive={isPositive} zero={isZero}>
                {isZero ? `` : isPositive ? `▲${formatNumber(priceChange)}` : `▼${formatNumber(-priceChange)}`}
              </PriceChange>
              <PriceRatio positive={isPositive} zero={isZero}>
                {isZero ? `0%` : isPositive ? `+${(((priceChange) / (stockHistory.dailyHistories[0]?.prices[0] || stockHistory.stockNewestPrice)) * 100).toFixed(2)}%` : `${(((priceChange) / (stockHistory.dailyHistories[0]?.prices[0] || stockHistory.stockNewestPrice)) * 100).toFixed(2)}%`}
              </PriceRatio>
            </PriceNumContainer>
          ) : null}
        </PriceContainer>
      </StockContainer>
      <SearchContainerWrapper>
        <SearchContainer
          searchTerm={searchTerm}
          onSearchTermChange={handleChange}
          stockList={stockList}
          //onStockClick={handleStockClick}
        />
      </SearchContainerWrapper>
    </Wrapper>
  );
}

export default StockSearch;
