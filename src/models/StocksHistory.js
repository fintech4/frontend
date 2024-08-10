// src/models/StockHistory.js
import DailyHistory from './DailyHistory';

class StockHistory {
  constructor(id, stockCode, stockName, stockNewestPrice, newestDate, dailyHistories) {
    this.id = id;
    this.stockCode = stockCode;
    this.stockName = stockName;
    this.stockNewestPrice = stockNewestPrice;
    this.newestDate = newestDate;
    // dailyHistories 배열의 각 요소를 DailyHistory 인스턴스로 변환합니다.
    this.dailyHistories = dailyHistories.map(
      history => new DailyHistory(history.date, history.prices)
    );
  }

  // 주식의 최신 가격과 최신 날짜를 반환하는 메서드
  getStockSummary() {
    return `${this.stockName} (${this.stockCode}): ${this.stockNewestPrice} on ${this.newestDate}`;
  }
}

export default StockHistory;

// {
//     "ok": true,
//     "id": 2327854,
//     "stockCode": "005930",
//     "stockName": "삼성전자",
//     "stockNewestPrice": 72700,
//     "newestDate": "2024-07-31",
//     "dailyHistories": [
//       {
//         "date": "2024-01-02",
//         "prices": [
//           78200,
//           79800,
//           78200,
//           79600
//         ]
//       },
//       {
//         "date": "2024-01-03",
//         "prices": [
//           78500,
//           78800,
//           77000,
//           77000
//         ]
//       },
//       {
//         "date": "2024-01-04",
//         "prices": [
//           76100,
//           77300,
//           76100,
//           76600
//         ]
//       },
//       {
//         "date": "2024-01-05",
//         "prices": [
//           76700,
//           77100,
//           76400,
//           76600
//         ]
//       },
//       {
//         "date": "2024-01-08",
//         "prices": [
//           77000,
//           77500,
//           76400,
//           76500
//         ]
//       },
//       {
//         "date": "2024-01-09",
//         "prices": [
//           77400,
//           77700,
//           74300,
//           74700
//         ]
//       },
//       {
//         "date": "2024-01-10",
//         "prices": [
//           75000,
//           75200,
//           73200,
//           73600
//         ]
//       },
//       {
//         "date": "2024-01-11",
//         "prices": [
//           72900,
//           73600,
//           72700,
//           73200
//         ]
//       },
//       {
//         "date": "2024-01-12",
//         "prices": [
//           73000,
//           74100,
//           72800,
//           73100
//         ]
//       },
//       {
//         "date": "2024-01-15",
//         "prices": [
//           73200,
//           74000,
//           73200,
//           73900
//         ]
//       },
//       {
//         "date": "2024-01-16",
//         "prices": [
//           73500,
//           73700,
//           72500,
//           72600
//         ]
//       },
//       {
//         "date": "2024-01-17",
//         "prices": [
//           73100,
//           73300,
//           71000,
//           71000
//         ]
//       },
//       {
//         "date": "2024-01-18",
//         "prices": [
//           71600,
//           72000,
//           70700,
//           71700
//         ]
//       },
//       {
//         "date": "2024-01-19",
//         "prices": [
//           73500,
//           74700,
//           73000,
//           74700
//         ]
//       },
//       {
//         "date": "2024-01-22",
//         "prices": [
//           75900,
//           76000,
//           75000,
//           75100
//         ]
//       },
//       {
//         "date": "2024-01-23",
//         "prices": [
//           75700,
//           75800,
//           74300,
//           75200
//         ]
//       },
//       {
//         "date": "2024-01-24",
//         "prices": [
//           75200,
//           75200,
//           73500,
//           74000
//         ]
//       },
//       {
//         "date": "2024-01-25",
//         "prices": [
//           74200,
//           74800,
//           73700,
//           74100
//         ]
//       },
//       {
//         "date": "2024-01-26",
//         "prices": [
//           73700,
//           74500,
//           73300,
//           73400
//         ]
//       },
//       {
//         "date": "2024-01-29",
//         "prices": [
//           73800,
//           75200,
//           73500,
//           74400
//         ]
//       },
//       {
//         "date": "2024-01-30",
//         "prices": [
//           75000,
//           75300,
//           73700,
//           74300
//         ]
//       },
//       {
//         "date": "2024-01-31",
//         "prices": [
//           73400,
//           74000,
//           72500,
//           72700
//         ]
//       }
//     ]
//   }
