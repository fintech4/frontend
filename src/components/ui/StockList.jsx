import React from "react";
import styled from "styled-components";

const StockListContainer = styled.ul`
  list-style: none;
  padding: 0;
  msrgin: 10px 0 0 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const StockListItem = styled.li`
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const StockList = ({ stockList, onStockClick }) => {
  return (
    <StockListContainer>
      {stockList.map((stock) => (
        <StockListItem key={stock} onClick={() => onStockClick(stock)}>
          {stock.stockName}
        </StockListItem>
      ))}
    </StockListContainer>
  );
};

export default StockList;
