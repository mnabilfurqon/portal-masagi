import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Radio, Select, Flex, Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import SuccessModal from '@common/modals/successModal/SuccessModal'
import FailedModal from '@common/modals/failedModal/FailedModal'
import Cookies from 'js-cookie'
import axios from 'axios'
import './addUser.css'

const AddUser = () => {
    // Declaration
    const cookies = Cookies.get();
    const token = Cookies.get("token");
    const company = Cookies.get("company_uuid");
    const navigate = useNavigate();
    const employee = useParams();

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [loading, setLoading] = useState(false);
    
    const [roles, setRoles] = useState();
    const [companies, setCompanies] = useState();
    const [employees, setEmployees] = useState();

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

    // Header 
    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
        getRoles();
        getCompanies();
        getEmployees();
    }, [token, navigate]);

    // Handle Modal
    const handleSuccessModalOk = () => {
        setIsSuccessModalOpen(false);
        navigate("/user");
    };

    const handleSuccessModalCancel = () => {
        setIsSuccessModalOpen(false);
        navigate("/user");
    };

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
              span: 5,
            },
            wrapperCol: {
              span: 15,
            },
          }
        : null;

    const customizeRequiredMark = (label, { required }) => (
        <>
            {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
            {label}
        </>
    );

    // GET API Roles
    const getRoles = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://103.82.93.38/api/v1/role/`, {
            // const response = await axios.get(`http://127.0.0.1:5000/api/v1/role/`, {
                headers: { Authorization: token },
            }
        );
        setRoles(response.data[0].items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // GET API Company
    const getCompanies = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://103.82.93.38/api/v1/company/`, {
            // const response = await axios.get(`http://127.0.0.1:5000/api/v1/company/`, {
                headers: { Authorization: token },
            }
        );
        setCompanies(response.data.items);
        // console.log("Companies", companies);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // GET API Employee
    const getEmployees = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://103.82.93.38/api/v1/employee/`, {
            // const response = await axios.get(`http://127.0.0.1:5000/api/v1/employee/`, {
                headers: { Authorization: token },
            }
        );
        setEmployees(response.data.items);
        // console.log("Employees", employees);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // POST API to Insert New User - Form Handler
    const onFinish = async (values) => {
        try {
            // console.log(values);
            // console.log(values.username);
            const response = await axios.post("http://103.82.93.38/api/v1/users/", values, 
            // const response = await axios.post(`http://127.0.0.1:5000/api/v1/users/`, values,
                {
                headers: { Authorization: token, },
            });
            setIsSuccessModalOpen(true);
            console.log("New user added!");
          } catch (error) {
            console.log(error);
            setIsFailedModalOpen(true);
        }
    };

    const onFinishFailed = (errorInfo) => {
        setIsFailedModalOpen(true);
        console.log('Failed:', errorInfo);
    };


    return (
    <>
        <Form
          form={form}
          name='User'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          {...formItemLayout}
          layout={formLayout}
          requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
          initialValues={{
            layout: formLayout,
            company_uuid: company,
            employee_uuid: employee.uuid,
          }}
          autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="username"
            colon={false}
            labelAlign='left'
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}>
                <Input 
                placeholder="Username"
                />
            </Form.Item>
            <Form.Item
            label="Password"
            name="password"
            colon={false}
            labelAlign='left'
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}>
                <Input.Password
                placeholder="Password" 
                />
            </Form.Item>
            <Form.Item 
            label="Role" 
            name="role_uuid"
            colon={false}
            labelAlign='left'
            rules={[
                {
                required: true,
                requiredMark: false,
                message: 'Please select your role!',
                },
            ]}>
                <Select>
                  {roles?.map(role => 
                    <Select.Option key={(role.uuid)} value={(role.uuid)}>{(role.name)}</Select.Option>)
                  }
                </Select>
            </Form.Item>
            <Form.Item 
            label="Status" 
            name="is_active"
            colon={false}
            labelAlign='left'
            rules={[
                {
                required: true,
                message: 'Please select your status!',
                },
            ]}
            >
                <Radio.Group>
                    <Radio value={true}>Actice</Radio>
                    <Radio value={false}>Not Active</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
            label="Company"
            labelAlign='left'
            name="company_uuid"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please select your company!',
                },
            ]}
            >
                <Select disabled>
                  {companies?.map(company => 
                    <Select.Option key={(company.uuid)} value={(company.uuid)}>{(company.company_name)}</Select.Option>)
                  }
                </Select>
            </Form.Item>
            <Form.Item
            label="Employee"
            labelAlign='left'
            name="employee_uuid"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please select your employee!',
                },
            ]}
            >
                <Select disabled>
                  {employees?.map(employee => 
                    <Select.Option key={(employee.uuid)} value={(employee.uuid)}>{(employee.name)}</Select.Option>)
                  }
                </Select>
            </Form.Item>

            <Flex justify='end' className='action'>
            <Form.Item>
                <Flex gap={10} align='center' justify='end' >
                    <Link to="/employee" style={{color:"black"}} >Cancel</Link>
                    {/* <SubmitButton buttonText={"Save"} /> */}
                    <Button key="submit" htmlType='submit' type="none" className="update-button">
                        Save
                    </Button>
                </Flex>
            </Form.Item>
            </Flex>
        </Form>

        <SuccessModal
            action="Delete"
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
    )
}

export default AddUser