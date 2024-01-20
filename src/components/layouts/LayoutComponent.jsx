import React, { useEffect } from "react";
import { Flex, Layout, Menu, theme, Dropdown, Space, Avatar } from "antd";
import { LogoMasagi } from "../../assets/";
import { Link, useNavigate } from "react-router-dom";
import { TbDatabasePlus } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { LuClipboardSignature } from "react-icons/lu";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineHome, AiOutlineUser, AiOutlineIdcard, AiOutlineHistory } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import Cookies from "js-cookie";
import "./layoutComponent.css";

const LayoutComponent = ({ children, roleNumber }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Logout Components
  const MyDropdown = () => {
    const username = Cookies.get("username");
    const navigate = useNavigate();
    const items = [
      {
        label: "Logout",
        key: "0",
      },
    ];

    const handlerLogout = () => {
      Cookies.remove("token");
      Cookies.remove("role_uuid");
      Cookies.remove("username");
      Cookies.remove("company_uuid");
      Cookies.remove("role_name");
      navigate("/login");
    };

    return (
      <>
        <Dropdown menu={{ items, onClick: handlerLogout }} trigger={["click"]}>
          <a
            style={{
              textDecoration: "none",
              color: "GrayText",
            }}
          >
            <Space>
              <Avatar
                style={{ backgroundColor: "#17A2B8", verticalAlign: "middle" }}
                size="medium"
                gap={2}
              >
                <AiOutlineUser />
              </Avatar>
              {username}
              <FaChevronDown />
            </Space>
          </a>
        </Dropdown>
      </>
    );
  };

  // Ganti Judul Tiap Ganti Halaman
  let pageTitle = "Dashboard";
  let pageSubTitle = "";
  let finalPageTitle = "Dashboard";

  if (location.pathname === "/company") {
    pageTitle = "Company";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/company/add-company") {
    pageTitle = (
      <Link to="/company" className="page-title">
        Company /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title">Add Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/company/detail-company/")) {
    pageTitle = (
      <Link to="/company" className="page-title">
        Company /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title">Detail Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/company/edit-company/")) {
    pageTitle = (
      <Link to="/company" className="page-title">
        Company /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title">Edit Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/company/add-user/")) {
    pageTitle = "User Configuration";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/user") {
    pageTitle = "User";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/employee/add-user")) {
    pageTitle = (
      <Link to="/user" className="page-title">
        User /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title">User Configuration</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/role") {
    pageTitle = "Role";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/role/detail-role")) {
    pageTitle = (
      <Link to="/role" className="page-title">
        Role /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title">Detail Role</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/position") {
    pageTitle = "Position";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/employee") {
    pageTitle = "Employee";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/employee/detail-employee")) {
    pageTitle = (
      <Link to="/employee" className="page-title">
        Employee /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title">Employee Configuration</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/employee/add-employee") {
    pageTitle = (
      <Link to="/employee" className="page-title">
        Employee /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title">Employee Configuration</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/division") {
    pageTitle = "Division";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/attendance") {
    pageTitle = "Attendance";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/history") {
    pageTitle = "History";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/present") {
    pageTitle = "Present Report";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/report") {
    pageTitle = "Report";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/official-travel") {
    pageTitle = "Official Travel";
    finalPageTitle = pageTitle;
  } else if (
    location.pathname === "/official-travel/official-travel-requested"
  ) {
    pageTitle = (
      <Link to={"/official-travel"} className="page-title">
        Official Travel /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title">Official Travel Requested</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/official-travel/detail")) {
    pageTitle = (
      <Link to={"/official-travel"} className="page-title">
        Official Travel /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title">Official Travel Requested Detail</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/leave") {
    pageTitle = "Leave";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/leave/leave-requested") {
    pageTitle = (
      <Link to={"/leave"} className="page-title">
        Leave /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title">Leave Requested</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/leave/detail")) {
    pageTitle = (
      <Link to={"/leave"} className="page-title">
        Leave /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title">Leave Requested Detail</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/overtime") {
    pageTitle = "Overtime";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/overtime/overtime-requested") {
    pageTitle = (
      <Link to={"/overtime"} className="page-title">
        Overtime /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title">Overtime Requested</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/overtime/detail")) {
    pageTitle = (
      <Link to={"/overtime"} className="page-title">
        Overtime /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title">Overtime Requested Detail</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/permit") {
    pageTitle = "Permit";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/permit/permit-requested") {
    pageTitle = (
      <Link to={"/permit"} className="page-title">
        Permit /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title">Permit Requested</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/permit/detail")) {
    pageTitle = (
      <Link to={"/permit"} className="page-title">
        Permit /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title">Permit Requested Detail</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/official-travel-request") {
    pageTitle = "Official Travel Request";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/official-travel-request/detail")) {
    pageTitle = (
      <Link to="/official-travel-request" className="page-title">
        Official Travel Request /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Detail </span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/leave-request") {
    pageTitle = "Leave Request";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/leave-request/detail")) {
    pageTitle = (
      <Link to="/leave-request" className="page-title">
        Leave Request /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Detail </span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/overtime-request") {
    pageTitle = "Overtime Request";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/overtime-request/detail")) {
    pageTitle = (
      <Link to="/overtime-request" className="page-title">
        Overtime Request /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Detail </span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/permit-request") {
    pageTitle = "Permit Request";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/permit-request/detail")) {
    pageTitle = (
      <Link to="/permit-request" className="page-title">
        Permit Request /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Detail </span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/report/detail")) {
    pageTitle = (
      <Link to="/report" className="page-title">
        Attendance Report /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title"> Detail Attendance </span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/present/detail")) {
    pageTitle = (
      <Link to="/present" className="page-title">
        Attendance Report /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Detail Attendance </span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/project") {
    pageTitle = "Project";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/add-project") {
    pageTitle = (
      <Link to="/project" className="page-title">
        Project /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Project Configuration </span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/project/detail-project")) {
    pageTitle = (
      <Link to="/project" className="page-title">
        Project /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Project Detail </span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/edit-project")) {
    pageTitle = (
      <span>
        <Link to="/project" className="page-title">
          Project /{" "}
        </Link>
        <Link to={-1} className="page-title">
          Project Detail /{" "}
        </Link>
      </span>
    );
    pageSubTitle = <span className="page-sub-title"> Edit Data </span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/client") {
    pageTitle = "Client";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/client/add-client")) {
    pageTitle = (
      <Link to="/client" className="page-title">
        Client /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Client Configuration</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/client/detail-client/")) {
    pageTitle = (
      <Link to="/client" className="page-title">
        Client /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Detail Client</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/client/edit-client/")) {
    pageTitle = (
      <Link to="/client" className="page-title">
        Client /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Edit Client</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/team-project") {
    pageTitle = "Team Project";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/team-project/add-team-project")) {
    pageTitle = (
      <Link to="/team-project" className="page-title">
        Team Project /{" "}
      </Link>
    );
    pageSubTitle = (
      <span className="page-sub-title"> Team Project Configuration</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/team-project/detail-team-project/")) {
    pageTitle = (
      <Link to="/team-project" className="page-title">
        Team Project /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Team Project Detail</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/team-project/add-member-team-project/")) { 
    pageTitle = (
      <Link to="/team-project" className="page-title">
        Team Project / {" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Team Member</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/project-report") {
    pageTitle = "Project Report";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/task") {
    pageTitle = "Task";
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes("/task/add-task")) {
    pageTitle = (
      <Link to="/task" className="page-title">
        Task /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Task Configuration</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/task/detail-task/")) {
    pageTitle = (
      <Link to="/task" className="page-title">
        Task /{" "}
      </Link>
    );
    pageSubTitle = <span className="page-sub-title"> Detail Task</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/task-report") {
    pageTitle = "Task Report";
    finalPageTitle = pageTitle;
  }

  return (
    <Layout className="layout-container">
      {/* Sider */}
      {roleNumber === 1 ? (
        // Login sebagai Super Admin
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          style={{
            background: colorBgContainer,
            backgroundColor: "rgba(248, 249, 250, 1)",
          }}
        >
          <Link to="/dashboard">
            <img src={LogoMasagi} alt="Logo Masagi" className="logo-masagi" />
          </Link>
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            style={{ backgroundColor: "rgba(248, 249, 250, 1)" }}
          >
            <Menu.Item key="/dashboard" icon={<AiOutlineHome />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <SubMenu
              key="masterData"
              icon={<TbDatabasePlus />}
              title="Master Data"
            >
              <Menu.Item key="/company">
                <Link to="/company">Company</Link>
              </Menu.Item>
              <Menu.Item key="/role">
                <Link to="/role">Role</Link>
              </Menu.Item>
              <Menu.Item key="/user">
                <Link to="/user">User</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      ) : roleNumber === 2 ? (
        // Login sebagai Admin
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          style={{
            background: colorBgContainer,
            backgroundColor: "rgba(248, 249, 250, 1)",
          }}
        >
          <Link to="/dashboard">
            <img src={LogoMasagi} alt="Logo Masagi" className="logo-masagi" />
          </Link>
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            style={{ backgroundColor: "rgba(248, 249, 250, 1)" }}
          >
            <Menu.Item key="/dashboard" icon={<AiOutlineHome />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <SubMenu
              key="masterData"
              icon={<TbDatabasePlus />}
              title="Master Data"
            >
              <Menu.Item key="/client">
                <Link to="/client">Client</Link>
              </Menu.Item>
              <Menu.Item key="/company">
                <Link to="/company">Company</Link>
              </Menu.Item>
              <Menu.Item key="/division">
                <Link to="/division">Division</Link>
              </Menu.Item>
              <Menu.Item key="/employee">
                <Link to="/employee">Employee</Link>
              </Menu.Item>
              <Menu.Item key="/position">
                <Link to="/position">Position</Link>
              </Menu.Item>
              <Menu.Item key="/project">
                <Link to="/project">Project</Link>
              </Menu.Item>
              <Menu.Item key="/role">
                <Link to="/role">Role</Link>
              </Menu.Item>
              <Menu.Item key="/team-project">
                <Link to="/team-project">Team Project</Link>
              </Menu.Item>
              <Menu.Item key="/type-project">
                <Link to="/type-project">Type Project</Link>
              </Menu.Item>
              <Menu.Item key="/user">
                <Link to="/user">User</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      ) : roleNumber === 3 ? (
        // Login sebagai HR
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          width={230}
          style={{
            background: colorBgContainer,
            backgroundColor: "rgba(248, 249, 250, 1)",
          }}
        >
          <img src={LogoMasagi} alt="Logo Masagi" className="logo-masagi" />
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            style={{ backgroundColor: "rgba(248, 249, 250, 1)" }}
          >
            <Menu.Item key="/attendance" icon={<AiOutlineIdcard />}>
              <Link to="/attendance">Attendance</Link>
            </Menu.Item>
            <Menu.Item key='/history' icon={<AiOutlineHistory />}>
              <Link to='/history'>Attendance History</Link>
            </Menu.Item>
            <SubMenu
              key="attendance-report"
              icon={<RiTeamLine />}
              title="Attendance Report"
            >
              <Menu.Item key="/present">
                <Link to="/present">Present</Link>
              </Menu.Item>
              <Menu.Item key="/report">
                <Link to="/report">Report</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key='/history' icon={<AiOutlineHistory />}>
              <Link to='/history'>History</Link>
            </Menu.Item>
            <SubMenu
              key="permit-employee"
              icon={<LuClipboardSignature />}
              title='Permit'>
              <Menu.Item key='leave'>
                <Link to='/leave'>Leave</Link>
              </Menu.Item>
              <Menu.Item key='official-travel'>
                <Link to='/official-travel'>Official Travel</Link>
              </Menu.Item>
              <Menu.Item key='overtime'>
                <Link to='/overtime'>Overtime</Link>
              </Menu.Item>
              <Menu.Item key="permit">
                <Link to="/permit">Permit</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="permit-request-leaders"
              icon={<HiOutlineClipboardList />}
              title='Permit Request'>
                <Menu.Item key='/leave-request'>
                  <Link to='/leave-request'>Leave</Link>
                </Menu.Item>
                <Menu.Item key='/official-travel-request'>
                  <Link to='/official-travel-request'>Official Travel</Link>
                </Menu.Item>
                <Menu.Item key='/overtime-request'>
                  <Link to='/overtime-request'>Overtime</Link>
                </Menu.Item>
                <Menu.Item key='/permit-request'>
                  <Link to='/permit-request'>Permit</Link>
                </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      ) : roleNumber === 4 ? (
        // Login sebagai Team Leader
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          width={230}
          style={{
            background: colorBgContainer,
            backgroundColor: "rgba(248, 249, 250, 1)",
          }}
        >
          <img src={LogoMasagi} alt="Logo Masagi" className="logo-masagi" />
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            style={{ backgroundColor: "rgba(248, 249, 250, 1)" }}
          >
            <Menu.Item key="/attendance" icon={<AiOutlineIdcard />}>
              <Link to="/attendance">Attendance</Link>
            </Menu.Item>
            <Menu.Item key='/history' icon={<AiOutlineHistory />}>
              <Link to='/history'>Attendance History</Link>
            </Menu.Item>
            <SubMenu
              key="attendance-report"
              icon={<RiTeamLine />}
              title="Attendance Report"
            >
              <Menu.Item key="/present">
                <Link to="/present">Present</Link>
              </Menu.Item>
              <Menu.Item key="/report">
                <Link to="/report">Report</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="permit-employee"
              icon={<LuClipboardSignature />}
              title="Permit"
            >
              <Menu.Item key="leave">
                <Link to="/leave">Leave</Link>
              </Menu.Item>
              <Menu.Item key="official-travel">
                <Link to="/official-travel">Official Travel</Link>
              </Menu.Item>
              <Menu.Item key="overtime">
                <Link to="/overtime">Overtime</Link>
              </Menu.Item>
              <Menu.Item key="permit">
                <Link to="/permit">Permit</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="permit-request-leaders"
              icon={<HiOutlineClipboardList />}
              title='Permit Request'>
                <Menu.Item key='/leave-request'>
                  <Link to='/leave-request'>Leave</Link>
                </Menu.Item>
                <Menu.Item key='/official-travel-request'>
                  <Link to='/official-travel-request'>Official Travel</Link>
                </Menu.Item>
                <Menu.Item key='/overtime-request'>
                  <Link to='/overtime-request'>Overtime</Link>
                </Menu.Item>
                <Menu.Item key='/permit-request'>
                  <Link to='/permit-request'>Permit</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
              key="task-management"
              icon={<TbClipboardTypography />}
              title='Task Management'>
                <Menu.Item key='/project-report'>
                  <Link to='/project-report'>Project Report</Link>
                </Menu.Item>
                <Menu.Item key='/task'>
                  <Link to='/task'>Task</Link>
                </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      ) : (
        // Login sebagai Employee
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          width={230}
          style={{
            background: colorBgContainer,
            backgroundColor: "rgba(248, 249, 250, 1)",
          }}
        >
          <img src={LogoMasagi} alt="Logo Masagi" className="logo-masagi" />
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            style={{ backgroundColor: "rgba(248, 249, 250, 1)" }}
          >
            <Menu.Item key="/attendance" icon={<AiOutlineIdcard />}>
              <Link to="/attendance">Attendance</Link>
            </Menu.Item>
            <Menu.Item key='/history' icon={<AiOutlineHistory />}>
              <Link to='/history'>Attendance History</Link>
            </Menu.Item>
            <SubMenu
              key="permit-employee"
              icon={<LuClipboardSignature />}
              title='Permit'>
              <Menu.Item key='leave'>
                <Link to='/leave'>Leave</Link>
              </Menu.Item>
              <Menu.Item key='official-travel'>
                <Link to='/official-travel'>Official Travel</Link>
              </Menu.Item>
              <Menu.Item key='overtime'>
                <Link to='/overtime'>Overtime</Link>
              </Menu.Item>
              <Menu.Item key="permit">
                <Link to="/permit">Permit</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/task-report" icon={<TbClipboardTypography />}>
              <Link to="/task-report">Task Report</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      )}

      {/* Header */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            backgroundColor: "rgba(248, 249, 250, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Flex
            gap={"middle"}
            justify="space-between"
            style={{
              width: "100%",
              padding: "2rem",
            }}
          >
            <div className="brand">
              <p>{finalPageTitle}</p>
            </div>

            <Flex>
              <Space style={{ padding: "10px" }}>
                <FaRegBell />
                <MyDropdown />
              </Space>
            </Flex>
          </Flex>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              margin: "16px 0",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
