import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 80vw;
  height: 60vh;
  position: relative;
`;

const generateMockData = () => {
  const today = new Date();
  const data = [];
  for (let i = 0; i < 100; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      price: (Math.random() * 100 + 100).toFixed(2)
    });
  }
  return data.reverse();
};

const StockPriceChart = () => {
  const data = generateMockData();

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Stock Price',
        data: data.map(d => d.price),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 30,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)',
        },
        beginAtZero: true,
      }
    }
  };

  return (
    <ChartContainer>
      <Line data={chartData} options={chartOptions} />
    </ChartContainer>
  );
};

export default StockPriceChart;
