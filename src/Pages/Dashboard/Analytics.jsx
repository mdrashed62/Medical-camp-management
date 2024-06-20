import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProviders";

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [campData, setCampData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://medical-camp-management-server-a12.vercel.app/registeredCamps/user/${user.email}`
        );
        setCampData(response.data);
      } catch (error) {
        console.error("Error fetching camp data:", error);
      }
    };

    if (user && user.email) {
      fetchData();
    }
  }, [user]);

  return (
    <div>
      <h1>Participants Lifetime Registered Camps</h1>
      <BarChart
        width={800}
        height={400}
        data={campData}
        style={{ background: "#f0f0f0" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="campName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="participantCount" fill="#8884d8" />
        <Bar dataKey="fees" name="Camp Fees" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default Analytics;
