import React, { useState, useEffect } from "react";
import { Layout, Card, Statistic, Progress } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./DashboardPage.css";

const DashboardPage = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [absenData, setAbsenData] = useState(0);
  const [izinData, setIzinData] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAbsenData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://attendanceapi.masagi.co.id/api/v1/attendance/summary_company",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAbsenData(response.present);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const getIzinData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://attendanceapi.masagi.co.id/api/v1/attendance/summary_company",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIzinData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://attendanceapi.masagi.co.id/api/v1/users/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTotalUser(response.data[0]._meta.total_items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getAbsenData();
    getIzinData();
    getTotalUser();
  }, [token, navigate]);

  return (
    <Layout style={{ padding: 20 }}>
      <Card
        title="Dashboard"
        bordered={false}
        className="dashboard-card"
        loading={loading}
      >
        <div className="statistic-container">
          <Statistic
            title={<span style={{ fontWeight: "bold" }}>Total Absen</span>}
            value={absenData}
            valueStyle={{ color: "#73B3B7" }}
          />
          <Statistic
            title={<span style={{ fontWeight: "bold" }}>Total Izin</span>}
            value={izinData}
            valueStyle={{ color: "#73B3B7" }}
          />
          <Statistic
            title={<span style={{ fontWeight: "bold" }}>Total User</span>}
            value={totalUser}
            valueStyle={{ color: "#73B3B7" }}
          />
        </div>
      </Card>
      <div className="progress-container">
        <Progress
          type="line"
          percent={absenData}
          format={(percent) => `${percent} / 100`}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          strokeWidth={15}
          trailColor="#f0f0f0"
        />
        <Progress
          type="line"
          percent={izinData}
          format={(percent) => `${percent} / 100`}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          strokeWidth={15}
          trailColor="#f0f0f0"
        />
        <Progress
          type="line"
          percent={totalUser}
          format={(percent) => `${percent} / 100`}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          strokeWidth={15}
          trailColor="#f0f0f0"
        />
      </div>
      <div className="system-info">
        <h3>System Information</h3>
        <ul>
          <li>
            <span style={{ display: "inline-block", width: 100 }}>Browser</span>
            {navigator.userAgent}
          </li>
          <li>
            <span style={{ display: "inline-block", width: 100 }}>
              Platform
            </span>
            {navigator.platform}
          </li>
          <li>
            <span style={{ display: "inline-block", width: 100 }}>
              Language
            </span>
            {navigator.language}
          </li>
          <li>
            <span style={{ display: "inline-block", width: 100 }}>
              Time Zone
            </span>
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default DashboardPage;
