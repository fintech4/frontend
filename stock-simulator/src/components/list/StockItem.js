import React from 'react';

const StockItem = ({ stock }) => (
  <li>
    {stock.symbol} - {stock.quantity} shares at ${stock.price}
  </li>
);

export default StockItem;
