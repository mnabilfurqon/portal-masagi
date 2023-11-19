import React, { useEffect, useState } from 'react'
// import { AudioOutlined } from '@ant-design/icons'
// import { Input } from 'antd'
// import { Button, Dropdown } from 'antd'
// import { InputNumber } from 'antd'
import { Table, Tag, Space, Button } from 'antd'
import './userConfiguration.css'
import EditUser from './editUser/EditUser'
import SuccessModal from '../../../components/common/successModal/SuccessModal'
import FailedModal from '../../../components/common/failedModal/FailedModal'
import { DeleteConfirmationDialog } from '../../../components/common/deleteConfirmation/DeleteConfirmation'
import { SuccessUpdateModal } from '../../../components/common/successModal/SuccessModal'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

const UserConfiguration = ({searchValue, filterValue, sortValue, countValue }) => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const {showModal} = useParams();
  const [isActive, setIsActive] = useState();
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
      const response = await axios.get('http://127.0.0.1:5000/api/v1/users/', {
        headers: {
          Authorization: token,
        }
      });
      setUsers(response.data[0].items);
    } catch (error) {
      console.log(error);
    }
  }

  // Table
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      responsive: ["sm"],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      responsive: ["md"],
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
      // password: item.password,
      status: item.is_active,
      role: item. role_id,
      company: item.company_id,
      created_date: item.created_date,
      updated_date: item.updated_date,
    }
  });

  // Filter data berdasarkan searchValue
  const filteredData = data?.filter(item =>
    item.username?.toLowerCase().includes(searchValue?.toLowerCase()) &&
    // conditional rendering if else untuk filterValue
    (filterValue === 'active' ? item.status === 'active' : filterValue === 'notActive' ? item.status === 'notActive' : true )
  );

  // Sort data berdasarkan sortValue
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortValue === 'aToZ') {
      return a.username.localeCompare(b.username);
    } else if (sortValue === 'zToA') {
      return b.username.localeCompare(a.username);
    } else {
      return 0;
    }
  });

  const paginationConfig = {
    pageSize: countValue, // Jumlah item per halaman berdasarkan countValue
    showTotal: (total, range) => (
      <span style={{ color: '#556172' }}>
        Page {Math.ceil(range[0] / paginationConfig.pageSize)} of {Math.ceil(total / paginationConfig.pageSize)}
      </span>
    ),
    showLessItems: true,
  };

  return (
  <>
    <div>
      <Table 
      columns={columns} 
      // dataSource={data}
      dataSource={sortedData} 
      pagination={paginationConfig}
      />
    </div>

    {/* <div>
      <SuccessModal action="Delete"/>
      <FailedModal />
      <SuccessUpdateModal />
    </div> */}
  </>
  )
}

export default UserConfiguration