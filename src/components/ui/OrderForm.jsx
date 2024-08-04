import React, { useState } from "react";

function OrderForm() {
  const price = 338000; // 주문 가격

  const [quantity, setQuantity] = useState(0);
  const [orderType, setOrderType] = useState(null); // "buy" 또는 "sell"

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleBuy = () => {
    setOrderType("buy");
  };

  const handleSell = () => {
    setOrderType("sell");
  };

  const handleOrder = () => {
    if (orderType === "buy") {
      console.log("구매 완료");
    } else if (orderType === "sell") {
      console.log("판매 완료");
    }
  };

  const totalAmount = price * quantity;

  return (
    <>
      <h2>주문 정보</h2>
      <div>
        <button onClick={handleBuy}>매수</button>
        <button onClick={handleSell}>매도</button>
      </div>
      <div>
        <label>주문 가격: {price}₩</label>
      </div>
      <div>
        <label>
          주문 수량:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </label>
      </div>
      <div>
        <label>주문 총액: {totalAmount.toLocaleString()}₩</label>
      </div>

      {orderType && (
        <div>
          {orderType === "buy" ? (
            <button onClick={handleOrder}>구매</button>
          ) : (
            <button onClick={handleOrder}>판매</button>
          )}
        </div>
      )}
    </>
  );
}

export default OrderForm;



