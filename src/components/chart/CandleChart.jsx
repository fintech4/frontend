import React from "react";
import Chart from "react-apexcharts";
import { data } from "../../stockData/chartData"; // 데이터 파일에서 데이터 가져오기

// 유효한 데이터만을 필터링하여 반환하는 함수
const filterValidDates = (data) => {
  return data.filter((item) =>
    item.y.every((value) => value !== null && value !== undefined)
  );
};

// 주말을 제외한 유효한 데이터만 필터링하여 반환하는 함수
const filterWeekdays = (data) => {
  return data.filter((item) => {
    const day = new Date(item.x).getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    return day !== 0 && day !== 6; // 주말 제외 (일요일과 토요일)
  });
};

// 주말 제외 및 유효한 데이터 필터링
const filterDataByDateRange = (data, dateRange) => {
  const [startDate, endDate] = dateRange;
  return data.filter((item) => {
    const itemDate = new Date(item.x);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

const getAnnotations = (data) => {
  const annotations = [];

  const startDate = new Date(Math.min(...data.map((item) => item.x)));
  const endDate = new Date(Math.max(...data.map((item) => item.x)));
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toDateString();
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hasData = data.some((d) => new Date(d.x).toDateString() === dateStr);

    if (!hasData && !isWeekend) {
      annotations.push({
        x: new Date(currentDate).getTime(),
        borderColor: "#F6bb43", // 세로 선 색상
      });
    }

    if (isWeekend) {
      annotations.push({
        x: new Date(currentDate).getTime(),
        borderColor: "#ced4da", // 세로 선 색상
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return annotations;
};

const CandleChart = ({ dateRange }) => {
  const filteredData = filterValidDates(filterWeekdays(filterDataByDateRange(data, dateRange)));
  const chartAnnotations = getAnnotations(filteredData);

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
          upward: "#FF0000", // 종가가 시가보다 높은 경우 초록색
          downward: "#0000FF", // 종가가 시가보다 낮은 경우 파란색
        },
      },
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10, // x축에 표시될 tick의 수 조절
      labels: {
        formatter: function (value) {
          const date = new Date(value);
          const month = date.getMonth() + 1; // 0-based
          const day = date.getDate();
          return `${month}.${day}`;
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
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]; // 시가
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]; // 고가
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]; // 저가
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]; // 종가

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
      xaxis: chartAnnotations, // 메모 추가
    },
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={[
          {
            name: "Price",
            data: filteredData, // 필터링된 데이터 사용
          },
        ]}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandleChart;
