import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../ui/modal/BuyModal"; // 모달 컴포넌트 임포트

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  display: flex;
  height: 60px;
  padding-left: 35px;
  align-items: center;
  gap: 35px;
  flex-shrink: 0;
`;

const OrderButton = styled.button`
  display: flex;
  width: 70px;
  height: 60px;
  justify-content: center;
  align-items: center;
  gap: 17.869px;
  flex-shrink: 0;
  border-radius: 6px 6px 0px 0px;
  background: var(--red, #ff4e36);
  background-color: ${(props) =>
    props.active
      ? props.buy
        ? "#FF4E36"
        : "#0C67EF"
      : "var(--primary-primary-300, #D1EFED)"};
  color: ${(props) => (props.active ? "white" : "black")};
  padding: 10px 0px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  border: none;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  align-self: stretch;
`;

const Price = styled.p`
  color: var(--black-black-700, #5b6b86);
  text-align: right;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const Contents = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  flex: 1 0 0;
`;

const OrderLabel = styled.p`
  color: var(--black-black-900, #15181e);
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.176px;
`;

const InputStyle = styled.input`
  width: 264px;
  display: flex;
  padding: 8px 12px;
  height: 40px;
  align-items: center;
  flex: 1 0 0;
  border-radius: 4px;
  border: 0.5px solid var(--black-black-700, #5b6b86);
  background: var(--Schemes-On-Primary, #fff);

  ::placeholder {
    color: #ccc; /* placeholder 텍스트 색상 설정 */
    opacity: 1; /* 일부 브라우저에서 필요 */
  }
`;

const InputStyle1 = styled.input`
  width: 264px;
  display: flex;
  padding: 8px 12px;
  height: 40px;
  align-items: center;
  flex: 1 0 0;
  border-radius: 4px;
  border: 0.5px solid var(--black-black-700, #5b6b86);
  background: var(--black-black-200, #f1f3f6);
`;

const InputWrapper = styled.div`
  display: flex;
  height: 251px;
  padding: 25px;
  align-items: center;
  gap: 35px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--black-black-100, #fff);
`;

const BuySellButton = styled.button`
  display: flex;
  width: 104px;
  height: 148px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 4px;
  background: ${(props) =>
    props.active
      ? props.buy
        ? "#FF4E36"
        : "#0C67EF"
      : "var(--primary-primary-300, #D1EFED)"};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  justify-content: center;
  color: var(--Schemes-On-Primary, #fff);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  letter-spacing: 1px;
`;

function OrderForm() {
  const price = 338000; // 주문 가격
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("buy"); // "buy" 또는 "sell"
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // 숫자인 경우에만 상태 업데이트
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
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
    setIsModalOpen(true); // 모달을 띄우는 상태 변경
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달을 닫는 상태 변경
  };

  const totalAmount = price * (quantity ? Number(quantity) : 0);

  return (
    <Wrapper>
      <ButtonWrapper>
        <OrderButton active={orderType === "buy"} buy onClick={handleBuy}>
          매수
        </OrderButton>
        <OrderButton active={orderType === "sell"} onClick={handleSell}>
          매도
        </OrderButton>
      </ButtonWrapper>

      <InputWrapper>
        <Contents>
          <InfoWrapper>
            <OrderLabel>주문 가격</OrderLabel>
            <Price> {price}</Price>
          </InfoWrapper>

          <InfoWrapper>
            <OrderLabel>주문수량</OrderLabel>
            <InputStyle
              type="text"
              value={quantity}
              placeholder="매수수량을 입력하세요."
              onChange={handleQuantityChange}
            />
          </InfoWrapper>

          <InfoWrapper>
            <OrderLabel>주문총액</OrderLabel>
            <InputStyle1 type="text" value={totalAmount} readOnly />
          </InfoWrapper>
        </Contents>

        {orderType && (
          <div>
            {orderType === "buy" ? (
              <BuySellButton
                active={orderType === "buy"}
                buy
                onClick={handleOrder}
              >
                구매
              </BuySellButton>
            ) : (
              <BuySellButton
                active={orderType === "sell"}
                onClick={handleOrder}
              >
                판매
              </BuySellButton>
            )}
          </div>
        )}
      </InputWrapper>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderType={orderType}
      />
    </Wrapper>
  );
}

export default OrderForm;
