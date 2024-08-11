import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Modal from './modal/BuyModal'; // Import Modal Component
import ErrorModal from './modal/ErrorModal'; // Import ErrorModal Component
import { media } from '../../media';
import { StocksContext } from '../../context/stocksContext';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px;
  box-sizing: border-box;
  ${media.mobile`
    width: 100%;
    height: 200px;
    padding: 37px 35px;
    display: flex;
    align-items: center;
    margin-bottom: 180px;
  `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  height: 60px;
  padding-left: 35px;
  align-items: center;
  gap: 35px;
  flex-shrink: 0;
  ${media.mobile`
    justify-content: flex-start;
    width: 100%;
  `}
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
  background: ${(props) =>
    props.active
      ? props.buy
        ? '#FF4E36'
        : '#0C67EF'
      : 'var(--primary-primary-300, #D1EFED)'};
  color: ${(props) => (props.active ? 'white' : 'black')};
  padding: 10px 0px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  border: none;
  font-family: 'Pretendard Variable';
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
  font-family: 'Pretendard Variable';
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
  font-family: 'Pretendard Variable';
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
  font-family: 'Pretendard Variable'; /* Ensure font is consistent with other elements */
  font-size: 16px; /* Adjust text size as needed */
  font-weight: 400; /* Normal weight; adjust if necessary */
  line-height: 20px; /* Ensure line-height is appropriate for the text size */

  ::placeholder {
    color: #ccc; /* placeholder text color */
    opacity: 1; /* needed for some browsers */
  }

  ${media.mobile`
    width: 10px;
  `}
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
  font-family: 'Pretendard Variable'; /* Ensure font is consistent with other elements */
  font-size: 16px; /* Adjust text size as needed */
  font-weight: 400; /* Normal weight; adjust if necessary */
  line-height: 20px; /* Ensure line-height is appropriate for the text size */

  ${media.mobile`
    width: 10px;
  `}
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
  ${media.mobile`
    width: 100%;
    display: flex;
    height: 200px;
    align-items: center;
    gap: 35px;
  `}
`;

const BuySellButton = styled.button`
  display: flex;
  width: 104px;
  height: 208px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 4px;
  background: ${(props) =>
    props.active
      ? props.buy
        ? '#FF4E36'
        : '#0C67EF'
      : 'var(--primary-primary-300, #0C67EF)'};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  justify-content: center;
  color: var(--Schemes-On-Primary, #fff);
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  letter-spacing: 1px;

  ${media.mobile`
    width: 60px;
    height: 120px;
    font-size: 15px;
  `}
`;

// Format number with comma separation
const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

function OrderForm() {
  const { stocks, stockHistory, setMyAsset, fetchData } = useContext(StocksContext);
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('buy'); // "buy" or "sell"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Update state only if the value is a number
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleBuy = () => {
    setOrderType('buy');
  };

  const handleSell = () => {
    setOrderType('sell');
  };

  const handleOrder = async () => {
    const stockCode = stockHistory.stockCode;
    console.log('stockCode: ' + stockCode);
  
    const orderData = {
      orderQuantity: quantity,
      tradeType: orderType, // "buy" or "sell"
    };
  
    console.log('orderData: ' + JSON.stringify(orderData));
    try {
      const response = await fetch(`/toou/api/accounts/stocks/${stockCode}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
  
      // Check if quantity is empty
      if (quantity === '') {
        setErrorMessage('수량을 입력해주세요!');
        setIsErrorModalOpen(true); // Show error modal
        return; // Exit the function early
      }
  
      if (result.ok) {
        setIsModalOpen(true); // Show modal for success
      } else {
        // Error handling based on result.error.message
        if (result.error.type === 'wrong_buy_order') {
          setErrorMessage('살 수 있는 돈이 부족해요!😞');
        } else if (result.error.type === 'wrong_sell_quantity') {
          setErrorMessage('팔 수 있는 주식이 부족해요!😞');
        // } else if (result.error.type === 'wrong_sell_quantity') {
        //   setErrorMessage('잘못된 매도 주문입니다.');
        // } else if (result.error.type === 'quantity_lacking') {
        //   setErrorMessage('수량을 확인해주세요!');
        } else {
          setErrorMessage('주문을 처리할 수 없습니다.');
        }
        setIsErrorModalOpen(true); // Show error modal
      }
    } catch (error) {
      console.error('주문 요청 중 오류 발생:', error);
      setErrorMessage('주문 요청 중 오류가 발생했습니다.'); // Default error message
      setIsErrorModalOpen(true); // Show error modal
    }
    fetchData();
    setQuantity(''); // Clear quantity after processing
  };
  
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false); // Close error modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close success modal
  };

  const totalAmount = stockHistory.stockNewestPrice * (quantity ? Number(quantity) : 0);

  return (
    <Wrapper>
      <ButtonWrapper>
        <OrderButton active={orderType === 'buy'} buy onClick={handleBuy}>
          매수
        </OrderButton>
        <OrderButton active={orderType === 'sell'} onClick={handleSell}>
          매도
        </OrderButton>
      </ButtonWrapper>
      <InputWrapper>
        <Contents>
          <InfoWrapper>
            <OrderLabel>주문 가격</OrderLabel>
            <Price>{formatNumber(stockHistory.stockNewestPrice)}원</Price> {/* Price from context */}
          </InfoWrapper>

          <InfoWrapper>
            <OrderLabel>주문수량</OrderLabel>
            <InputStyle
              type="text"
              value={quantity}
              placeholder="주문수량을 입력하세요."
              onChange={handleQuantityChange}
            />
          </InfoWrapper>

          <InfoWrapper>
            <OrderLabel>주문총액</OrderLabel>
            <InputStyle1
              type="text"
              value={`${formatNumber(totalAmount)}원`}
              readOnly
            /> {/* Formatted total amount */}
          </InfoWrapper>
        </Contents>

        {orderType && (
          <div>
            <BuySellButton
              active={orderType === 'buy'}
              buy={orderType === 'buy'}
              onClick={handleOrder}
            >
              {orderType === 'buy' ? '살게요' : '팔게요'}
            </BuySellButton>
          </div>
        )}
      </InputWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderType={orderType}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </Wrapper>
  );
}

export default OrderForm;
