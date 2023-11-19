import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import "./editUser.css"
import { Button, Modal, Form, Input, Select, Radio } from 'antd'
import { BiEdit } from "react-icons/bi"
import SuccessModal from '../../../../components/common/successModal/SuccessModal'
import FailedModal from '../../../../components/common/failedModal/FailedModal'

const editUser = (props) => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();
  
  const [uuid, setUuid] = useState('');
  const [user, setUser] = useState();
  const [roles, setRoles] = useState();

  const [role, setRole] = useState();
  const [username, setUsername] = useState();
  const [isActive, setIsActive] = useState();
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');

  // Modal Edit Handler
  const showModal = () => {
    setUuid(props.uuid.key);
    console.log("1. update on ", key);
    console.log("2. update on ", uuid);

    setOpen(true);
    getUser();
  };

  const key = props.uuid.key;

  // GET API User by Id
  const getUser = async () => {
    try {
      console.log("uuid: ", key)
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/users/${key}`, {
          headers: { Authorization: token },
        }
      );
      setUsername(response.data.username)
      setIsActive(response.data.is_active)
      setRole(response.data.role_id)
      console.log(username, isActive, role);
      // setUser(response.data);
      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

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
  useEffect(() => {
    if (!token) {
      navigate('/login');
    };
    getRoles();
  }, [token, navigate, showModal]);

  // GET API Roles
  const getRoles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/role/`, {
          headers: { Authorization: token },
        }
      );
      setRoles(response.data[0].items);
    } catch (error) {
      console.log(error);
    }
  }

  // PUT API to Update User
  const updateUser = async (event, values) => {
    try {
      event.preventDefault();
      console.log(values);
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/users/${uuid}`, 
        {
          "username": username,
          "role_id": role,
          "is_active": isActive,
        }, 
        {
          headers: { Authorization: token },
        }
      );
      setOpen(false);
      setIsSuccessModalOpen(true);
      console.log(response);
      // window.location.reload(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
      setIsFailedModalOpen(true);
    }
  }

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

  const handleChangeRole = (value) => {
    console.log("selected ", value);
    setRole(value);
  }

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

  return (
    <>
      <Button type="none" style={{margin:0, padding:0}} onClick={showModal}>
        <BiEdit className="edit-icon" size="25" />
      </Button>
      <Modal
        // centered
        open={open}
        title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Edit User</h2>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="none" loading={loading} onClick={updateUser} className="update-button">
            Update
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Username">
            <Input placeholder={username} value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          {/* <Form.Item label="Password">
            <Input placeholder="Password" value={password} onChange={(e) => setUser.password(e.target.value)} />
          </Form.Item> */}
          <Form.Item label="Role">
            <Select defaultValue={role} value={role} onChange={handleChangeRole}>
              {roles?.map(role => {
                return (
                  <Select.Option key={(role.uuid)} value={(role.id)}>{(role.name)}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Status">
            <Radio.Group value={isActive} onChange={(e) => setIsActive(e.target.value)}>
              <Radio value={true}>Actice</Radio>
              <Radio value={false}>Not Active</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      <SuccessModal action="Update" handleOk={handleSuccessModalOk} handleCancel={handleSuccessModalCancel} isModalOpen={isSuccessModalOpen} />
      <FailedModal handleOk={handleFailedModalOk} handleCancel={handleFailedModalCancel} isModalOpen={isFailedModalOpen} />
    </>
  );
};
export default editUser;