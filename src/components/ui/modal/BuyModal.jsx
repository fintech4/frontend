import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  width: 465px;
  padding: 40px 36px;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background: var(--Schemes-On-Primary, #fff);
  gap: 40px;
  /* menu-shadow */
  box-shadow: 0px 4px 10px 1px rgba(113, 205, 199, 0.3);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;
const ModalIcon = styled.img`
  width: 48px;
  height: 48px;
`;
const ModalText = styled.div`
  display: flex;
  width: 393px;
  justify-content: center;
  align-items: flex-end;
  align-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
`;

const ModalTitle = styled.h1`
  color: var(--primary-primary-800, #058077);
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ModalInfo = styled.p`
  flex-shrink: 0;
  color: var(--black-black-900, #15181e);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  margin: 0px;
`;
const ModalButton = styled.button`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: none;
  color: #f1f3f6;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  background: var(--primary-primary-800, #058077);
`;

const Modal = ({ isOpen, onClose, orderType }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalContainer>
          <ModalIcon src="images/illustration/check-one.png" alt=""></ModalIcon>
          <ModalText>
            <ModalTitle>
              {orderType === "buy"
                ? "매수가 완료되었습니다!🎉"
                : "매도가 완료되었습니다!🎉"}
            </ModalTitle>
            <ModalInfo>
              투자 내역과 자세한 정보는 MY에서 조회하실 수 있습니다.
            </ModalInfo>
          </ModalText>
        </ModalContainer>

        <ModalButton onClick={onClose}>확인</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
