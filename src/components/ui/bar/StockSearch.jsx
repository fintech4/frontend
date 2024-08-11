import React, { useState } from "react";
import styled from "styled-components";
import SearchContainer from "../SearchContainer";
import axios from "axios";
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
`;

const StockText = styled.div`
  display: flex;
  width: 100%;
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

const Price = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #ed3738;
  margin: 0;
`;

const PriceChange = styled.p`
  font-size: 15px;
  color: ${({ positive }) => (positive ? "#ED3738" : "#f44336")};
  margin: 0;
  margin-right: 5px;
  font-weight: bold;
`;

const PriceRatio = styled.p`
  font-size: 15px;
  color: ${({ positive }) => (positive ? "#ED3738" : "#f44336")};
  margin: 0;
  font-weight: bold;
`;

function StockSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const priceChange = selectedStock ? selectedStock.priceChange : 14500;
  const priceRatio = selectedStock ? selectedStock.priceRatio : 4.54;

  const fetchStockList = async (query) => {
    console.log(query);

    try {
      // axios를 사용하여 데이터 요청
      const response = await axios.get("/toou/api/stocks", {
        params: { name: query }, // 쿼리 파라미터로 name 전달
      });
      console.log(response.data); // 응답 데이터 전체 구조를 확인
      const stockSearchList = response.data.stockSearchList;

      // stockSearchList가 배열로 존재하는지 확인
      if (Array.isArray(stockSearchList)) {
        setStockList(stockSearchList); // stockSearchList 배열 전체를 상태로 설정
        setSelectedStock(stockSearchList.stockName); // 선택된 주식 초기화
      } else {
        console.error("Stock search list is not an array");
        setStockList([]); // 비어 있는 배열로 설정하여 오류 방지
      }
    } catch (e) {
      console.error(e); // 콘솔에 오류 로그
      setStockList([]); // 오류 발생 시 비어 있는 배열로 설정
    }
  };

  const fetchStockDetails = async (selectedStock) => {
    console.log(selectedStock);

    try {
      // 여기에 실제 API 요청 코드를 추가하세요.
      // const response = await axios.get(`/api/stock-details?name=${stockName}`);
      // setSelectedStock(response.data); // assuming the response has stock details

      // 로컬 환경을 위해 가짜 데이터 사용
      setSelectedStock({
        name: selectedStock.stockName,
        priceChange: 2000,
        priceRatio: 2.5,
        price: 120000,
      });
    } catch (error) {
      console.error("Error fetching stock details:", error);
      // 로컬 환경을 위해 가짜 데이터 사용
      setSelectedStock({
        name: selectedStock.stockName,
        priceChange: 2000,
        priceRatio: 2.5,
        price: 120000,
      });
    }
  };

  const isCompleteCharacters = (value) => {
    const regex = /^[가-힣a-zA-Z\s]+$/;
    return regex.test(value) || value === "";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (isCompleteCharacters(value)) {
      setErrorMessage("");
      if (value !== "") {
        fetchStockList(value);
      } else {
        setStockList([]);
      }
    } else {
      setErrorMessage("완전한 한글만 입력해주세요.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm) {
      fetchStockDetails(searchTerm);
    }
  };

  const handleStockClick = (selectedStock) => {
    fetchStockDetails(selectedStock);
  };

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

  return (
    <Wrapper>
      <StockContainer>
        <StockNameContainer>
          <StockName>
            {selectedStock ? selectedStock.name : "삼성전자"}
          </StockName>
          <StockText>
            <TextWrapper data-tooltip-id="kospiTip">
              <Kospi>코스피</Kospi>
              <FaInfoCircle className="info-icon" color="#058077" />
            </TextWrapper>
            <ReactTooltip
              id="kospiTip"
              place="bottom"
              effect="solid"
              style={tooltipStyles}
            >
              코스피는 한국의 주식 시장에서 거래되는 모든 상장 기업의 주가를
              <br /> 종합적으로 나타내는 지수입니다(: 주로 삼성전자나 현대자동차
              같은
              <br /> <TextHighlight>대기업</TextHighlight>의 주식들이 모여있는
              곳이죠.
            </ReactTooltip>
            <DateText>{currentDate}</DateText>
          </StockText>
        </StockNameContainer>
        <PriceContainer>
          <Price>
            {selectedStock ? `${selectedStock.price}\nKRW` : "123,000 KRW"}
          </Price>
          {priceChange > 0 ? (
            <PriceNumContainer>
              <PriceChange positive>▲{priceChange}</PriceChange>
              <PriceRatio positive>+{priceRatio}%</PriceRatio>
            </PriceNumContainer>
          ) : (
            <PriceNumContainer>
              <PriceChange>▼{priceChange}</PriceChange>
              <PriceRatio>-{priceRatio}%</PriceRatio>
            </PriceNumContainer>
          )}
        </PriceContainer>
      </StockContainer>
      <SearchContainerWrapper>
        <SearchContainer
          searchTerm={searchTerm}
          onSearchTermChange={handleChange}
          onKeyPress={handleKeyPress}
          errorMessage={errorMessage}
          stockList={stockList}
          onStockClick={handleStockClick}
        />
      </SearchContainerWrapper>
    </Wrapper>
  );
}

export default StockSearch;
