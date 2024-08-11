import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Stocks from '../models/Stocks';
import StockHistory from '../models/StocksHistory';
// Default values
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

export const StocksContext = createContext();

export const StocksProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [stockHistory, setStockHistory] = useState({
    id: "",
    stockCode: "",
    stockName: "",
    stockNewestPrice: 0,
    newestDate: "",
    dailyHistories: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedStockName, setSelectedStockName] = useState("");
  const [selectedStockCode, setSelectedStockCode] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [range, setRange] = useState();

  const [myAsset, setMyAsset] = useState(defaultMyAsset);
  const [myStockList, setMyStockList] = useState(defaultMyStockList);

  // Update selected stock details
  const updateSelectedStock = (stock) => {
    setSelectedStockName(stock.stockName);
    setSelectedStockCode(stock.stockCode);
  };

  const updateDates = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Fetch stocks function
  const fetchStocks = useCallback(async (query) => {
    const url = "/toou/api/stocks"; // 요청할 URL

    try {
      setLoading(true); // 로딩 상태 시작
      const response = await axios.get(url, { params: { name: query } });
      const data = response.data;

      if (data && data.stockSearchList) {
        const stocksInstances = data.stockSearchList.map(
          (stock) => new Stocks(stock.stockCode, stock.stockName, stock.market)
        );
        setStocks(stocksInstances); // 주식 목록 상태를 업데이트합니다.
      } else {
        setError("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching stocks:", err);
      setError("An error occurred while fetching stocks");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStocksHistory = useCallback(async (stockId, dateFrom, dateTo) => {
    const url = `/toou/api/stocks/${stockId}/history`;

    try {
      const response = await axios.get(url, {
        params: {
          dateFrom: dateFrom,
          dateTo: dateTo,
        },
      });
      const data = response.data;

      if (data && data.ok) {
        const stockHistory = {
          id: data.id,
          market: data.market,
          stockCode: data.stockCode,
          stockName: data.stockName,
          stockNewestPrice: data.stockNewestPrice,
          newestDate: data.newestDate,
          dailyHistories: data.dailyHistories,
        };
        setStockHistory(stockHistory);
      } else {
        console.warn("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching stock history:", err);
    }
  }, []);

  // Fetch data function
  const fetchData = useCallback(async () => {
    try {
      // Fetch asset information
      const assetResponse = await axios.get("/toou/api/accounts/assets");
      if (assetResponse.data) {
        setMyAsset({
          total: assetResponse.data.totalAsset || 0,
          deposit: assetResponse.data.deposit || 0,
          stockTotal: assetResponse.data.totalHoldingsValue || 0,
          yield: assetResponse.data.investmentYield || 0,
          stockCount: assetResponse.data.totalHoldingsQuantity || 0,
        });
        console.log("확인:" + assetResponse.data.deposit);
      } else {
        setMyAsset(defaultMyAsset);
      }

      // Fetch stock holdings
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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        // 데이터를 비동기적으로 가져오는 함수 호출
        await fetchData(); 
      } catch (error) {
        // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력하고
        // 기본값으로 상태를 설정
        console.error("Error fetching data:", error);
        setMyAsset(defaultMyAsset);
        setMyStockList(defaultMyStockList);
      } finally {
        // 데이터 가져오기 작업이 완료되면 로딩 상태를 종료
        setLoading(false);
      }
    };

    // fetchDataWrapper 함수를 호출하여 데이터를 가져옴
    fetchDataWrapper();
  }, []);

  useEffect(() => {
    const fetchInitialStockData = async () => {
      try {
        await fetchStocksHistory("005930");
      } catch (error) {
        console.error("Error fetching initial stock data:", error);
      }
    };
      
    fetchInitialStockData();
  }, [fetchStocksHistory]);

  useEffect(() => {
    if (selectedStockCode) {
      // Fetch stock history based on the selected stock code
      fetchStocksHistory(selectedStockCode);
    }
  }, [selectedStockCode, fetchStocksHistory]);

  return (
    <StocksContext.Provider value={{ 
      stocks, 
      stockHistory, 
      fetchStocks, 
      fetchStocksHistory, 
      setSearchTerm, 
      setStartDate, 
      setEndDate, 
      setRange, 
      updateSelectedStock,
      setMyAsset,
      fetchData,
      myAsset,
      loading, 
      error 
    }}>

      {children}
    </StocksContext.Provider>
  );
};
