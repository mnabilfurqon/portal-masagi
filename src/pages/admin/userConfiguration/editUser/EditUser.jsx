import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import "./editUser.css"
import { Button, Modal, Form, Input, Select, Radio } from 'antd'
import { BiEdit } from "react-icons/bi"
import SuccessModal from '../../../../components/common/successModal/SuccessModal'
import FailedModal from '../../../../components/common/failedModal/FailedModal'
import SubmitButton from '../../../../components/common/submitButton/SubmitButton'

const editUser = (props) => {
  // Declaration
  const token = Cookies.get("token");
  const company_uuid = Cookies.get("company_uuid");
  const navigate = useNavigate();
  
  const [uuid, setUuid] = useState('');
  const [user, setUser] = useState();
  const [roles, setRoles] = useState();

  const [role, setRole] = useState();
  const [username, setUsername] = useState();
  const [isActive, setIsActive] = useState(true);
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');

  // Modal Edit Handler
  const showModal = () => {
    setOpen(true);
    getUser();

    form.setFieldsValue({
      username: user.username,
      password: user.password,
      role_uuid: user.role.uuid,
      is_active: user.is_active,
    })

    console.log("key", key);
  };

  const key = props.uuid.key;
  useEffect(() => {
    getUser()
  }, [key]);

  // GET API User by Id
  const getUser = async () => {
    try {
      // console.log("uuid: ", key)
      // console.log("company_uuid: ", company_uuid)
      setLoading(true)
      const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/users/${key}`, {
          headers: { Authorization: token },
        }
      );
      // setUsername(response.data.username)
      // setIsActive(response.data.is_active)
      // setRole(response.data.role_id)
      // console.log(username, isActive, role);
      setUser(response.data);
      console.log("data user", user);
      // console.log("data respons", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
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
      setLoading(true)
      const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/role/`, {
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

  // PUT API to Update User
  const updateUser = async ( values) => {
    try {
      // event.preventDefault();
      console.log("values ", values);
      // console.log("Updated data ", values.username, values.role.uuid, values.is_active);
      const response = await axios.put(`https://attendance-1-r8738834.deta.app/api/v1/users/${key}`, values,
        // {
        //   "username": username,
        //   "role_uuid": role,
        //   "is_active": isActive,
        //   "company_uuid": company_uuid,
        // }, 
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
        // footer={[
        //   <Button key="submit" type="none" loading={loading} htmlType='submit' className="update-button">
        //     Update
        //   </Button>,
        // ]}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          name='editUser'
          onFinish={updateUser}
          // onFinishFailed={}
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
            <Radio.Group value={isActive} onChange={(e) => setIsActive(e.target.value)}>
              <Radio value={true}>Actice</Radio>
              <Radio value={false}>Not Active</Radio>
            </Radio.Group>
          </Form.Item>
          <div>
            <SubmitButton buttonText="Update"/>
          </div>
        </Form>
      </Modal>

      <SuccessModal action="Update" handleOk={handleSuccessModalOk} handleCancel={handleSuccessModalCancel} isModalOpen={isSuccessModalOpen} />
      <FailedModal handleOk={handleFailedModalOk} handleCancel={handleFailedModalCancel} isModalOpen={isFailedModalOpen} />
    </>
  );
};
export default editUser;