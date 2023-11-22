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
    const [users, setUsers] = useState([]);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState(true);
    // const [company, setCompany] = useState("");
    // const company_uuid = Cookies.get("company_uuid");

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

    // Header 
    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
        getRoles();
        console.log(token)
        console.log(company)
        // setCompany(company_uuid)
        // console.log(company)
    }, [token, navigate]);

    // Handle Modal
    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
        navigate("/user");
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
            const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/role/`, {
                headers: { Authorization: token },
            }
        );
        setRoles(response.data[0].items);
        } catch (error) {
            console.log(error);
        }
    }

    // GET API Company
    const getCompany = async () => {
        try {
            const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/company/`, {
                headers: { Authorization: token },
            }
        );
        setCompany(response.data[0].items);
        } catch (error) {
            console.log(error);
        }
    }

    // POST API to Insert New User - Form Handler
    const onFinish = async (values) => {
        try {
            console.log(values);
            // console.log(values.username);
            const response = await axios.post("https://attendance-1-r8738834.deta.app/api/v1/users/", {
                'username': values.username,
                'password': values.password,
                'role_uuid': values.role_uuid,
                'is_active': values.is_active,
                'company_uuid': company.uuid,
            }, 
            {
                headers: { Authorization: token, },
            });
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setIsSuccessModalVisible(true);
                console.log("New user added!");
                // window.location.reload(false);
            }, 3000);
          } catch (error) {
            console.log(error);
            setIsFailedModalVisible(true);
        }
    };

    const onFinishFailed = (errorInfo) => {
        setIsFailedModalVisible(true);
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
            // username: username,
            // password: password,
            // is_active: status,
            // role_id: role,
          }}
          autoComplete='off'
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
            disabled
            >
                <Input value={company.uuid} disabled bordered={true} />
            </Form.Item>
            <Flex justify='end' className='action'>
            <Form.Item>
                <Flex gap={10} align='center' justify='end' >
                    <Link to="/user" style={{color:"black"}} >Cancel</Link>
                    {/* <SubmitButton buttonText={"Save"} /> */}
                    <Button key="submit" htmlType='submit' type="none" onClick={onFinish} className="update-button">
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