import React from "react";
import styled from "styled-components";

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
              평균매수가 <span>ⓘ</span>
              <br />
              현재가격 <span>ⓘ</span>
            </th>
            <th>보유주식수</th>
            <th>
              평가금액 <span>ⓘ</span>
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
