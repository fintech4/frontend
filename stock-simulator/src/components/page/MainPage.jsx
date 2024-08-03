import React from 'react';
import StockList from '../list/StockList';

const HomePage = () => {
  const stocks = [
    { id: 1, symbol: 'AAPL', quantity: 10, price: 150 },
    { id: 2, symbol: 'GOOGL', quantity: 5, price: 2800 }
  ];

  return (
    <div>
      <h1>Home Page</h1>
      <StockList stocks={stocks} />
    </div>
  );
};

export default HomePage;
