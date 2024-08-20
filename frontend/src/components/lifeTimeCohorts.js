import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const CustomerLifetimeValueCohorts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers/customer-lifetime-value-cohorts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching CLV cohort data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" style={{ marginTop: '30px' }} height={400}>
      <h2>New Customers Added Over Time</h2>

      <AreaChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.length > 0 && Object.keys(data[0]).filter(key => key !== 'month').map(cohort => (
          <Area key={cohort} type="monotone" dataKey={cohort} stackId="1" stroke="#8884d8" fill="#8884d8" />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomerLifetimeValueCohorts;
