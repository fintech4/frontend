import React from "react";
import Navigation from "../ui/bar/Navigation";
import Table from "../ui/MyTable";
import styled from "styled-components";
import StockTable from "../ui/StockTable";

const List = styled.div`
  display: flex;
  padding: 0px 360px;
  justify-content: center;
  gap: 20px;
  align-self: stretch;
  margin-top: 20px;
`;

const ListWrapper = styled.div`
  display: flex;
  width: 590px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  height: 70px;
  padding: 25px 29px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--Schemes-On-Primary, #fff);
`;

const Title = styled.h1`
  color: #2c2c2c;

  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const MyPage = () => {
  return (
    <div>
      <Navigation path={"/mypage"} isLoggedIn={false} />
      <List>
        <ListWrapper>
          <TitleWrapper>
            <Title>내 자산</Title>
          </TitleWrapper>
          <Table />
        </ListWrapper>
        <ListWrapper>
          <TitleWrapper>
            <Title>보유주식목록</Title>
          </TitleWrapper>

          <StockTable />
        </ListWrapper>
      </List>
    </div>
  );
};

export default MyPage;
