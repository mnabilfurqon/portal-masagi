import React, { useState, useEffect } from 'react'
import './addUser.css'
import { Form, Input, Radio, Select, Flex, Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import SubmitButton from '../../../../components/common/submitButton/SubmitButton'
import SuccessAddDataModal from '../../../../components/common/successModal/SuccessAddDataModal'
import FailedAddDataModal from '../../../../components/common/failedModal/FailedAddDataModal'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

const AddUser = () => {
    // Declaration
    const token = Cookies.get("token");
    const company = useParams();
    const navigate = useNavigate();
    
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [loading, setLoading] = useState(false);
    
    const [roles, setRoles] = useState();
    const [employee, setEmployee] = useState();
    const [companies, setCompanies] = useState();

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

    // Header 
    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
        getRoles();
        getEmployees();
        getCompanies();
        // console.log("token", token);
        // console.log("company", company);
    }, [token, navigate]);

    // Handle Modal
    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
        navigate("/company");
    };

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
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
            setLoading(true)
            // const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/role/`, {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/role/`, {
                headers: { Authorization: token },
            }
        );
        setRoles(response.data[0].items);
        // console.log("roles", response.data[0].items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    // GET API Employee
    const getEmployees = async () => {
        try {
            setLoading(true)
            // const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/employee/`, {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/employee/`, {
                headers: { Authorization: token },
            }
        );
        setEmployee(response.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    // GET API Company
    const getCompanies = async () => {
        try {
            setLoading(true)
            // const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/company/`, {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/company/`, {
                headers: { Authorization: token },
            }
        );
        setCompanies(response.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    // POST API to Insert New User - Form Handler
    const onFinish = async (values) => {
        try {
            // console.log("values", values);
            // const response = await axios.post("https://attendance-1-r8738834.deta.app/api/v1/users/", values,
            const response = await axios.post("http://127.0.0.1:5000/api/v1/users/", values,
            {
                headers: { Authorization: token, },
            });
            setIsSuccessModalVisible(true);
            console.log("New user added!");
          } catch (error) {
            console.log(error);
            setIsFailedModalVisible(true);
        }
    };

    const onFinishFailed = (error, values) => {
        setIsFailedModalVisible(true);
        console.log('Failed:', error, values);
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
            company_uuid: company.uuid,
          }}
          autoComplete='off'
          onLoadedData={loading}
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
                <Input autoComplete='off' placeholder="Username" />
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
                <Input.Password autoComplete='off' placeholder="Password" />
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
                    <Select.Option key={(role.uuid)} value={(role.uuid)} loading={loading} >{(role.name)}</Select.Option>)
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
            disabled
            rules={[
                {
                required: true,
                message: 'Please select your company!',
                },
            ]}
            >
                <Select disabled>
                  {companies?.map(company => 
                    <Select.Option key={(company.uuid)} value={(company.uuid)} >{(company.company_name)}</Select.Option>)
                  }
                </Select>
            </Form.Item>
            {/* <Form.Item
            label="Employee"
            labelAlign='left'
            name="employee_uuid"
            colon={false}
            disabled
            rules={[
                {
                required: true,
                message: 'Please select your employee!',
                },
            ]}
            >
                <Select>
                  {employee?.map(item => 
                    <Select.Option key={(item.uuid)} value={(item.uuid)} loading={loading} >{(item.name)}</Select.Option>)
                  }
                </Select>
            </Form.Item> */}
            <Flex justify='end' className='action'>
            <Form.Item>
                <Flex gap={10} align='center' justify='end' >
                    <Link to="/user" style={{color:"black"}} >Cancel</Link>
                    <Button key="submit" htmlType='submit' type="none" className="update-button">
                        Save
                    </Button>
                </Flex>
            </Form.Item>
            </Flex>
        </Form>

        <SuccessAddDataModal
            visible={isSuccessModalVisible}
            onClose={handleSuccessModalClose}
            textParagraph="Data upload successful!"
        />

        <FailedAddDataModal
            visible={isFailedModalVisible}
            onClose={handleFailedModalClose}
        />
    </>
    )
}

export default AddUser