import React from 'react';
import StockItem from './StockItem';

const StockList = ({ stocks }) => (
  <ul>
    {stocks.map(stock => (
      <StockItem key={stock.id} stock={stock} />
    ))}
  </ul>
);

export default StockList;
