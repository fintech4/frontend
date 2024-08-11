import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { StocksContext } from "../../../context/stocksContext";

// Convert the raw data to the format needed for the candlestick chart
const formatDataForChart = (data) => {
  return data.map(item => {
    const date = new Date(item.date);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date encountered:', item.date);
      return null;
    }

    return {
      x: date.getTime(), // Convert date to timestamp
      y: item.prices // [open, high, low, close]
    };
  }).filter(item => item !== null); // Remove invalid entries
};

// Filter out only valid data
const filterValidDates = (data) => {
  return data.filter((item) =>
    item.prices.every((value) => value !== null && value !== undefined)
  );
};

// Filter out weekends and invalid data
const filterWeekdays = (data) => {
  return data.filter((item) => {
    const day = new Date(item.date).getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    return day !== 0 && day !== 6; // Exclude weekends (Sunday and Saturday)
  });
};

// Filter data by date range
const filterDataByDateRange = (data, dateRange) => {
  const [startDate, endDate] = dateRange;
  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

// Get annotations for weekends and missing data days
const getAnnotations = (data) => {
  const annotations = [];

  if (!data || data.length === 0) return annotations;

  const startDate = new Date(Math.min(...data.map((item) => new Date(item.date).getTime())));
  const endDate = new Date(Math.max(...data.map((item) => new Date(item.date).getTime())));
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toDateString();
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hasData = data.some((d) => new Date(d.date).toDateString() === dateStr);

    if (!hasData && !isWeekend) {
      annotations.push({
        x: new Date(currentDate).getTime(),
        borderColor: "#FF4E36", // Vertical line color
      });
    }

    if (isWeekend) {
      annotations.push({
        x: new Date(currentDate).getTime(),
        borderColor: "#ced4da", // Vertical line color
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return annotations;
};

const CandleChart = ({ dateRange }) => {
  const { stockHistory, selectedStockCode, fetchStocksHistory } = useContext(StocksContext);
  const [formattedData, setFormattedData] = useState([]);
  const [chartAnnotations, setChartAnnotations] = useState([]);

  useEffect(() => {
    // Fetch stock history when selected stock code changes
    if (selectedStockCode) {
      fetchStocksHistory(selectedStockCode, "2023-07-01", new Date().toISOString().split('T')[0]); // Use current date
    }
  }, [selectedStockCode, fetchStocksHistory]);

  useEffect(() => {
    if (stockHistory) {
      const filtered = filterValidDates(filterWeekdays(filterDataByDateRange(stockHistory.dailyHistories, dateRange)));
      setFormattedData(formatDataForChart(filtered));
      setChartAnnotations(getAnnotations(filtered));
    }
  }, [stockHistory, dateRange]);

  const chartOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#FF4E36", // Color for upward candlestick
          downward: "#0C67EF", // Color for downward candlestick
        },
      },
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10,
      labels: {
        formatter: function (value) {
          const date = new Date(value);
          const month = date.getMonth() + 1; // 0-based
          const day = date.getDate();
          return `${month}월${day}일`;
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value) {
          // Format to integer
          return Math.floor(value).toLocaleString();
        },
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]; // Open
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]; // High
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]; // Low
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]; // Close

        return `
          <div style="padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;">
            <div style="margin-bottom: 5px;">시가: ${o}</div>
            <div style="margin-bottom: 5px;">고가: ${h}</div>
            <div style="margin-bottom: 5px;">저가: ${l}</div>
            <div>종가: ${c}</div>
          </div>
        `;
      },
    },
    annotations: {
      xaxis: chartAnnotations,
    },
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={[
          {
            name: "가격",
            data: formattedData,
          },
          {
            name: "추이",
            data: formattedData,
            type: 'area',
            color: '#D1EFED',
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'light',
                type: 'vertical',
                gradientToColors: ['#ffffff'],
                opacityFrom: 0.3,
                opacityTo: 0.7,
                stops: [0, 100],
              },
            },
            opacity: 0.4,
          },
        ]}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandleChart;
