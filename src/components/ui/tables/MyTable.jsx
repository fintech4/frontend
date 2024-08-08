import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
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
  td {
    width: 295px; /* 셀의 너비 */
    height: 45px; /* 셀의 높이 */
    padding: 18px 29px; /* 셀의 여백 */
    background: var(--primary-primary-100, #f3fbfa);
    background-color: #fff; /* 기본 배경색 */
    opacity: 1; /* 투명도 설정 */
    color: var(--black-900, #1c1b1f); /* 글꼴 색상 */
    font-family: "Pretendard Variable"; /* 글꼴 */
    font-size: 16px; /* 글꼴 크기 */
    font-style: normal; /* 글꼴 스타일 */
    font-weight: 700; /* 글꼴 굵기 */
    line-height: 24px; /* 줄 간격 */
  }
  /* 모든 행의 첫 번째 열에 초록색 배경색 적용 */
  td:first-child {
    background-color: #f3fbfa; /* 연한 초록색 */
    text-align: left; /* 텍스트 왼쪽 정렬 */
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

const Table = ({ myAsset }) => {
  return (
    <TableWrapper>
      <table>
        <tbody>
          <tr>
            <td className="align-left">
              총 자산
              <FaInfoCircle
                className="info-icon"
                data-tooltip-id="totalAssetsTip"
                color="#058077"
              />
              <ReactTooltip
                id="totalAssetsTip"
                place="bottom"
                effect="solid"
                style={tooltipStyles}
              >
                보유주식의 총액 + 예수금으로, 현재까지의 총 자산 보유액입니다.
              </ReactTooltip>
            </td>
            <td className="align-right">{myAsset.total.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="align-left">
              예수금
              <FaInfoCircle
                className="info-icon"
                data-tooltip-id="depositTip"
                color="#058077"
              />
              <ReactTooltip
                id="depositTip"
                place="bottom"
                effect="solid"
                style={tooltipStyles}
              >
                증권 계좌에 있는 현금으로, 내가 주식 매입을 위해 사용할 수 있는
                <br />
                금액입니다. 나의 통장 잔고와 같은 존재이죠.
              </ReactTooltip>
            </td>
            <td className="align-right">{myAsset.deposit.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="align-left">
              보유주식 총액
              <FaInfoCircle
                className="info-icon"
                data-tooltip-id="totalStocksTip"
                color="#058077"
              />
              <ReactTooltip
                id="totalStocksTip"
                place="bottom"
                effect="solid"
                style={tooltipStyles}
              >
                평가금액의 합으로 지금까지 주식투자로만 벌어들인 수익입니다.
              </ReactTooltip>
            </td>
            <td className="align-right">
              {myAsset.stockTotal.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="align-left">총 수익률</td>
            <td className="align-right">{myAsset.yield}%</td>
          </tr>
          <tr>
            <td className="align-left">보유 종목 수</td>
            <td className="align-right">{myAsset.stockCount}</td>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default Table;
