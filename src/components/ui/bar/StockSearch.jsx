import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import SearchContainer from "../SearchContainer";
import { StocksContext } from "../../../context/stocksContext";
import { media } from "../../../media";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

export const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const currentDate = getCurrentDateTime();

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  ${media.mobile`
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    margin: 20px 0;
    padding: 0;
    `}
`;

const StockContainer = styled.div`
  display: flex;
  max-width: 500px;
  background-color: #ffffff;
  padding: 10px;
  padding-bottom: 0px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 15px;
  gap: 20px;

  ${media.mobile`
    width : 100%;
     display: flex; 
     background: none;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 24px 18px 24px;
    margin : 0px ;
    `}
`;

const SearchContainerWrapper = styled.div`
  display: flex;
  width: 80%;
  max-width: 400px;
  margin-right: 15px;
  ${media.mobile`
    width : 100%;
    margin: 0px;
    `}
`;

const StockNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 0px;
`;

const StockName = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin: 0px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockText = styled.div`
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 5px;
`;

const Kospi = styled.p`
  font-size: 18px;
  margin: 0;
  margin-right: 5px;
  font-size: 15px;
  color: black;
  font-weight: bold;
`;

const DateText = styled.p`
  font-size: 18px;
  margin: 0;
  font-size: 15px;
  color: black;
  padding-top: 2px;
  font-weight: bold;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0px;
  justify-content: center;

  ${media.mobile`
      align-items: flex-end;
    `}
`;

const PriceNumContainer = styled.div`
  display: flex;
  width: 100%;
  ${media.mobile`
  display: flex; 
  flex-direction: row;
 justify-content: flex-end;
    `}
`;

const Price = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
`;

const PriceAmount = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: ${({ positive, zero }) =>
    zero ? "#000000" : positive ? "#FF4E36" : "#0C67EF"};
  margin: 0;
`;

const PriceLabel = styled.p`
  font-size: 12px;
  color: ${({ positive, zero }) =>
    zero ? "#000000" : positive ? "#FF4E36" : "#0C67EF"};
  margin: 0;
  font-weight: bold;
  margin-left: 5px;
  align-self: flex-start;
`;

const PriceChange = styled.p`
  font-size: 15px;
  color: ${({ positive, zero }) =>
    zero ? "#000000" : positive ? "#FF4E36" : "#0C67EF"};
  margin: 0;
  margin-right: 5px;
  font-weight: bold;
`;

const PriceRatio = styled.p`
  font-size: 15px;
  color: ${({ positive, zero }) =>
    zero ? "#000000" : positive ? "#FF4E36" : "#0C67EF"};
  margin: 0;
  font-weight: bold;
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

const TextWrapper = styled.div`
  display: inline-flex;
  gap: 0px;
  align-items: center;
  cursor: pointer;

  &:hover ${Kospi}, &:hover .info-icon {
    color: #058077;
  }

  ${Kospi},
  .info-icon {
    color: #000; /* 기본 색상 (예: 검정색) */
    transition: color 0.3s ease; /* 색상이 부드럽게 변경되도록 전환 효과 추가 */
  }
