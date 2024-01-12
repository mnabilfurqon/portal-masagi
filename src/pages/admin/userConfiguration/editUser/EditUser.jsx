import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import "./editUser.css"
import { Button, Modal, Form, Input, Select, Radio } from 'antd'
import { BiEdit } from "react-icons/bi"
import SuccessModal from '@common/modals/successModal/SuccessModal'
import FailedModal from '@common/modals/failedModal/FailedModal'

const editUser = (props) => {
  // Declaration
  const key = props.uuid.key;
  const token = Cookies.get("token");
  const company = Cookies.get("company_uuid");
  const navigate = useNavigate();
  
  const [user, setUser] = useState();
  const [roles, setRoles] = useState();
  const [employees, setEmployees] = useState();
  // const [companies, setCompanies] = useState();
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');

  // Modal Edit Handler
  const showModal = () => {
    setOpen(true);
    form.setFieldsValue({
      username: user.username,
      role_uuid: user.role.uuid,
      is_active: user.is_active,
    })
    console.log("user", user);
    // console.log("key", key);
  };

  // Success Modal Handle
  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
  };
  
  const handleSuccessModalCancel = () => {
    setIsSuccessModalOpen(false);
  };
  
  // Failed Modal Handle
  const handleFailedModalOk = () => {
    setIsFailedModalOpen(false);
  };
  
  const handleFailedModalCancel = () => {
    setIsFailedModalOpen(false);
  };
  
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

  // Modal Handler
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Header
  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   };
  //   // getRoles();
  // }, [token, navigate, showModal]);

  useEffect(() => {
    getUser()
    getRoles()
    getEmployees()
  }, [key]);

  // GET API User by Id
  const getUser = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://103.82.93.38/api/v1/users/${key}`, {
          headers: { Authorization: token },
        }
      );
      setUser(response.data);
      console.log("data user", user);
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

//   // GET API Company
//   const getCompanies = async () => {
//     try {
//         const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/company/`, {
//             headers: { Authorization: token },
//         }
//     );
//     setCompanies(response.data.items);
//     } catch (error) {
//         console.log(error);
//     }
// }

// GET API Employee
const getEmployees = async () => {
    try {
        const response = await axios.get(`http://103.82.93.38/api/v1/employee/`, {
            headers: { Authorization: token },
        }
    );
    setEmployees(response.data.items);
    console.log(response);
    } catch (error) {
        console.log(error);
    }
}

  // PUT API to Update User
  const updateUser = async (values) => {
    try {
      setLoading(true);
      // console.log("values", values);
      const response = await axios.put(`http://103.82.93.38/api/v1/users/${key}`, values,
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setOpen(false);
      setIsSuccessModalOpen(true);
      console.log(response);
    } catch (error) {
      console.log(error);
      setOpen(false);
      setIsFailedModalOpen(true);
    }
  }

  const failedUpdateUser = (error) => {
    console.log(error);
    setOpen(false);
    setIsFailedModalOpen(true);
  };

  return (
    <>
      <Button type="none" style={{margin:0, padding:0}} onClick={showModal}>
        <BiEdit className="edit-icon" size="25" />
      </Button>
      <Modal
        centered
        open={open}
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
            <Input placeholder="Password" />
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
          {/* <Form.Item label="Company" name="company_uuid" >
            <Select disabled>
              {companies?.map(company => 
                <Select.Option key={(company.uuid)} value={(company.uuid)}>{(company.name)}</Select.Option>)
              }
            </Select>
          </Form.Item> */}
          {/* <Form.Item label="Employee" name="employee_uuid" >
            <Select>
              {employees?.map(employee => 
                <Select.Option key={(employee.uuid)} value={(employee.uuid)}>{(employee.name)}</Select.Option>)
              }
            </Select>
          </Form.Item> */}
            
          <div>
            <Button type="primary" htmlType="submit" className='update-button'>
              Update
            </Button>
          </div>
        </Form>
      </Modal>

      <SuccessModal 
      action="Update" 
      handleOk={handleSuccessModalOk} 
      handleCancel={handleSuccessModalCancel} 
      isModalOpen={isSuccessModalOpen} 
      />

      <FailedModal 
      handleOk={handleFailedModalOk} 
      handleCancel={handleFailedModalCancel} 
      isModalOpen={isFailedModalOpen} 
      />
    </>
  );
};
export default editUser;