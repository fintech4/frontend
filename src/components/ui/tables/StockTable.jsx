import React from "react";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import "../../../assets/css/styles.css";
import { useEffect, useState } from "react";
import { media } from "../../../media";
const TableWrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
  }
  th,
  td {
    width: 295px;
    height: 64px;
    padding: 18px 20px;
    border-right: 1px solid var(--black-black-300, #e0e4ea);
    border-bottom: 1px solid var(--black-black-300, #e0e4ea);
  }
  th {
    background: var(--primary-primary-100, #f3fbfa);
    color: var(--black-900, #1c1b1f);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
  }
  td {
    background-color: #fff;
    color: var(--black-black-700, #5b6b86);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
  th:last-child,
  td:last-child {
    border-right: none;
  }
  tr:last-child td {
    border-bottom: none;
  }
  .align-left {
    text-align: left;
  }
  .align-right {
    text-align: right;
  }

  ${media.mobile`
    table {
    border-collapse: collapse;
    border-radius: 8px;
    width : 100%;
  }
    th {
    padding: 14px 20px;
    font-size: 14px;
    line-height: 20px;
  `}
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
  gap: 5px;
  align-items: center;
  cursor: pointer;

  &:hover span,
  &:hover .info-icon {
    color: #058077;
  }

  span,
  .info-icon {
    color: #000; /* 기본 색상 (예: 검정색) */
    transition: color 0.3s ease; /* 색상이 부드럽게 변경되도록 전환 효과 추가 */
  }
`;

const StockTable = ({ myStockList }) => {
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    if (myStockList) {
      setStockList(myStockList);
    }
  }, [myStockList]);
  console.log(JSON.stringify(myStockList, null, 2)); // 객체를 JSON 형태로 출력

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>주식명</th>
            <th>
              <TextWrapper data-tooltip-id="averagePrice">
                <span>평균매수가</span>
                <FaInfoCircle className="info-icon" color="#058077" />
              </TextWrapper>
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
              <TextWrapper data-tooltip-id="currentPrice">
                <span>현재가격</span>
                <FaInfoCircle className="info-icon" color="#058077" />
              </TextWrapper>

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
              <TextWrapper data-tooltip-id="valuationAmount">
                <span>평가금액</span>
                <FaInfoCircle className="info-icon" color="#058077" />
              </TextWrapper>
              <ReactTooltip
                id="valuationAmount"
                place="bottom"
                effect="solid"
                style={tooltipStyles}
              >
                자산의 현재 시장 가치를 나타내는 금액입니다.
                <br /> 주식의 현재 가격을 기준으로 평가합니다.
              </ReactTooltip>
              <br />
              수익률
            </th>
          </tr>
        </thead>
        <tbody>
          {stockList?.length > 0 ? (
            stockList.map((stock, index) => (
              <tr key={index} className="align-left">
                <td className="align-left">{stock.stock_name || "N/A"}</td>
                <td className="align-left">
                  {stock.average_price
                    ? stock.average_price.toLocaleString()
                    : "N/A"}
                  <br />
                  {stock.current_price
                    ? stock.current_price.toLocaleString()
                    : "N/A"}
                </td>
                <td className="align-left">
                  {stock.quantity !== undefined ? stock.quantity : "N/A"}
                </td>
                <td className="align-left">
                  {stock.evaluation_amount
                    ? stock.evaluation_amount.toLocaleString()
                    : "N/A"}
                  <br />
                  {stock.yield !== undefined ? `${stock.yield}%` : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="align-center">
                보유 중인 주식이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default StockTable;
