import { HomeOutlined, BellOutlined, DownOutlined } from "@ant-design/icons";
import { Flex, Layout, Menu, theme, Dropdown, Space, Avatar } from "antd";
import { LogoMasagi } from "../../assets/";
import { Link } from "react-router-dom";
import SearchBox from "../common/searchBox/SearchBox";
import FilterButton from "../common/filterButton/FilterButton";
import SortButton from "../common/SortButton/SortButton";
import CountButton from "../common/countButton/CountButton";
import { TbDatabasePlus } from "react-icons/tb";
import "./layoutComponent.css";

const LayoutComponent = ({ children, hideButtons, isSuperAdmin }) => {
  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Ganti Judul Tiap Ganti Halaman
  let pageTitle = "Dashboard";
  let pageSubTitle = "";
  let finalPageTitle = "Dashboard";

  if (location.pathname === "/company") {
    pageTitle = "Company";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/company/add-company") {
    pageTitle = <Link to="/company" style={{ color: 'black' }}>Company / </Link>;
    pageSubTitle = <span style={{ color: '#17A2B8' }}>Add Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    )
  } else if (location.pathname === "/company/detail-company") {
    pageTitle = <Link to="/company" style={{ color: 'black' }}>Company / </Link>;
    pageSubTitle = <span style={{ color: '#17A2B8' }}>Detail Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    )
  } else if (location.pathname === "/company/edit-company") {
    pageTitle = <Link to="/company" style={{ color: 'black' }}>Company / </Link>;
    pageSubTitle = <span style={{ color: '#17A2B8' }}>Edit Company</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    )
  } else if (location.pathname === "/user") {
    pageTitle = "User";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/role") {
    pageTitle = "Role";
    finalPageTitle = pageTitle;
  } else if (location.pathname === "/role/detail-role") {
    pageTitle = <Link to="/role" style={{ color: 'black' }}>Role / </Link>;
    pageSubTitle = <span style={{ color: '#17A2B8' }}>Detail Role</span>;
    finalPageTitle = (
      <>
        {pageTitle}
        {pageSubTitle}
      </>
    )
  } else if (location.pathname === "/position") {
    pageTitle = "Position";
    finalPageTitle = pageTitle;
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
            <SubMenu key="masterData" icon={<TbDatabasePlus/>} title="Master Data">
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
            <SubMenu key="masterData" icon={<TbDatabasePlus/>} title="Master Data">
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
                  <SearchBox className="search-box" />
                  <FilterButton className="filter-button" />
                  <SortButton className="sort-button" />
                  <CountButton className="count-button" />
                </div>
              </div>
            )}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

// Dropdown Profile
const MyDropdown = () => {
  // the name should be "items"
  const items = [
    {
      label: <Link to="">Akun 1</Link>,
      key: "0",
    },
    {
      label: <Link to="">Akun 2</Link>,
      key: "1",
    },
    {
      label: <Link to="">Akun 3</Link>,
      key: "2",
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a
          onClick={(e) => e.preventDefault()}
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
              J
            </Avatar>
            John Doe
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default LayoutComponent;
