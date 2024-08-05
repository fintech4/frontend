import React from "react";
import styled from "styled-components";
import StockList from "./StockList";

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
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: -0.22px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const StockListWrapper = styled.div`
  position: absolute;
  top: 100%; /* 검색 input 바로 아래에 위치 */
  width: 100%;
  z-index: 1; /* 검색 input 위에 나타나도록 */
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = ({
  searchTerm,
  onSearchTermChange,
  onKeyPress,
  errorMessage,
  stockList,
  onStockClick,
}) => {
  return (
    <Container>
      <SearchTitle>종목검색</SearchTitle>
      <SearchInput
        type="text"
        placeholder="원하시는 종목을 검색하세요."
        value={searchTerm}
        onChange={onSearchTermChange}
        onKeyPress={onKeyPress}
      />
      {stockList.length > 0 && (
        <StockListWrapper>
          <StockList stockList={stockList} onStockClick={onStockClick} />
        </StockListWrapper>
      )}
    </Container>
  );
};

export default SearchContainer;
