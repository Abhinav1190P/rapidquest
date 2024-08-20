import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const NewCustomersChart = () => {
  const [customerData, setCustomerData] = useState([]);
  const [interval, setInterval] = useState('monthly'); 

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers/new-customers-over-time', { params: { interval } });
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer data", error);
      }
    };
    fetchCustomerData();
  }, [interval]);

  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>New Customers Added Over Time</h2>
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
        <BarChart
          data={customerData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="newCustomers" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewCustomersChart;
