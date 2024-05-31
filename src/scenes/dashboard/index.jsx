import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useDispatch, useSelector } from "react-redux";
import { getTotalUsers } from "../../state/Dashboard/Action";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const totalUsers = useSelector((state) => state.adminDashboard.totalUsers);
  const loading = useSelector((state) => state.adminDashboard.loading);
  const error = useSelector((state) => state.adminDashboard.error);

  useEffect(() => {
    dispatch(getTotalUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="ml-6">
        <h1 className="text-2xl"> Dashboard</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Total Users: {totalUsers}</p>
      )}
    </div>
  );
};

export default Dashboard;
