import React from "react";
import CandleChart from "../chart/CandleChart";
import styled from "styled-components";

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
  return (
    <Wrapper>
      <TitleWrapper>
        <ChartTitle>차트</ChartTitle>
        <ChartTitle>calandar</ChartTitle>
      </TitleWrapper>
      <ChartWrapper>
        <CandleChart />
      </ChartWrapper>
    </Wrapper>
  );
}

export default ChartComponent;
