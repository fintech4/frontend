import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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
`;

const Table = () => {
  const [data, setData] = useState({
    totalAssets: 150000000,
    deposit: 50000000,
    totalStocks: 7000000,
    profitRate: 12.56,
    stockCount: 3,
  });

  useEffect(() => {
    // 백엔드 API 호출하여 데이터 받아오기
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/userAssets");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableWrapper>
      <table>
        <tbody>
          <tr>
            <td className="align-left">총 자산</td>
            <td className="align-right">{data.totalAssets.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="align-left">예수금</td>
            <td className="align-right">{data.deposit.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="align-left">보유주식 총액</td>
            <td className="align-right">{data.totalStocks.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="align-left">총 수익률</td>
            <td className="align-right">{data.profitRate}%</td>
          </tr>
          <tr>
            <td className="align-left">보유 종목 수</td>
            <td className="align-right">{data.stockCount}</td>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default Table;
