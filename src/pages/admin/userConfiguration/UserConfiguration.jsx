import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Table, Form, Space, Button, Row, Col, Input, Modal, Select, Radio } from 'antd'
import SuccessModal from '@common/modals/successModal/SuccessModal'
import FailedModal from '@common/modals/failedModal/FailedModal'
import FilterButton from '@common/buttons/filterButton/FilterButton'
import FilterDropdown from '@common/buttons/filterButton/FilterDropdown'
import SortButton from '@common/buttons/sortButton/SortButton'
import CountButton from '@common/buttons/countButton/CountButton'
import Cookies from 'js-cookie'
import axios from 'axios'
import './userConfiguration.css'

const UserConfiguration = () => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [uuid, setUuid] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failedModalOpen, setFailedModalOpen] = useState(false);

  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getUsersData();
  }, [token, navigate, successModalOpen]);

  // API GET Users Data
  const getUsersData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://103.82.93.38/api/v1/users/', {
        headers: { Authorization: token, }
      });
      setUsers(response.data[0].items);
      // console.log(response.data[0]);
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
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      // responsive: ["sm"],
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      // responsive: ["md"],
      filteredValue: [filterByStatus],
      onFilter: (value, record) => {
        return String(record.status).toLowerCase().includes(value.toLowerCase());
      },
      render: (record) => {
        if (record === "active") {
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
          <Button type="none" style={{margin:0, padding:0}} onClick={() => handleOpenEditModal(record)}>
            <BiEdit className="edit-icon" size="25" />
          </Button>
        </Space>
      ),
    },
  ];

  const data = users?.map(item => {
    return {
      key: item.uuid,
      username: item.username,
      status: (item.is_active ? "active" : "not"),
      role: item.role.name,
      role_uuid: item.role.uuid,
    }
  });

  // Filter Handler
  const handleFilter = (e) => {
    const value = e.key;
    setFilterByStatus(value);
  };

  const status = [
    {
      key: "active",
      label: "Active",
    },
    {
      key: "not",
      label: "Not Active",
    },
  ]

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

  // Edit Modal Handler
  const handleOpenEditModal = (record) => {
    // console.log(record);
    form.setFieldsValue({
      username: record.username,
      role_uuid: record.role_uuid,
      is_active: (record.status === "active" ? true : false),
    })
    const uuid = record.key;
    setUuid(uuid);
    setIsEditModalOpen(true);
  };
  
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditModalOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };
  
  const failedUpdateUser = (error) => {
    console.log(error);
    setIsEditModalOpen(false);
    setFailedModalOpen(true);
  };

  const handleSuccessModalOk = () => {
    setSuccessModalOpen(false)
    form.setFieldsValue({ password: "" })
  }

  const handleSuccessModalCancel = () => {
    setSuccessModalOpen(false)
    form.setFieldsValue({ password: "" })
  }

  const handleFailedModalOk = () => {
    setFailedModalOpen(false)
  }

  const handleFailedModalCancel = () => {
    setFailedModalOpen(false)
  }

  // PUT API to Update User
  const updateUser = async (values) => {
    try {
      setLoading(true);
      // console.log("values", values);
      // console.log("form", form.getFieldsValue());
      const response = await axios.put(`http://103.82.93.38/api/v1/users/${uuid}`, values,
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setIsEditModalOpen(false);
      setSuccessModalOpen(true);
      console.log("User updated!");
      // console.log(response);
    } catch (error) {
      console.log(error);
      setIsEditModalOpen(false);
      setFailedModalOpen(true);
    }
  }

  // Edit Modal //
  const [user, setUser] = useState();
  const [roles, setRoles] = useState();
  const [employees, setEmployees] = useState();
  const [formLayout, setFormLayout] = useState('vertical');

  // Form Layout
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
      
  useEffect(() => {
    getUser()
    getRoles()
    getEmployees()
  }, [uuid]);

  // GET API User by Id
  const getUser = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://103.82.93.38/api/v1/users/${uuid}`, {
          headers: { Authorization: token },
        }
      );
      setUser(response.data);
      // console.log("data user", user);
      // console.log("data respons", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  // GET API Roles
  const getRoles = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://103.82.93.38/api/v1/role/`, {
          headers: { Authorization: token },
        }
      );
      setRoles(response.data[0].items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  // GET API Employee
  const getEmployees = async () => {
    try {
        const response = await axios.get(`http://103.82.93.38/api/v1/employee/`, {
            headers: { Authorization: token },
        }
    );
    setEmployees(response.data.items);
    } catch (error) {
        console.log(error);
    }
  }
  
  return (
  <>
    <Row gutter={[10, 10]} justify="start">
      <Col xs={24} md={10} lg={8}>
        <Input 
        className='search-box'
        prefix={<IoIosSearch />} 
        placeholder='Search'
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        allowClear
        />
      </Col>
      <Col xs={8} md={5} lg={4}>
        <FilterDropdown items={status} text="Filter "className="sort-button" onClick={handleFilter}/>
      </Col>
      <Col xs={8} md={5} lg={4}>
        <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
      </Col>
      <Col xs={8} md={4} lg={3}>
        <CountButton className="count-button" onCount={handleCount} />
      </Col>
    </Row>
    <br />

    <Table 
      columns={columns} 
      pagination={{ pageSize: countValue, }} 
      scroll={ { x: 200 } }
      dataSource={sortedData} 
      loading={loading}
    />

    {/* Edit Modal */}
    <Modal
        centered
        open={isEditModalOpen}
        title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Edit User</h2>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={ <div></div> }
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          name='editUser'
          onFinish={updateUser}
          onFinishFailed={failedUpdateUser}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Username" name="username">
            <Input placeholder="Username"/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item label="Role" name="role_uuid">
            <Select>
              {roles?.map(role => {
                return (
                  <Select.Option key={(role.uuid)} value={(role.uuid)} loading={loading}>{(role.name)}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="is_active">
            <Radio.Group>
              <Radio value={true}>Actice</Radio>
              <Radio value={false}>Not Active</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item label="Employee" name="employee_uuid" >
            <Select>
              {employees?.map(employee => 
                <Select.Option key={(employee.uuid)} value={(employee.uuid)}>{(employee.name)}</Select.Option>)
              }
            </Select>
          </Form.Item> */}
            
          <div>
            <Button type="primary" htmlType="submit" className='add-button' loading={loading}>
              Update
            </Button>
          </div>
        </Form>
      </Modal>

    <SuccessModal 
      action="Update" 
      handleOk={handleSuccessModalOk} 
      handleCancel={handleSuccessModalCancel} 
      isModalOpen={successModalOpen} 
    />

    <FailedModal 
      handleOk={handleFailedModalOk} 
      handleCancel={handleFailedModalCancel} 
      isModalOpen={failedModalOpen} 
    />
  </>
  )
}

export default UserConfiguration
