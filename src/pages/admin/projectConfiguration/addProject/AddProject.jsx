import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { Button, DatePicker, Flex, Form, Input, Select, Spin } from 'antd'
import SuccessModal from "@common/modals/successModal/SuccessModal"
import FailedModal from "@common/modals/failedModal/FailedModal"

const AddProject = () => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [loading, setLoading] = useState('');
  const [clients, setClients] = useState();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailedModal, setOpenFailedModal] = useState(false);

  // Header 
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getClients();
  }, [token, navigate]);

  // Form Layout
  const formItemLayout =
  formLayout === 'horizontal'
    ? {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 50,
        },
      }
    : null;

  const customizeRequiredMark = (label, { required }) => (
    <>
        {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
        {label}
    </>
  );

  // Success Modal Handler
  const onOkSuccessModal = () => {
    setOpenSuccessModal(false)
    navigate("/project")
  }
  
  const onCancelSuccessModal = () => {
    setOpenSuccessModal(false)
  }

  // Failed Modal Handler
  const onOkFailedModal = () => {
    setOpenSuccessModal(false)
  }
  
  const onCancelFailedModal = () => {
    setOpenSuccessModal(false)
  }

  // GET API Client
  const getClients = async() => {
    try{
        setLoading(true)
        const response = await axios.get("http://103.82.93.38/api/v1/client/", 
        // const response = await axios.get(`http://127.0.0.1:5000/api/v1/client/`,
        {
            headers: { Authorization: token, },
        });
        setClients(response.data.items)
        setLoading(false)
        // console.log("Clients", clients)
    } catch (error) {
        console.log("Error", error)
        setLoading(false)
    }
  }

  // POST API to Insert New User - Form Handler
  const onFinish = async (values) => {
    try {
        setLoading(true)
        console.log(values);
        const response = await axios.post("http://103.82.93.38/api/v1/project/", values, 
        // const response = await axios.post(`http://127.0.0.1:5000/api/v1/project/`, values,
            {
            headers: { Authorization: token, },
        });
        // setOpenSuccessModal(true);
        setLoading(false)
        console.log("New peoject added!");
      } catch (error) {
        console.log(error);
        setLoading(false)
        // setOpenFailedModal(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // setIsFailedModalVisible(true);
    console.log('Failed:', errorInfo);
  };

  return (
    <>
    <Spin spinning={loading}>
      <Form
        form={form}
        name='AddProject'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
        layout={formLayout}
        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
        initialValues={{
            // 
        }}
        autoComplete="off"
      >
        <Form.Item 
          name="client_uuid" 
          label="Client" 
          colon={false} 
          labelAlign='left' 
          rules={[ 
            { required: true, 
              message: 'Please select your client!', },
          ]}
        >
            <Select>
              {clients?.map(client => 
                    <Select.Option key={(client.uuid)} value={(client.uuid)}>{(client.name)}</Select.Option>)
              }
            </Select>
        </Form.Item>
        <Form.Item 
          name="name" 
          label="Project Name"
          colon={false} 
          labelAlign='left' 
          rules={[ 
            { required: true, 
              message: 'Please input your project name!', },
          ]}
        >
          <Input placeholder='Enter Project Name'/>
        </Form.Item>
        <Form.Item 
          name="project_uuid" 
          label="Type Project"
          colon={false} 
          labelAlign='left' 
          rules={[ 
            { required: true, 
              message: 'Please select your project type!', },
          ]}
        >
            <Select>
                <Select.Option>Project type</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item 
          name="start_date" 
          label="Start Date" 
          style={{ width: "100%", }}
          colon={false} 
          labelAlign='left' 
          rules={[ 
            { required: true, 
              message: 'Please input your project start date!', },
          ]}
        >
          <DatePicker placeholder='DD/MM/YYYY'/>
        </Form.Item>
        <Form.Item 
          name="due_date" 
          label="Due Date" 
          style={{ width: "100%", }}
          colon={false} 
          labelAlign='left' 
          rules={[ 
            { required: true, 
              message: 'Please input your project due date!', },
          ]}
        >
          <DatePicker placeholder='DD/MM/YYYY'/>
        </Form.Item>

        <Flex gap={20} align='center' justify='end'>
            <Link to="/project" style={{ color: "black", }}>Cancel</Link>
            <Button htmlType='submit' className='submit-button' style={{ color: "white", }}>Submit</Button>
        </Flex>
      </Form>
      
      <SuccessModal 
        action="Add project" 
        isModalOpen={openSuccessModal} 
        handleOk={onOkSuccessModal} 
        handleCancel={onCancelSuccessModal} 
      />

      <FailedModal 
        isModalOpen={openFailedModal}
        handleOk={onOkFailedModal}
        handleCancel={onCancelFailedModal}
      />
    </Spin>
    </>
  )
}

export default AddProject