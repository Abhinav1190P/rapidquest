import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const SalesOverTimeChart = () => {
    const [salesData, setSalesData] = useState([]);
    const [interval, setInterval] = useState('monthly');

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders/sales-over-time', { params: { interval } });
                setSalesData(response.data);
            } catch (error) {
                console.error("Error fetching sales data", error);
            }
        };
        fetchSalesData();
    }, [interval]);

    const handleIntervalChange = (e) => {
        setInterval(e.target.value);
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2>Total Sales Over Time</h2>
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
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesOverTimeChart;
