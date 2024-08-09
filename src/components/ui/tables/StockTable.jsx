import React from "react";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import "../../../assets/css/styles.css";

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
    padding: 18px 29px;
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

const StockTable = ({ myStockList = [] }) => {
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
          {myStockList.length > 0 ? (
            myStockList.map((stock, index) => (
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
