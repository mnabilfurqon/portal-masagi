import React, { useEffect, useState } from 'react'
// import { AudioOutlined } from '@ant-design/icons'
// import { Input } from 'antd'
// import { Button, Dropdown } from 'antd'
// import { InputNumber } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { Table, Tag, Space, Button, Row, Col, Input } from 'antd'
import { DeleteConfirmationDialog } from '../../../components/common/deleteConfirmation/DeleteConfirmation'
import { SuccessUpdateModal } from '../../../components/common/successModal/SuccessModal'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './userConfiguration.css'
import EditUser from './editUser/EditUser'
import SuccessModal from '../../../components/common/successModal/SuccessModal'
import FailedModal from '../../../components/common/failedModal/FailedModal'
import SearchBox from '../../../components/common/searchBox/SearchBox'
import FilterButton from '../../../components/common/filterButton/FilterButton'
import SortButton from '../../../components/common/sortButton/SortButton'
import CountButton from '../../../components/common/countButton/CountButton'
import Cookies from 'js-cookie'
import axios from 'axios'

const UserConfiguration = () => {
  // {searchValue, filterValue, sortValue, countValue }

  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const {showModal} = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getUsersData();
    // setInterval(getUsersData, 1000);
  }, [token, navigate, isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

  // API GET Users Data
  const getUsersData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://attendance-1-r8738834.deta.app/api/v1/users/', {
        headers: {
          Authorization: token,
        }
      });
      setUsers(response.data[0].items);
      console.log(response.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Table
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.username).toLowerCase().includes(value.toLowerCase());
      },
    },
    // {
    //   title: 'Password',
    //   dataIndex: 'password',
    //   key: 'password',
    //   responsive: ["sm"],
    // },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      responsive: ["sm"],
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      responsive: ["md"],
      render: (record) => {
        // console.log("Status: ", record)
        if (record) {
          return (
            <Button key={record.uuid} className="active-button" type="primary" size="small" value="active" ghost>
              active
            </Button>
          );
        } else {
          return (
            <Button key={record.uuid} className="not-active-button" type="primary" size="small" value="notActive" ghost>
              not active
            </Button>
          );
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="small">
          <EditUser uuid={(record)} onClick={setIsEditModalOpen(true)}/>
          {/* <DeleteConfirmationDialog data="User" uuid={(record.key)}/> */}
        </Space>
      ),
    },
  ];

  const data = users?.map(item => {
    return {
      key: item.uuid,
      username: item.username,
      status: item.is_active,
      role: item.role.name,
      // password: item.password,
      // company: item.company.company_name,
      // created_date: item.created_date,
      // updated_date: item.updated_date,
    }
  });

  // // Filter data berdasarkan searchValue
  // const filteredData = data?.filter(item =>
  //   item.username?.toLowerCase().includes(searchValue?.toLowerCase()) &&
  //   // conditional rendering if else untuk filterValue
  //   (filterValue === 'active' ? item.status === 'active' : filterValue === 'notActive' ? item.status === 'notActive' : true )
  // );

  // // Sort data berdasarkan sortValue
  // const sortedData = [...filteredData].sort((a, b) => {
  //   if (sortValue === 'aToZ') {
  //     return a.username.localeCompare(b.username);
  //   } else if (sortValue === 'zToA') {
  //     return b.username.localeCompare(a.username);
  //   } else {
  //     return 0;
  //   }
  // });

  // const paginationConfig = {
  //   pageSize: countValue, // Jumlah item per halaman berdasarkan countValue
  //   showTotal: (total, range) => (
  //     <span style={{ color: '#556172' }}>
  //       Page {Math.ceil(range[0] / paginationConfig.pageSize)} of {Math.ceil(total / paginationConfig.pageSize)}
  //     </span>
  //   ),
  //   showLessItems: true,
  // };

  // Search Handler
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  // Filter Handler
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  // Sort Handler
  const [sortValue, setSortValue] = useState("");

  const handleSort = (value) => {
    setSortValue(value);
  };

  // Count Handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };

  const treeData = [
    {
      title: 'Status',
      key: 'status',
    },
    {
      title: 'Username',
      key: 'username',
    },
    {
      title: 'Role',
      key: 'role',
    },
  ];

  const itemsSort = [
    {
      key: 'aToZ',
      label: 'A-Z Username'
    },
    {
      key: 'zToA',
      label: 'Z-A Username'
    },
  ];

  // Sort data berdasarkan sortValue
  const sortedData = [...data].sort((a, b) => {
    if (sortValue === 'aToZ') {
      return a.username.localeCompare(b.username);
    } else if (sortValue === 'zToA') {
      return b.username.localeCompare(a.username);
    } else {
      return 0;
    }
  });

  return (
  <>
      {/* <Row gutter={[16, 8]}>
        <Col xs={24} md={14} lg={8} xl={6} xxl={6}>
          <SearchBox onSearch={handleSearch} /> 
            </Col>
        <Col xs={12} md={10} lg={8} xl={4} xxl={3}>
          <FilterButton onFilter={handleFilter} treeData={treeData} />
        </Col>
        <Col xs={12} md={8} lg={8} xl={4} xxl={3}>
          <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
        </Col>
        <Col xs={8} md={4} lg={12} xl={2} xxl={2}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col xs={16} md={12} lg={12} xl={{span: 4, offset: 4}} xxl={{span: 4, offset: 6}}>
          <Link to='/company/add-company'>
            <AddButton buttonText="Add Company"/> 
          </Link>
        </Col>
      </Row>
      <br /> */}

    <Row gutter="10" justify="start">
      <Col>
        <Input 
        className='search-box'
        prefix={<SearchOutlined/>} 
        placeholder='Search' 
        onSearch={(value)=>{ 
          setSearchText(value)
        }}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        allowClear
        />
      </Col>
      <Col>
        <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
      </Col>
      <Col>
        <CountButton className="count-button" onCount={handleCount} />
      </Col>
      <Col>
        {/* <AddPosition /> */}
      </Col>
    </Row>
    <br />

    <Table 
    columns={columns} 
    // dataSource={data}
    pagination={{
      pageSize: countValue,
    }} 
    // onChange={sortedData} 
    // onChange={sortValue} 
    dataSource={sortedData} 
    loading={loading}
    // pagination={paginationConfig}
    // searchValue={searchValue} 
    // filterValue={filterValue} 
    // countValue={countValue}
    />

    {/* <div>
      <SuccessModal action="Delete"/>
      <FailedModal />
      <SuccessUpdateModal />
    </div> */}
  </>
  )
}

export default UserConfiguration