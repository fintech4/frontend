import React, { useState } from "react";
import CandleChart from "../chart/CandleChart";
import styled from "styled-components";
import CustomCalendar from "./Calendar";
import moment from "moment";

const ChartTitle = styled.h1`
  color: #1e1e1e;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
  margin: 0px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 29px;
`;

const Wrapper = styled.div`
  margin: 0;
  padding-left: 29px;
  padding-right: 29px;
  height: 530px;
  flex-direction: column;
  border-radius: 8px;
  background: var(--Schemes-On-Primary, #fff);
`;

const ChartWrapper = styled.div`
  margin: 0;
  padding: 0;
`;

function ChartComponent() {
  // Set default date range: 3 months ago to today
  const [dateRange, setDateRange] = useState([
    moment().subtract(3, 'months').startOf('day').toDate(),
    moment().endOf('day').toDate(),
  ]);

  const handleDateChange = (range) => {
    if (Array.isArray(range) && range.length === 2) {
      setDateRange(range);
      console.log('Selected date range:', range);
    }
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <ChartTitle>차트</ChartTitle>
        <CustomCalendar onChange={handleDateChange} value={dateRange} />
      </TitleWrapper>
      <ChartWrapper>
        <CandleChart dateRange={dateRange} />
      </ChartWrapper>
    </Wrapper>
  );
}

export default ChartComponent;
