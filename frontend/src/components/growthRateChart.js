import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const SalesGrowthRateChart = () => {
  const [growthData, setGrowthData] = useState([]);
  const [interval, setInterval] = useState('monthly'); 
  
  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/sales-growth-rate', { params: { interval } });
        setGrowthData(response.data);
      } catch (error) {
        console.error("Error fetching growth rate data", error);
      }
    };
    fetchGrowthData();
  }, [interval]);

  console.log(growthData)
  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Sales Growth Rate Over Time</h2>
      <div>
        <label>Choose Interval: </label>
        <select value={interval} onChange={handleIntervalChange}>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={growthData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line type="monotone" dataKey="growthRate" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGrowthRateChart;
