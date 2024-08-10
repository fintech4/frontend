// src/models/AccountAssets.js
class AccountAssets {
    constructor(totalAsset, deposit, totalHoldingsValue, totalHoldingsQuantity, investmentYield) {
      this.totalAsset = totalAsset;
      this.deposit = deposit;
      this.totalHoldingsValue = totalHoldingsValue;
      this.totalHoldingsQuantity = totalHoldingsQuantity;
      this.investmentYield = investmentYield;
    }
  
    // 투자 수익률에 따라 자산의 총 가치와 예금을 계산하는 메서드 추가
    calculateTotalValue() {
      return this.totalHoldingsValue + this.deposit;
    }
  
    // 투자 수익률을 기반으로 투자 수익을 계산하는 메서드 추가
    calculateInvestmentReturn() {
      return (this.totalHoldingsValue * this.investmentYield) / 100;
    }
  
    // 자산 포트폴리오 요약을 반환하는 메서드
    getPortfolioSummary() {
      return `Total Asset: ${this.totalAsset}, Deposit: ${this.deposit}, ` +
             `Total Holdings Value: ${this.totalHoldingsValue}, ` +
             `Total Holdings Quantity: ${this.totalHoldingsQuantity}, ` +
             `Investment Yield: ${this.investmentYield}%`;
    }
  }
  
  export default FinancialPortfolio;
  