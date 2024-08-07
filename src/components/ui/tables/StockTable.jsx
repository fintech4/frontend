import React from "react";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css"; // react-tooltip의 기본 스타일을 가져옵니다.
import "../../../assets/css/styles.css";

const TableWrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden; /* border-radius가 적용된 영역 밖의 내용이 잘리도록 설정 */
  }
  th,
  td {
    width: 295px; /* 셀의 너비 */
    height: 64px; /* 셀의 높이 */
    padding: 18px 29px; /* 셀의 여백 */
    border-right: 1px solid var(--black-black-300, #e0e4ea);
    border-bottom: 1px solid var(--black-black-300, #e0e4ea);
  }
  th {
    background: var(--primary-primary-100, #f3fbfa);
    color: var(--black-900, #1c1b1f); /* 글꼴 색상 */
    font-family: "Pretendard Variable"; /* 글꼴 */
    font-size: 16px; /* 글꼴 크기 */
    font-style: normal; /* 글꼴 스타일 */
    font-weight: 700; /* 글꼴 굵기 */
    line-height: 24px; /* 줄 간격 */
    text-align: left;
  }
  td {
    background-color: #fff; /* 기본 배경색 */
    color: var(--black-black-700, #5b6b86); /* 글꼴 색상 */
    font-family: "Pretendard Variable"; /* 글꼴 */
    font-size: 16px; /* 글꼴 크기 */
    font-style: normal; /* 글꼴 스타일 */
    font-weight: 500; /* 글꼴 굵기 */
    line-height: 24px; /* 줄 간격 */
  }
  /* Remove the right border from the last column */
  th:last-child,
  td:last-child {
    border-right: none;
  }
  /* Remove the bottom border from the last row */
  tr:last-child td {
    border-bottom: none;
  }
  .align-left {
    text-align: left;
  }
  .align-right {
    text-align: right;
  }
`;

const tooltipStyles = {
  boxShadow: "0px 4px 10px 1px rgba(113, 205, 199, 0.3)",
  borderRadius: "8px",
  padding: "10px",
  backgroundColor: "#fff",
  color: "#15181E", // 수정된 색상
  fontFamily: "Pretendard Variable",
  fontSize: "16px", // 수정된 폰트 크기
  fontWeight: "500",
  lineHeight: "24px", // 수정된 줄 간격
  zIndex: "1000",
};

const data = [
  {
    name: "삼성전자",
    avgPrice: "5,000",
    currentPrice: "5,760",
    quantity: 10,
    totalPrice: "50,000",
    profitRate: "8.07%",
  },
  {
    name: "LG전자",
    avgPrice: "85,000",
    currentPrice: "90,000",
    quantity: 5,
    totalPrice: "425,000",
    profitRate: "5.88%",
  },
  {
    name: "카카오",
    avgPrice: "120,000",
    currentPrice: "110,000",
    quantity: 2,
    totalPrice: "220,000",
    profitRate: "-8.33%",
  },
];

const StockTable = () => {
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>주식명</th>
            <th>
              평균매수가{" "}
              <FaInfoCircle
                className="info-icon"
                data-tooltip-id="averagePrice"
                color="#058077"
                style={{ cursor: "pointer" }}
              />
              <ReactTooltip
                id="averagePrice"
                place="bottom"
                effect="solid"
                style={tooltipStyles}
              >
                평균매수가 = 평균단가 | 내가 지금까지 주식을
                <br /> 매입할 때의 평균 가격입니다. 여러 번에 걸쳐
                <br /> 주식을 매입했을 때 유용합니다.
              </ReactTooltip>
              <br />
              현재가격{" "}
              <FaInfoCircle
                className="info-icon"
                data-tooltip-id="currentPrice"
                color="#058077"
                style={{ cursor: "pointer" }}
              />
              <ReactTooltip
                id="currentPrice"
                place="bottom"
                effect="solid"
                style={tooltipStyles}
              >
                자산의 현재 시장 가치를 나타내는 금액입니다.
                <br /> 주식의 현재 가격을 기준으로 평가합니다.
              </ReactTooltip>
            </th>
            <th>보유주식수</th>
            <th>
              평가금액{" "}
              <FaInfoCircle
                className="info-icon"
                data-tooltip-id="valuationAmount"
                color="#058077"
                style={{ cursor: "pointer" }}
              />
              <ReactTooltip
                id="valuationAmount"
                place="bottom"
                effect="solid"
                style={tooltipStyles}
              >
                증권 계좌에 있는 현금으로, 내가 주식 매입을 위해 사용할 수 있는
                <br />
                금액입니다. 나의 통장 잔고와 같은 존재이죠.
              </ReactTooltip>
              <br />
              수익률
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="align-left">
              <td className="align-left">{row.name}</td>
              <td className="align-left">
                {row.avgPrice}
                <br />
                {row.currentPrice}
              </td>
              <td className="align-left">{row.quantity}</td>
              <td className="align-left">
                {row.totalPrice}
                <br />
                {row.profitRate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default StockTable;
