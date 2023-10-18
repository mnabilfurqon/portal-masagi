import {
  HomeOutlined,
  UserOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu, theme, Dropdown, Space, Avatar } from "antd";
import { LogoMasagi } from "../../assets";
import "./layoutComponent.css";
import { Link } from "react-router-dom";

const LayoutComponent = ({ children }) => {
  const { Header, Content, Sider } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    getItem("Dashboard", "/dashboard", <HomeOutlined />),
    getItem("Master Data", "/master-data", <UserOutlined />, [
      getItem("Company", "/company"),
      getItem("Employee", "/employee"),
      getItem("User", "/user"),
      getItem("Role", "/role"),
      getItem("Division", "/division"),
      getItem("Posisition", "/posisition"),
    ]),
  ];

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  return (
    <Layout className="layout-container">
      <Sider
        style={{
          background: colorBgContainer,
          backgroundColor: "rgba(248, 249, 250, 1)",
        }}
      >
        <img src={LogoMasagi} alt="Logo Masagi" className="logo-masagi" />
        <Menu
          defaultSelectedKeys={["/dashboard"]}
          mode="inline"
          items={items}
          style={{ backgroundColor: "rgba(248, 249, 250, 1)" }}
        />
      </Sider>
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
              <p>Company Configuration</p>
            </div>

            <Flex>
              <Space style={{ padding: "10px" }}>
                <BellDropdown />
                <MyDropdown />
              </Space>
            </Flex>
          </Flex>
        </Header>
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

const BellDropdown = () => {
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
          <BellOutlined />
        </a>
      </Dropdown>
    </>
  );
};
export default LayoutComponent;
