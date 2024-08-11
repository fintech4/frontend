import React, { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import Stocks from "../models/Stocks";
import StockHistory from "../models/StocksHistory";

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
    <StocksContext.Provider
      value={{
        stocks,
        stockHistory,
        fetchStocks,
        fetchStocksHistory,
        setSearchTerm,
        setStartDate,
        setEndDate,
        setRange,
        updateSelectedStock,
        loading,
        error,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
