import React, { useContext } from "react";
import styled from "styled-components";
import { media } from "../../media";
import { StocksContext } from "../../context/stocksContext";
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const WalletContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  background: var(--Schemes-On-Primary, #fff);
  height: 310px;
  position: relative;
  ${media.mobile`
    width: 100%;
    height: 140px;
  `};
`;

const WalletImage = styled.img`
  width: 140px;
  height: 140px;
  margin-bottom: 29px;
  ${media.mobile`
    display: flex;
    width: 50px;
    height: 52.326px;
    padding-bottom: 0.326px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `};
`;

const WalletName = styled.h2`
  font-size: 20px;
  margin: 0 0 29px 0;
  ${media.mobile`
    font-size: 16px;
  `};
`;

const WalletBalance = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  position: absolute;
  bottom: 25px;
  right: 25px;
  margin: 0;
  ${media.mobile`
    font-size: 20px;
  `};
`;

const InfoIcon = styled(FaInfoCircle)`
  color: #000; /* 기본 색상 */
  transition: color 0.3s ease;
  &:hover {
    color: #058077;
    cursor: pointer;
  }
`;

const tooltipStyles = {
  boxShadow: "0px 4px 10px 1px rgba(113, 205, 199, 0.3)",
  borderRadius: "8px",
  padding: "10px",
  backgroundColor: "#fff",
  color: "#15181E",
  fontFamily: "Pretendard Variable",
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "24px",
  zIndex: "1000",
};

const CashText = styled.span`
  color: var(--black-black-900, #f00);
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

function Wallet({ walletName, image }) {
  const { myAsset } = useContext(StocksContext);

  // Log myAsset to check if it's being received correctly
  console.log("myAsset:", myAsset);

  // Ensure myAsset is not undefined
  const getBalance = (name) => {
    if (!myAsset) {
      return "로딩 중";
    }

    switch (name) {
      case "예수금":
        return (myAsset.deposit).toLocaleString();
      case "총 수익률":
        return `${(myAsset.yield)}%`;
      default:
        return "데이터가 없어요:(";
    }
  };

  const balance = getBalance(walletName);

  return (
    <WalletContainer>
      <WalletName
        data-tooltip-id={walletName === "예수금" ? "walletNameTip" : ""}
      >
        {walletName}{" "}
        {walletName === "예수금" && (
          <InfoIcon className="info-icon" color="#058077" />
        )}
      </WalletName>

      <WalletImage src={image} alt={walletName} />
      <WalletBalance>{balance}</WalletBalance>
      {walletName === "예수금" && (
        <Tooltip
          id="walletNameTip"
          place="bottom"
          effect="solid"
          style={tooltipStyles}
        >
          증권 계좌에 있는 <CashText>현금</CashText>으로, 내가 주식 매입을 위해
          <br /> 사용할 수 있는 금액입니다. 나의 통장 잔고와 같은
          <br /> 존재이죠.
        </Tooltip>
      )}
    </WalletContainer>
  );
}


export default Wallet;
