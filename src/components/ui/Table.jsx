import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  padding: 20px;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td {
    width: 295px; /* 셀의 너비 */
    height: 67px; /* 셀의 높이 */
    padding: 18px 29px; /* 셀의 여백 */
    border-width: 0px 1px 1px 0px; /* 상, 우, 하, 좌 경계 두께 설정 */
    border-style: solid;
    border-color: rgba(243, 251, 250, 1); /* 경계 색상 */
    background-color: #fff; /* 기본 배경색 */
    opacity: 1; /* 투명도 설정 */
    text-align: center;
  }
  /* 모든 행의 첫 번째 열에 초록색 배경색 적용 */
  td:first-child {
    background-color: #F3FBFA; /* 연한 초록색 */
  }
`;

const Table = () => {
    return (
        <TableWrapper>
            <table>
                <tbody>
                    <tr>
                        <td>총 자산</td>
                        <td>150,000,000</td>
                    </tr>
                    <tr>
                        <td>예수금</td>
                        <td>50,000,000</td>
                    </tr>
                    <tr>
                        <td>보유주식 총액</td>
                        <td>7,000,000</td>
                    </tr>
                    <tr>
                        <td>총 수익률</td>
                        <td>12.56%</td>
                    </tr>
                    <tr>
                        <td>보유 종목 수</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
        </TableWrapper>
    );
};

export default Table;
