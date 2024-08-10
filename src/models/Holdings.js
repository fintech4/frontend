// src/models/Holdings.js
class Holdings {
    constructor(stockName, averagePurchasePrice, currentPrice, quantity, valuation, yieldValue) {
      this.stockName = stockName;
      this.averagePurchasePrice = averagePurchasePrice;
      this.currentPrice = currentPrice;
      this.quantity = quantity;
      this.valuation = valuation;
      this.yieldValue = yieldValue;
    }
  
    // 매입 가격과 현재 가격을 기반으로 수익률을 계산하는 메서드
    calculateYield() {
      if (this.averagePurchasePrice === 0) return 0;
      return ((this.currentPrice - this.averagePurchasePrice) / this.averagePurchasePrice * 100).toFixed(2);
    }
  
    // 주식의 요약 정보를 반환하는 메서드
    getHoldingSummary() {
      return `${this.stockName}: ${this.quantity} shares, Average Purchase Price - ${this.averagePurchasePrice}, Current Price - ${this.currentPrice}, Valuation - ${this.valuation}, Yield - ${this.yieldValue}`;
    }
  }
  
  export default Holdings;
  