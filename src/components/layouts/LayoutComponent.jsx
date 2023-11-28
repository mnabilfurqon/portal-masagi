import React, { useState, useEffect } from 'react';
import {
  HomeOutlined,
  BellOutlined,
  DownOutlined,
  UserOutlined,
  IdcardOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu, theme, Dropdown, Space, Avatar } from "antd";
import { LogoMasagi } from "../../assets/";
import { Link, useNavigate } from "react-router-dom";
import { TbDatabasePlus } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { LuClipboardSignature } from "react-icons/lu";
import { HiOutlineClipboardList } from "react-icons/hi";
import Cookies from "js-cookie";
import "./layoutComponent.css";

const LayoutComponent = ({ children, roleNumber }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Logout Components
  const MyDropdown = () => {
    const username = Cookies.get('username');
    const navigate = useNavigate();
    // the name should be "items"
    const items = [
      {
        label: 'Logout',
        key: '0',
      },
    ];

    const handlerLogout = () => {
      Cookies.remove('token');
      Cookies.remove('role_uuid');
      Cookies.remove('username');
      Cookies.remove('company_uuid');
      navigate('/login');
    };

    return (
      <>
        <Dropdown menu={{ items, onClick: handlerLogout }} trigger={['click']}>
          <a
            style={{
              textDecoration: 'none',
              color: 'GrayText',
            }}>
            <Space>
              <Avatar
                style={{ backgroundColor: '#17A2B8', verticalAlign: 'middle' }}
                size='medium'
                gap={2}>
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
  let pageTitle = 'Dashboard';
  let pageSubTitle = '';
  let finalPageTitle = 'Dashboard';

  if (location.pathname === '/company') {
    pageTitle = 'Company';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/company/add-company') {
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
  } else if (location.pathname.includes('/company/detail-company/')) {
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
  } else if (location.pathname.includes('/company/edit-company/')) {
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
  } else if (location.pathname === '/user') {
    pageTitle = 'User';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/user/add-user') {
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
  } else if (location.pathname === '/role') {
    pageTitle = 'Role';
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes('/role/detail-role')) {
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
  } else if (location.pathname === '/position') {
    pageTitle = 'Position';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/employee') {
    pageTitle = 'Employee';
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
  } else if (location.pathname === '/employee/add-employee') {
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
  } else if (location.pathname === '/attendance') {
    pageTitle = 'Attendance';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/history') {
    pageTitle = 'History';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/present') {
    pageTitle = 'Present';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/report') {
    pageTitle = 'Report';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/permit') {
    pageTitle = 'Permit';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/official-travel') {
    pageTitle = 'Official Travel';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/leave') {
    pageTitle = 'Leave';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/overtime') {
    pageTitle = 'Overtime';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/official-travel-request') {
    pageTitle = 'Official Travel Request';
    finalPageTitle = pageTitle;
  } else if (location.pathname.includes('/official-travel-request/detail')) {
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
  } else if (location.pathname === '/leave-request') {
    pageTitle = 'Leave Request';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/overtime-request') {
    pageTitle = 'Overtime Request';
    finalPageTitle = pageTitle;
  } else if (location.pathname === '/permit-request') {
    pageTitle = 'Permit Request';
    finalPageTitle = pageTitle;
  }

  return (
    <Layout className='layout-container'>
      {/* Sider */}
      {roleNumber === 1 ? (
        // Login sebagai Super Admin
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          style={{
            background: colorBgContainer,
            backgroundColor: 'rgba(248, 249, 250, 1)',
          }}>
          <img src={LogoMasagi} alt='Logo Masagi' className='logo-masagi' />
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode='inline'
            style={{ backgroundColor: 'rgba(248, 249, 250, 1)' }}>
            <Menu.Item key='/dashboard' icon={<HomeOutlined />}>
              <Link to='/dashboard'>Dashboard</Link>
            </Menu.Item>
            <SubMenu
              key='masterData'
              icon={<TbDatabasePlus />}
              title='Master Data'>
              <Menu.Item key='/company'>
                <Link to='/company'>Company</Link>
              </Menu.Item>
              <Menu.Item key='/user'>
                <Link to='/user'>User</Link>
              </Menu.Item>
              <Menu.Item key='/role'>
                <Link to='/role'>Role</Link>
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
            backgroundColor: 'rgba(248, 249, 250, 1)',
          }}>
          <img src={LogoMasagi} alt='Logo Masagi' className='logo-masagi' />
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode='inline'
            style={{ backgroundColor: 'rgba(248, 249, 250, 1)' }}>
            <Menu.Item key='/dashboard' icon={<HomeOutlined />}>
              <Link to='/dashboard'>Dashboard</Link>
            </Menu.Item>
            <SubMenu
              key='masterData'
              icon={<TbDatabasePlus />}
              title='Master Data'>
              <Menu.Item key='/company'>
                <Link to='/company'>Company</Link>
              </Menu.Item>
              <Menu.Item key='/employee'>
                <Link to='/employee'>Employee</Link>
              </Menu.Item>
              <Menu.Item key='/user'>
                <Link to='/user'>User</Link>
              </Menu.Item>
              <Menu.Item key='/role'>
                <Link to='/role'>Role</Link>
              </Menu.Item>
              <Menu.Item key='/division'>
                <Link to='/division'>Division</Link>
              </Menu.Item>
              <Menu.Item key='/position'>
                <Link to='/position'>Position</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      ) : (
        // Login sebagai Employee
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          style={{
            background: colorBgContainer,
            backgroundColor: 'rgba(248, 249, 250, 1)',
          }}>
          <img src={LogoMasagi} alt='Logo Masagi' className='logo-masagi' />
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode='inline'
            style={{ backgroundColor: 'rgba(248, 249, 250, 1)' }}>
            <Menu.Item key='/attendance' icon={<IdcardOutlined />}>
              <Link to='/attendance'>Attendance</Link>
            </Menu.Item>
            <Menu.Item key='/history' icon={<HistoryOutlined />}>
              <Link to='/history'>History</Link>
            </Menu.Item>
            <SubMenu
              key='attendance-report'
              icon={<RiTeamLine />}
              title='Attendance Report'>
              <Menu.Item key='/present'>
                <Link to='/present'>Present</Link>
              </Menu.Item>
              <Menu.Item key='/report'>
                <Link to='/report'>Report</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key='permit-parent'
              icon={<LuClipboardSignature />}
              title='Permit'>
              <Menu.Item key='official-travel'>
                <Link to='/official-travel'>Official Travel</Link>
              </Menu.Item>
              <Menu.Item key='leave'>
                <Link to='/leave'>Leave</Link>
              </Menu.Item>
              <Menu.Item key='overtime'>
                <Link to='/overtime'>Overtime</Link>
              </Menu.Item>
              <Menu.Item key='permit'>
                <Link to='/permit'>Permit</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key='permit-request-parent'
              icon={<HiOutlineClipboardList />}
              title='Permit Request'>
                <Menu.Item key='/official-travel-request'>
                  <Link to='/official-travel-request'>Official Travel</Link>
                </Menu.Item>
                <Menu.Item key='/leave-request'>
                  <Link to='/leave-request'>Leave</Link>
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
      )}

      {/* Header */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            backgroundColor: 'rgba(248, 249, 250, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Flex
            gap={'middle'}
            justify='space-between'
            style={{
              width: '100%',
              padding: '2rem',
            }}>
            <div className='brand'>
              <p>{finalPageTitle}</p>
            </div>

            <Flex>
              <Space style={{ padding: '10px' }}>
                <BellOutlined />
                <MyDropdown />
              </Space>
            </Flex>
          </Flex>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: '0 16px',
          }}>
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
