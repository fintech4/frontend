import React from "react";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import "../../../assets/css/styles.css";
import { media } from "../../../media";
const TableWrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
  }
  td {
    width: 295px;
    height: 45px;
    padding: 18px 29px;
    background: var(--primary-primary-100, #f3fbfa);
    background-color: #fff;
    opacity: 1;
    color: var(--black-900, #1c1b1f);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
  td:first-child {
    background-color: #f3fbfa;
    text-align: left;
  }
  .align-left {
    text-align: left;
  }
  .align-right {
    text-align: right;
  }
  .info-icon {
    margin-left: 8px;
    color: #888;
    cursor: pointer;
  }

  ${media.mobile`
    table {
    border-collapse: collapse;
    border-radius: 8px;
    width : 100%;
  }
    td {
    padding: 14px 20px;
    font-size: 14px;
    line-height: 20px;
  `}
`;
const TextWrapper = styled.div`
  display: inline-flex;
  gap: 0px;
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

const CashText = styled.span`
  color: var(--black-black-900, #f00);
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
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

const Table = ({ myAsset }) => {
  console.log(myAsset);
  return (
    <TableWrapper>
      <table>
        <tbody>
          <tr>
            <td className="align-left">
              <TextWrapper data-tooltip-id="totalAssetsTip">
                <span>총 자산</span>
                <FaInfoCircle className="info-icon" color="#058077" />
              </TextWrapper>
              <ReactTooltip
                id="totalAssetsTip"
                place="bottom"
                style={tooltipStyles}
              >
                보유주식의 총액 + 예수금으로,
                <br /> 현재까지의 총 자산 보유액입니다.
              </ReactTooltip>
            </td>
            <td className="align-right">
              {myAsset.total ? myAsset.total.toLocaleString() : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="align-left">
              <TextWrapper data-tooltip-id="depositTip">
                <span>예수금</span>
                <FaInfoCircle className="info-icon" color="#058077" />
              </TextWrapper>
              <ReactTooltip
                id="depositTip"
                place="bottom"
                style={tooltipStyles}
              >
                증권 계좌에 있는 <CashText>현금</CashText>으로, 내가 주식 매입을
                위해 사용할 수 있는
                <br />
                금액입니다. 나의 통장 잔고와 같은 존재이죠.
              </ReactTooltip>
            </td>
            <td className="align-right">
              {myAsset.deposit ? myAsset.deposit.toLocaleString() : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="align-left">
              <TextWrapper data-tooltip-id="totalStocksTip">
                <span>보유주식 총액</span>
                <FaInfoCircle className="info-icon" color="#058077" />
              </TextWrapper>
              <ReactTooltip
                id="totalStocksTip"
                place="bottom"
                style={tooltipStyles}
              >
                평가금액의 합으로 지금까지 <br /> 주식투자로만 벌어들인
                수익입니다.
              </ReactTooltip>
            </td>
            <td className="align-right">
              {myAsset.stockTotal ? myAsset.stockTotal.toLocaleString() : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="align-left">총 수익률</td>
            <td className="align-right">
              {myAsset.yield !== undefined ? `${myAsset.yield}%` : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="align-left">보유 종목 수</td>
            <td className="align-right">
              {myAsset.stockCount !== undefined ? myAsset.stockCount : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default Table;
