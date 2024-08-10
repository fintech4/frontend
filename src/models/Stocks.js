// models/Stocks.js
function Stock(stockCode, stockName, market) {
  this.stockCode = stockCode;
  this.stockName = stockName;
  this.market = market;
}

Stock.prototype.getStockInfo = function() {
  return `${this.stockName} (${this.stockCode}) - ${this.market}`;
};

export default Stock;


// {
//     "ok": true,
//     "stockSearchList": [
//       {
//         "stockCode": "028050",
//         "stockName": "삼성E&A",
//         "market": "KOSPI"
//       },
//       {
//         "stockCode": "448730",
//         "stockName": "삼성FN리츠",
//         "market": "KOSPI"
//       },
//       {
//         "stockCode": "006400",
//         "stockName": "삼성SDI",
//         "market": "KOSPI"
//       },
//       {
//         "stockCode": "006405",
//         "stockName": "삼성SDI우",
//         "market": "KOSPI"
//       }
//     ]
//   }