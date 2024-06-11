import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [campData, setCampData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/registeredCamps');
        setCampData(response.data);
      } catch (error) {
        console.error('Error fetching camp data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Participants Lifetime Registered Camps</h1>
      <BarChart width={800} height={400} data={campData} style={{ background: '#f0f0f0' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="campName" />
        <YAxis />
        <Tooltip/>
        <Legend />
        <Bar dataKey="participantCount" fill="#8884d8" />
        <Bar dataKey="fees" name="Camp Fees" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default Analytics;
