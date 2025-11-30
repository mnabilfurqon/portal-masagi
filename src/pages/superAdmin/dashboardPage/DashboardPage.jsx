import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Table,
  Carousel,
  Typography,
  Modal,
  Input,
  Button,
  Row,
  Col,
} from "antd";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineFileSearch } from "react-icons/ai";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import "./DashboardPage.css";

const DashboardPage = () => {
  const { Text, Title } = Typography;
  const { Search } = Input;
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ title: "", data: [] });
  const [filteredData, setFilteredData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyData = {
    months: ["January", "February", "March", "April", "May", "June"],
    absen: [15, 20, 18, 25, 22, 30],
    permit: [5, 7, 4, 6, 8, 10],
    user: [50, 55, 60, 65, 70, 75],
    project: [10, 12, 14, 16, 18, 20],
    company: [8, 9, 10, 11, 12, 13],
    role: [6, 7, 7, 8, 9, 10],
    profit: [5000, 7000, 8000, 8500, 9000, 9500],
    omzet: [20000, 23000, 25000, 27000, 29000, 31000],
    laba: [3000, 3500, 4000, 4500, 5000, 5500],
  };

  const totalData = {
    absen: monthlyData.absen.reduce((sum, val) => sum + val, 0),
    permit: monthlyData.permit.reduce((sum, val) => sum + val, 0),
    user: monthlyData.user.reduce((sum, val) => sum + val, 0),
    project: monthlyData.project.reduce((sum, val) => sum + val, 0),
    company: monthlyData.company.reduce((sum, val) => sum + val, 0),
    role: monthlyData.role.reduce((sum, val) => sum + val, 0),
    profit: monthlyData.profit.reduce((sum, val) => sum + val, 0),
    omzet: monthlyData.omzet.reduce((sum, val) => sum + val, 0),
    laba: monthlyData.laba.reduce((sum, val) => sum + val, 0),
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    setFilteredData(tableData);
    setFilteredData(tableData);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [token, navigate]);

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#629093",
  };

  const barChartData = {
    labels: monthlyData.months,
    datasets: [
      {
        label: "Total Absen",
        data: monthlyData.absen,
        backgroundColor: "#108ee9",
      },
      {
        label: "Total Permit",
        data: monthlyData.permit,
        backgroundColor: "#73B3B7",
      },
      {
        label: "Total User",
        data: monthlyData.user,
        backgroundColor: "#87d068",
      },
      {
        label: "Total Project",
        data: monthlyData.project,
        backgroundColor: "#52C41A",
      },
      {
        label: "Total Company",
        data: monthlyData.company,
        backgroundColor: "#1890FF",
      },
      {
        label: "Total Role",
        data: monthlyData.role,
        backgroundColor: "#FAAD14",
      },
    ],
  };

  const lineChartData = {
    labels: monthlyData.months,
    datasets: [
      {
        label: "Profit",
        data: monthlyData.profit,
        borderColor: "#108ee9",
        fill: false,
      },
      {
        label: "Omzet",
        data: monthlyData.omzet,
        borderColor: "#73B3B7",
        fill: false,
      },
      {
        label: "Laba",
        data: monthlyData.laba,
        borderColor: "#52C41A",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const tableData = [
    {
      key: "1",
      category: "Total Absen",
      total: totalData.absen,
      data: monthlyData.absen,
    },
    {
      key: "2",
      category: "Total Permit",
      total: totalData.permit,
      data: monthlyData.permit,
    },
    {
      key: "3",
      category: "Total User",
      total: totalData.user,
      data: monthlyData.user,
    },
    {
      key: "4",
      category: "Total Project",
      total: totalData.project,
      data: monthlyData.project,
    },
    {
      key: "5",
      category: "Total Company",
      total: totalData.company,
      data: monthlyData.company,
    },
    {
      key: "6",
      category: "Total Role",
      total: totalData.role,
      data: monthlyData.role,
    },
    {
      key: "7",
      category: "Total Profit",
      total: totalData.profit,
      data: monthlyData.profit,
    },
    {
      key: "8",
      category: "Total Omzet",
      total: totalData.omzet,
      data: monthlyData.omzet,
    },
    {
      key: "9",
      category: "Total Laba",
      total: totalData.laba,
      data: monthlyData.laba,
    },
  ];

  const handleSearch = (value) => {
    const filtered = tableData.filter((item) =>
      item.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      tableData.map((item) => ({ Category: item.category, Total: item.total }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
    XLSX.writeFile(workbook, "Dashboard_Summary.xlsx");
  };

  const columns = [
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a
          onClick={() => {
            setModalData({ title: record.category, data: record.data });
            setModalVisible(true);
          }}
        >
          <AiOutlineFileSearch className="detail-icon" />
        </a>
      ),
    },
  ];

  const [userData] = useState([
    {
      key: "1",
      userName: "Nabil",
      companyName: "PT UPI EDUN",
      roleName: "Admin",
      divisionName: "Fronted Developer",
      status: "Aktif",
    },
    {
      key: "2",
      userName: "Fikri",
      companyName: "PT Mencari Cinta",
      roleName: "Employee",
      divisionName: "Backend Developer",
      status: "Aktif",
    },
    {
      key: "3",
      userName: "Reyhan",
      companyName: "PT Cinta Sejati",
      roleName: "HR",
      divisionName: "UI/UX Designer",
      status: "Aktif",
    },
    {
      key: "4",
      userName: "Rangga",
      companyName: "PT Pemuda Sejati",
      roleName: "Super Admin",
      divisionName: "Bisnis Analyst",
      status: "Aktif",
    },
    {
      key: "5",
      userName: "Arif",
      companyName: "PT RPL FIRE",
      roleName: "Head of Division",
      divisionName: "Project Manager",
      status: "Aktif",
    },
  ]);

  const columnsUser = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Division Name",
      dataIndex: "divisionName",
      key: "divisionName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Text style={{ color: status === "Aktif" ? "#52c41a" : "#f5222d" }}>
          {status}
        </Text>
      ),
    },
  ];

  const projectStatusData = {
    labels: ["In Progress", "Cancel", "Done", "Review"],
    datasets: [
      {
        label: "Project Status",
        data: [40, 10, 50, 100],
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Layout>
      <Carousel autoplay autoplaySpeed={2000} dots={{ className: "dots" }}>
        <div>
          <h3 style={contentStyle}>SELAMAT DATANG</h3>
        </div>
        <div>
          <h3 style={contentStyle}>DI</h3>
        </div>
        <div>
          <h3 style={contentStyle}>WEBSITE</h3>
        </div>
        <div>
          <h3 style={contentStyle}>PORTAL MASAGI</h3>
        </div>
      </Carousel>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Card
            title="Description"
            bordered={false}
            style={{ textAlign: "justify", marginBottom: "20px" }}
            className="dashboard-card"
          >
            <Text>
              <b>PORTAL MASAGI</b> atau bisa juga disebut Human Resource
              Information System (HRIS) adalah aplikasi perangkat lunak yang
              mengintegrasikan manajemen sumber daya manusia dengan teknologi
              informasi untuk mengotomatisasi proses SDM
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Card
            title="Current Time"
            bordered={false}
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
            className="dashboard-card"
          >
            <Text
              style={{ fontSize: "2em", fontWeight: "bold", color: "#4caf50" }}
            >
              {currentTime.toLocaleTimeString()}
            </Text>
            <br />
            <Text style={{ fontSize: "1em", color: "#555" }}>
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card
            title="Dashboard Statistics"
            bordered={false}
            style={{ marginBottom: "20px" }}
            className="dashboard-card"
          >
            <Bar data={barChartData} options={chartOptions} />
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card
            title="Business Predictions"
            bordered={false}
            style={{ marginBottom: "20px" }}
            className="dashboard-card"
          >
            <Line data={lineChartData} options={chartOptions} />
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card
            title="Project Status Overview"
            bordered={false}
            className="dashboard-card"
            style={{ marginBottom: "20px" }}
          >
            <Doughnut data={projectStatusData} />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Card
            title="Summary Table"
            bordered={false}
            className="dashboard-card"
            style={{ marginBottom: "20px" }}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Search
                className="dashboard-search-input"
                placeholder="Search category"
                onSearch={handleSearch}
                enterButton
                allowClear
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Button
                className="export-button"
                onClick={exportToExcel}
              >
                Export to Excel
              </Button>
            </Col>
            <Table
              dataSource={filteredData}
              columns={columns}
              size="small"
              pagination={false}
              scroll={{ x: true, y: 280 }}
              style={{ marginBottom: "-50px" }}
            />
          </Card>
        </Col>

        <Modal
          title={modalData.title}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <ul>
            {modalData.data.map((item, index) => {
              const monthName = monthNames[index];
              return (
                <li key={index}>
                  {monthName}: {item}
                </li>
              );
            })}
          </ul>
        </Modal>

        <Col xs={24} sm={12} md={24} lg={24} xl={24} xxl={24}>
          <Card
            title="Active Users"
            bordered={false}
            className="dashboard-card"
          >
            <Table
              dataSource={userData}
              columns={columnsUser}
              size="small"
              pagination={false}
              scroll={{ x: true, y: 200 }}
              style={{ marginBottom: "-50px" }}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default DashboardPage;
