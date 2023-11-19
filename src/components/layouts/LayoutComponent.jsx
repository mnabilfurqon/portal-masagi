import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  BellOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu, theme, Dropdown, Space, Avatar } from "antd";
import { LogoMasagi } from "../../assets/";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "../common/searchBox/SearchBox";
import FilterButton from "../common/filterButton/FilterButton";
import SortButton from "../common/SortButton/SortButton";
import CountButton from "../common/countButton/CountButton";
import { TbDatabasePlus } from "react-icons/tb";
import Cookies from "js-cookie";
import "./layoutComponent.css";

const LayoutComponent = ({ children, hideButtons, isSuperAdmin }) => {
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

  // search handler
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };
  // end of search handler

  // filter handler
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = (value) => {
    setFilterValue(value);
  };
  // end of filter handler

  // sort handler
  const [sortValue, setSortValue] = useState("");

  const handleSort = (value) => {
    setSortValue(value);
  };
  // end of sort handler

  // count handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };
  // end of count handler

  // Dropdown Profile
  const MyDropdown = () => {
    const username = Cookies.get("username");
    const navigate = useNavigate();
    // the name should be "items"
    const items = [
      {
        label: "Logout",
        key: "0",
      },
    ];

    const handlerLogout = () => {
      Cookies.remove("token");
      Cookies.remove("role_id");
      Cookies.remove("username");
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
                <UserOutlined />
              </Avatar>
              {username}
              <DownOutlined />
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
      <Link to="/company" style={{ color: "black" }}>
        Company /{" "}
      </Link>
    );
    pageSubTitle = <span style={{ color: "#17A2B8" }}>Add Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/company/detail-company/")) {
    pageTitle = (
      <Link to="/company" style={{ color: "black" }}>
        Company /{" "}
      </Link>
    );
    pageSubTitle = <span style={{ color: "#17A2B8" }}>Detail Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname.includes("/company/edit-company/")) {
    pageTitle = (
      <Link to="/company" style={{ color: "black" }}>
        Company /{" "}
      </Link>
    );
    pageSubTitle = <span style={{ color: "#17A2B8" }}>Edit Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/user") {
    pageTitle = "User";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/employee/add-user") {
    pageTitle = (
      <Link to="/employee" style={{ color: "black" }}>
        Employee /{" "}
      </Link>
    );
    pageSubTitle = <span style={{ color: "#17A2B8" }}>Add User</span>;
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
      <Link to="/role" style={{ color: "black" }}>
        Role /{" "}
      </Link>
    );
    pageSubTitle = <span style={{ color: "#17A2B8" }}>Detail Role</span>;
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
  } else if (location.pathname === "/employee/detail-employee") {
    pageTitle = (
      <Link to="/employee" style={{ color: "black" }}>
        Employee /{" "}
      </Link>
    );
    pageSubTitle = (
      <span style={{ color: "#17A2B8" }}>Employee Configuration</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  } else if (location.pathname === "/employee/add-employee") {
    pageTitle = (
      <Link to="/employee" style={{ color: "black" }}>
        Employee /{" "}
      </Link>
    );
    pageSubTitle = (
      <span style={{ color: "#17A2B8" }}>Employee Configuration</span>
    );
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    );
  }

  return (
    <Layout className="layout-container">
      {/* Sider */}
      {isSuperAdmin ? (
        // Conditional Rendering ketika user adalah Super Admin
        <Sider
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
            <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
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
              <Menu.Item key="/user">
                <Link to="/user">User</Link>
              </Menu.Item>
              <Menu.Item key="/role">
                <Link to="/role">Role</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      ) : (
        // Conditional Rendering ketika user adalah Admin
        <Sider
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
            <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
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
              <Menu.Item key="/employee">
                <Link to="/employee">Employee</Link>
              </Menu.Item>
              <Menu.Item key="/user">
                <Link to="/user">User</Link>
              </Menu.Item>
              <Menu.Item key="/role">
                <Link to="/role">Role</Link>
              </Menu.Item>
              <Menu.Item key="/division">
                <Link to="/division">Division</Link>
              </Menu.Item>
              <Menu.Item key="/position">
                <Link to="/position">Position</Link>
              </Menu.Item>
            </SubMenu>
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
                <BellOutlined />
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
            {hideButtons ? null : (
              <div className="buttons-container">
                <div className="left-buttons">
                  <SearchBox className="search-box" onSearch={handleSearch} />
                  <FilterButton
                    className="filter-button"
                    onFilter={handleFilter}
                  />
                  <SortButton className="sort-button" onSort={handleSort} />
                  <CountButton className="count-button" onCount={handleCount} />
                </div>
              </div>
            )}
            {React.cloneElement(children, {
              searchValue,
              filterValue,
              sortValue,
              countValue,
            })}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