`;

const TextHighlight = styled.span`
  color: var(--black-black-900, #f00);
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
const getTooltipContent = (market) => {
  switch (market) {
    case "KOSPI":
      return (
        <>
          코스피는 한국의 주식 시장에서 거래되는 모든 상장 기업의 주가를
          <br /> 종합적으로 나타내는 지수입니다(: 주로 삼성전자나 현대자동차
          같은
          <br /> <TextHighlight>대기업</TextHighlight>의 주식들이 모여있는
          곳이죠.
        </>
      );
    case "KOSDAQ":
      return (
        <>
          한국의 중소기업과 벤처기업이 주로 상장된 주식 시장이에요.
          <br /> 코스피에 들어가는 기업보다 상대적으로 작은 기업들이 많이
          포함되어 있습니다.
          <br /> 일반적으로 코스피보다 변동성이 클 수 있어요.
        </>
      );
    case "KONEX":
      return (
        <>
          코넥스는 'Korea New Exchange'의 약자로, 스타트업이나 초기 단계의
          <br />
          중소기업이 상장할 수 있는 주식 시장이에요. 쉽게 말해, 미래의 유망
          <br />
          기업들이 모인 '신생 기업 시장'이라고 할 수 있습니다.
        </>
      );
    default:
      return "알 수 없는 시장입니다.";
  }
};
function StockSearch() {
  const [selectedMarket, setSelectedMarket] = useState("코스피"); // 선택된 시장 정보를 관리하는 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stockList, setStockList] = useState([]);
  const {
    stocks,
    selectedStockCode,
    stockHistory,
    fetchStocks,
    fetchStocksHistory,
  } = useContext(StocksContext);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedStockCode) {
      // Fetch stock history based on the selected stock code
      const today = getTodayDate();
      fetchStocksHistory(selectedStockCode, "2023-07-01", today);
    }
  }, [selectedStockCode, fetchStocksHistory]);

  const isCompleteCharacters = (value) => {
    const regex = /^[가-힣a-zA-Z\s]+$/;
    return regex.test(value) || value === "";
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (isCompleteCharacters(value)) {
      if (value !== "") {
        try {
          await fetchStocks(value);
          setStockList(stocks); // 입력된 검색어로 주식 리스트 업데이트
        } catch (error) {
          console.error("Error fetching stocks:", error);
        }
      }
    } else {
      setErrorMessage("완전한 한글만 입력해주세요.");
    }
  };

  const priceChange =
    stockHistory && stockHistory.dailyHistories.length > 0
      ? stockHistory.stockNewestPrice -
        (stockHistory.dailyHistories[stockHistory.dailyHistories.length - 2]
          ?.prices[3] || stockHistory.stockNewestPrice)
      : 0;

  const isPositive = priceChange > 0;
  const isZero = priceChange === 0;

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");
    return `${year}.${month}.${day}`;
  };

  return (
    <Wrapper>
      <StockContainer>
        <StockNameContainer>
          <StockName>{stockHistory ? stockHistory.stockName : ""}</StockName>
          <StockText>
            <TextWrapper data-tooltip-id="kospiTip">
              <Kospi>{stockHistory ? stockHistory.market : ""}</Kospi>
              <FaInfoCircle className="info-icon" color="#058077" />
            </TextWrapper>
            <ReactTooltip
              id="kospiTip"
              place="bottom"
              effect="solid"
              style={tooltipStyles}
            >
              {stockHistory ? getTooltipContent(stockHistory.market) : ""}
            </ReactTooltip>
            <DateText>
              {stockHistory ? formatDate(stockHistory.newestDate) : ""}
            </DateText>
          </StockText>
        </StockNameContainer>
        <PriceContainer>
          <Price>
            <PriceAmount positive={isPositive} zero={isZero}>
              {stockHistory ? formatNumber(stockHistory.stockNewestPrice) : ""}
            </PriceAmount>
            <PriceLabel positive={isPositive} zero={isZero}>
              {stockHistory ? "KRW" : ""}
            </PriceLabel>
          </Price>
          {stockHistory && stockHistory.dailyHistories.length > 0 ? (
            <PriceNumContainer>
              <PriceChange positive={isPositive} zero={isZero}>
                {isZero
                  ? ``
                  : isPositive
                  ? `▲${formatNumber(priceChange)}`
                  : `▼${formatNumber(-priceChange)}`}
              </PriceChange>
              <PriceRatio positive={isPositive} zero={isZero}>
                {isZero
                  ? `0%`
                  : isPositive
                  ? `+${(
                      (priceChange /
                        (stockHistory.dailyHistories[0]?.prices[0] ||
                          stockHistory.stockNewestPrice)) *
                      100
                    ).toFixed(2)}%`
                  : `${(
                      (priceChange /
                        (stockHistory.dailyHistories[0]?.prices[0] ||
                          stockHistory.stockNewestPrice)) *
                      100
                    ).toFixed(2)}%`}
              </PriceRatio>
            </PriceNumContainer>
          ) : null}
        </PriceContainer>
      </StockContainer>
      <SearchContainerWrapper>
        <SearchContainer
          searchTerm={searchTerm}
          onSearchTermChange={handleChange}
          stockList={stockList}
          //onStockClick={handleStockClick}
        />
      </SearchContainerWrapper>
    </Wrapper>
  );
}

export default StockSearch;
