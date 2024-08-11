import React from "react";
import Navigation from "../ui/bar/Navigation";
import Table from "../ui/tables/MyTable";
import styled from "styled-components";
import StockTable from "../ui/tables/StockTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { media } from "../../media";

const List = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
  align-self: stretch;
  margin-top: 20px;

  ${media.mobile`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
  `}
`;

const ListWrapper = styled.div`
  display: flex;
  width: 590px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  ${media.mobile`
    width: 100%;
    align-items: center;
    `}
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

  ${media.mobile`
    height : 20px;
  `}
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
  total: 0,
  deposit: 0,
  stockTotal: 0,
  yield: 0,
  stockCount: 0,
};

const defaultMyStockList = [
  {
    stock_name: "",
    average_price: 0,
    current_price: 0,
    quantity: 0,
    evaluation_amount: 0,
    yield: 0,
  },
];

const MyPage = () => {
  const [myAsset, setMyAsset] = useState(defaultMyAsset);
  const [myStockList, setMyStockList] = useState(defaultMyStockList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 자산 정보 가져오기
        const assetResponse = await axios.get("/toou/api/accounts/assets");
        console.log(assetResponse.data);
        if (assetResponse.data) {
          setMyAsset({
            total: assetResponse.data.totalAsset || 0,
            deposit: assetResponse.data.deposit || 0,
            stockTotal: assetResponse.data.totalHoldingsValue || 0,
            yield: assetResponse.data.investmentYield || 0,
            stockCount: assetResponse.data.totalHoldingsQuantity || 0,
          });
        } else {
          console.log("불러오기 실패");
          setMyAsset(defaultMyAsset);
        }

        // 주식 목록 가져오기
        const holdingsResponse = await axios.get("/toou/api/accounts/holdings");
        if (holdingsResponse.data && holdingsResponse.data.holdings) {
          setMyStockList(
            holdingsResponse.data.holdings.map((stock) => ({
              stock_name: stock.stockName || "N/A",
              average_price: stock.averagePurchasePrice || 0,
              current_price: stock.currentPrice || 0,
              quantity: stock.quantity || 0,
              evaluation_amount: stock.valuation || 0,
              yield: stock.yield || 0,
            }))
          );
        } else {
          setMyStockList(defaultMyStockList);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMyAsset(defaultMyAsset);
        setMyStockList(defaultMyStockList);
      } finally {
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로
      }
    };

    fetchData();
  }, []);

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
