import React from "react";
import Navigation from "../ui/bar/Navigation";
import Table from "../ui/tables/MyTable";
import styled from "styled-components";
import StockTable from "../ui/tables/StockTable";
import axios from "axios";
import { useEffect, useState } from "react";

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

const defaultMyAsset = {
  total: 150000000,
  deposit: 50000000,
  stockTotal: 7000000,
  yield: 12.56,
  stockCount: 3,
};

const defaultMyStockList = [
  {
    stock_id: "1",
    stock_name: "삼성전자",
    average_price: 5000,
    current_price: 5760,
    quantity: 10,
    evaluation_amount: 50000,
    yield: 8.07,
  },
  {
    stock_id: "2",
    stock_name: "현대차",
    average_price: 6000,
    current_price: 6600,
    quantity: 15,
    evaluation_amount: 90000,
    yield: 10.0,
  },
];

const MyPage = () => {
  const [myAsset, setMyAsset] = useState(defaultMyAsset);
  const [myStockList, setMyStockList] = useState(defaultMyStockList);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAsset = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/accounts/assets`
        );
        if (response.data) {
          setMyAsset(response.data);
          setMyStockList(response.data.stocks);
        } else {
          setMyAsset(defaultMyAsset);
          setMyStockList(defaultMyStockList);
        }
      } catch (error) {
        console.error("Error fetching my asset data:", error);
        setMyAsset(defaultMyAsset);
        setMyStockList(defaultMyStockList);
      } finally {
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로
      }
    };

    fetchMyAsset();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  }

  return (
    <div>
      <Navigation path={"/mypage"} isLoggedIn={true} />
      <List>
        <ListWrapper>
          <TitleWrapper>
            <Title>내 자산</Title>
          </TitleWrapper>
          <Table myAsset={myAsset} />
        </ListWrapper>
        <ListWrapper>
          <TitleWrapper>
            <Title>보유주식목록</Title>
          </TitleWrapper>

          <StockTable myStockList={myStockList} />
        </ListWrapper>
      </List>
    </div>
  );
};

export default MyPage;
