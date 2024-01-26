import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { Button, DatePicker, Flex, Form, Input, Select, Spin } from 'antd'
import SuccessModal from "@common/modals/successModal/SuccessModal"
import FailedModal from "@common/modals/failedModal/FailedModal"

const EditProject = () => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const {uuid} = useParams();

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState();
  const [statuses, setStatuses] = useState();
  const [typeProjects, setTypeProjects] = useState();
  const [project, setProject] = useState({});
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailedModal, setOpenFailedModal] = useState(false);
  const { TextArea } = Input;

  // Header 
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getClients();
    getProject();
    getStatus();
    getTypeProjects();
  }, [token, navigate]);

  // Form Layout
  const formItemLayout =
  formLayout === 'horizontal'
    ? {
        labelCol: {
          span: 6,
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

  const disableDate = (current) => {
    return current && current < dayjs().endOf('day');
  }

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
    setOpenFailedModal(false)
  }
  
  const onCancelFailedModal = () => {
    setOpenFailedModal(false)
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

  // GET API Type Project
  const getTypeProjects = async() => {
    try{
        setLoading(true)
        const response = await axios.get("http://103.82.93.38/api/v1/type_project/", 
        // const response = await axios.get(`http://127.0.0.1:5000/api/v1/type_project/`,
        {
            headers: { Authorization: token, },
        });
        setTypeProjects(response.data.items)
        setLoading(false)
        // console.log("Type projects", typeProjects)
    } catch (error) {
        console.log("Error", error)
        setLoading(false)
    }
  }

  // GET API Status
  const getStatus = async() => {
    try{
        setLoading(true)
        const response = await axios.get(`http://103.82.93.38/api/v1/project_status/`, 
        // const response = await axios.get(`http://127.0.0.1:5000/api/v1/type_project/`,
        {
            headers: { Authorization: token, },
        });
        setStatuses(response.data.items)
        setLoading(false)
        // console.log("Statuses", statuses)
    } catch (error) {
        console.log("Error", error)
        setLoading(false)
    }
  }

  // GET API Detail Project
  const getProject = async() => {
    try{
        setLoading(true)
        const response = await axios.get(`http://103.82.93.38/api/v1/project/${uuid}`, 
        // const response = await axios.get(`http://127.0.0.1:5000/api/v1/project/${uuid}`,
        {
            headers: { Authorization: token, },
        });
        setProject(response.data)
        setLoading(false)
        // console.log("Project", project)

        form.setFieldsValue({
          name: response.data.name,
          client_uuid: response.data.client.uuid,
          status_uuid: response.data.status.uuid,
          type_uuid: response.data.type.uuid,
          description: response.data.description,
          start_date: dayjs(response.data.start_date),
          due_date: dayjs(response.data.due_date),
          done_at: ((response.data.done_at) ? dayjs(response.data.done_at) : ""),
          cancel_at: ((response.data.cancel_at) ? dayjs(response.data.cancel_at) : ""),
        })
        // console.log(form.getFieldsValue())
    } catch (error) {
        console.log("Error", error)
        setLoading(false)
    }
  }

  // PUT API to Update Project - Form Handler
  const onFinish = async (values) => {
    try {
        setLoading(true)
        values.due_date = dayjs(values.due_date).format("YYYY-MM-DD");
        values.start_date = dayjs(values.start_date).format("YYYY-MM-DD");
        // values.done_at = ((values.done_at) ? dayjs(values.done_at).format("YYYY-MM-DD") : "");
        // values.cancel_at = ((values.cancel_at) ? dayjs(values.cancel_at).format("YYYY-MM-DD") : "");
        console.log(values);
        const response = await axios.put(`http://103.82.93.38/api/v1/project/${uuid}`, values, 
        // const response = await axios.put(`http://127.0.0.1:5000/api/v1/project/${uuid}`, values,
        {
            headers: { Authorization: token, },
        });
        setOpenSuccessModal(true);
        setLoading(false)
        console.log("Project updates!");
        console.log("Response", response);
      } catch (error) {
        setLoading(false)
        setOpenFailedModal(true);
        console.log('Failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setOpenFailedModal(true);
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
          name="description" 
          label="Description"
          colon={false} 
          labelAlign='left' 
          rules={[ 
            { required: true, 
              message: 'Please input your project name!', },
          ]}
        >
          <TextArea rows={3} placeholder='Enter Description'/>
        </Form.Item>
        <Form.Item 
          name="type_uuid" 
          label="Type Project"
          colon={false} 
          labelAlign='left' 
          rules={[ 
            { required: true, 
              message: 'Please select your project type!', },
          ]}
        >
            <Select>
              {typeProjects?.map(item => 
                <Select.Option key={(item.uuid)} value={(item.uuid)}>{(item.name)}</Select.Option>)
              }
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
          <DatePicker placeholder='DD/MM/YYYY' format="DD/MM/YYYY"/>
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
          <DatePicker placeholder='DD/MM/YYYY' format="DD/MM/YYYY" disabledDate={disableDate}
          // defaultValue={dayjs(project.due_date, "YYYY/MM/DD HH:mm:ss").format("DD/MM/YYYY")}
          />
        </Form.Item>
        <Form.Item 
          name="status_uuid" 
          label="Status"
          colon={false} 
          labelAlign='left'
        >
            <Select>
              {statuses?.map(status => 
                <Select.Option key={(status.uuid)} value={(status.uuid)}>{(status.name)}</Select.Option>)
              }
            </Select>
        </Form.Item>
        <Form.Item 
          // name="cancel_at" 
          label="Cancel Date" 
          style={{ width: "100%", }}
          colon={false} 
          labelAlign='left'
        >
          <DatePicker placeholder='DD/MM/YYYY' disabled/>
        </Form.Item>
        <Form.Item 
          // name="done_at" 
          label="Done Date" 
          style={{ width: "100%", }}
          colon={false} 
          labelAlign='left' 
        >
          <DatePicker placeholder='DD/MM/YYYY' disabled/>
        </Form.Item>

        <Flex gap={20} align='center' justify='end'>
            <Link to={-1} style={{ color: "black", }}>Cancel</Link>
            <Button htmlType='submit' className='submit-button' style={{ color: "white", }} loading={loading}>Save</Button>
        </Flex>
      </Form>
      
      <SuccessModal 
        action="Edit project" 
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

export default EditProject