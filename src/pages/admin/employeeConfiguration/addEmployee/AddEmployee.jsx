import React, { useState, useEffect } from 'react'
import './addEmployee.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, message, Upload, Row } from 'antd'
import { Space, Tabs, Button, Form, Input, InputNumber, DatePicker, Radio, Select, Flex, Avatar, Divider } from 'antd'
import SubmitButton from '@common/buttons/submitButton/SubmitButton'
import SuccessModal from '@common/modals/successModal/SuccessModal';
import FailedModal from '@common/modals/failedModal/FailedModal';
import Cookies from 'js-cookie'
import axios from 'axios'
import dayjs from 'dayjs';

const AddEmployee = () => {
    // Declaration
    const token = Cookies.get("token");
    const cookies = Cookies.get();
    const company = Cookies.get("company_uuid");
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');

    const [division, setDivision] = useState([]);
    const [position, setPosition] = useState();
    const [employee, setEmployee] = useState();
    const [companies, setCompanies] = useState();

    const { TextArea } = Input;
    const [requiredMark, setRequiredMarkType] = useState(false);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

    // Success Modal Handle
    const handleSuccessModalOk = () => {
        setIsSuccessModalOpen(false);
        navigate("/employee");
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
  
    // Header 
    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
        getDivision();
        getPosition();
        getCompanies();
        console.log(token)
        console.log(cookies)
        console.log(company)
    }, [token, navigate]);

    // GET API Division
    const getDivision = async () => {
        try {
            // const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/division/`, {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/division/`, {
                headers: { Authorization: token },
            }
        );
        // console.log(response.data);
        setDivision(response.data.items);
        // console.log("division: ", division)
        // console.log("division: ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // GET API Position
    const getPosition = async () => {
        try {
            // const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/position/`, {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/position/`, {
                headers: { Authorization: token },
            }
        );
        setPosition(response.data.items);
        // console.log("position: ", position)
        // console.log("position: ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // GET API Company
    const getCompanies = async () => {
        try {
            // const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/company/`, {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/company/`, {
                headers: { Authorization: token },
            }
        );
        setCompanies(response.data.items);
        // console.log("company: ", company);
        // console.log("company: ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = async (values) => {
        try {
            values.birth_date = dayjs(values.birth_date, "YYYY-MM-DD").format("YYYY-MM-DD");
            values.join_date = dayjs(values.join_date, "YYYY-MM-DD").format("YYYY-MM-DD");
            if (values.separation_date) {
                values.separation_date = dayjs(values.separation_date, "YYYY-MM-DD").format("YYYY-MM-DD");
            } else {
                values.separation_date = values.join_date;
            }
            // const response = await axios.post(`https://attendance-1-r8738834.deta.app/api/v1/employee/`, values, {
            const response = await axios.post(`http://127.0.0.1:5000/api/v1/employee/`, values, {
                headers: { Authorization: token },
            }
        );
        setIsSuccessModalOpen(true);
        // setEmployee(response.data.items);
        // console.log("Employee: ", employee);
        console.log('Success:', values);
        } catch (error) {
            console.log('Failed:', error, values);
            setIsFailedModalOpen(true);
        }
    };

    const onFinishFailed = (errorInfo) => {
        setIsFailedModalOpen(true);
        console.log('Failed:', errorInfo);
    };

    const handleSuccessModalClose = () => {
        navigate("/employee");
        setIsSuccessModalOpen(false);
    };

    const handleFailedModalClose = () => {
        setIsFailedModalOpen(false);
    };

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

    const customizeRequiredMark = (label, { required }) => (
        <>
            {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
            {label}
        </>
    );

    // Avatar
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }  

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8, }} >
                Upload
            </div>
        </div>
    );

    return (
    <>
        <Flex gap={15} align='center'>
            {/* <Avatar size={128} icon={<UserOutlined />} /> */}
            <div>
                {/* <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                >
                    {imageUrl ? (
                        <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                    ) : (
                        uploadButton
                    )}
                </Upload> */}
                <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <div>
                <h2>Full Name</h2>
                <p>Position</p>
            </div>
        </Flex>
        <Divider className='profile-divider'/> <br />

        <Form
          {...formItemLayout}
          form={form}
          name='Employee'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout={formLayout}
          requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
          initialValues={{
            layout: formLayout,
            company_uuid: company,
          }}
        >
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item
                label="NIP"
                name="nip"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your nip!',
                    },
                ]}>
                    <Input placeholder="Enter NIP" />
                </Form.Item>
                <Form.Item
                label="NIK"
                name="nik"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your nik!',
                    },
                ]}>
                    <Input placeholder="Enter NIK" style={{ width:"100%" }}/>
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item
                label="Full Name"
                name="name"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your full name!',
                    },
                ]}>
                    <Input placeholder="Enter Full Name" />
                </Form.Item>
                <Form.Item 
                label="Birth Date" 
                name="birth_date"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your birth date!',
                    },
                ]}>
                    {/* <DatePicker defaultValue={('01/01/2015', dateFormatList[0])} format={dateFormatList}/> */}
                    <DatePicker style={{width:"100%"}} placeholder='YYYY-MM-DD'/>
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item
                label="Birth Place" 
                name="place_of_birth"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your birth place!',
                    },
                ]}>
                    <Input placeholder="Enter Birth Place" />
                </Form.Item>
                <Form.Item
                label="Religion" 
                name="religion"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your religion!',
                    },
                ]}>
                    <Input placeholder="Enter Religion" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Phone Number" 
                name="phone_number"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your phone number!',
                    },
                ]}>
                    <Input placeholder="Enter Phone Number" />
                </Form.Item>
                <Form.Item 
                label="Nationality" 
                name="nationality"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your nationality!',
                    },
                ]}>
                    <Input placeholder="Enter Nationality" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Email" 
                name="email"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your email!',
                    },
                ]}>
                    <Input placeholder="Enter Email" />
                </Form.Item>
                <Form.Item 
                label="Office Email"
                name="office_email"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your office!',
                    },
                ]}>
                    <Input placeholder="Enter Office Email" />
                </Form.Item>
            </Flex>
            <Form.Item
            label="Residence Address"
            name="address_1"
            rules={[
                {
                required: true,
                message: 'Please input your residence address!',
                },
            ]}>
                <TextArea rows={3} />
            </Form.Item>
            <Form.Item 
            label="ID Card Address"
            name="address_2"
            rules={[
                {
                required: true,
                message: 'Please input your id card address!',
                },
            ]}>
                <TextArea rows={3} 
            />
            </Form.Item>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Gender" 
                name="gender"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your gender!',
                    },
                ]}>
                    {/* <Input placeholder="Enter Gender" /> */}
                    <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item 
                label="Blood Type" 
                name="blood_type"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your blood type!',
                    },
                ]}>
                    {/* <Input placeholder="Enter Blood Type" /> */}
                    <Select>
                        <Select.Option value="a">A</Select.Option>
                        <Select.Option value="b">B</Select.Option>
                        <Select.Option value="ab">AB</Select.Option>
                        <Select.Option value="o">O</Select.Option>
                    </Select>
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Marital Status" 
                name="marital_status"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your marital status!',
                    },
                ]}>
                    {/* <Input placeholder="Enter Marital Status" /> */}
                    <Select>
                        <Select.Option value="not married">Not Married</Select.Option>
                        <Select.Option value="married">Married</Select.Option>
                        <Select.Option value="divorce">Divorce</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item 
                label="Number of Child" 
                name="number_of_child"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your number of child!',
                    },
                ]}>
                    <InputNumber placeholder="Enter Number of Child" style={{ width:"100%" }}/>
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Company" 
                name="company_uuid"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your company!',
                    },
                ]}>
                    {/* <Input value={company} disabled/> */}
                    <Select disabled>
                        {companies?.map(item => 
                            <Select.Option key={(item.uuid)} value={(item.uuid)}>{(item.company_name)}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                {/* <Form.Item 
                label="Role" 
                name="role"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your role!',
                    },
                ]}>
                    <Select>
                      <Select.Option value="user">User</Select.Option>
                      <Select.Option value="admin">Admin</Select.Option>
                      <Select.Option value="super admin">Super Admin</Select.Option>
                    </Select>
                </Form.Item> */}
                <Form.Item 
                label="Position" 
                name="position_uuid"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your position!',
                    },
                ]}>
                    <Select>
                        {position?.map(item => 
                            <Select.Option key={item.uuid} value={item.uuid}>{item.name}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Division" 
                name="division_uuid"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your division!',
                    },
                ]}>
                    <Select>
                        {division?.map(item => 
                            <Select.Option key={item.uuid} value={item.uuid}>{item.name}</Select.Option>)
                        }
                        {/* <Select.Option value="it">IT</Select.Option>
                        <Select.Option value="marketing">Marketing</Select.Option> */}
                    </Select>
                </Form.Item>
                <Form.Item 
                label="BANK" 
                name="bank_name"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your bank name!',
                    },
                ]}>
                    <Select>
                      <Select.Option value="bri">BRI</Select.Option>
                      <Select.Option value="bni">BNI</Select.Option>
                    </Select>
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Account Bank" 
                name="account_bank_number"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your account bank number!',
                    },
                ]}>
                    <Input placeholder="Enter Account Bank" />
                </Form.Item>
                <Form.Item 
                label="Account Name" 
                name="account_holder_name"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your account bank name!',
                    },
                ]}>
                    <Input placeholder="Enter Account Name" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Salary" 
                name="salary"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your salary!',
                    },
                ]}>
                    <InputNumber placeholder="Enter Salary" style={{ width:"100%" }}/>
                </Form.Item>
                <Form.Item 
                label="BPJS Ketenagakerjaan Number" 
                name="no_bpjs_tk"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your bpjs ketenagakerjaan number!',
                    },
                ]}>
                    <Input placeholder="Enter BPJS Ketenagakerjaan Number" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="BPJS Kesehatan Number" 
                name="no_bpjs_kes"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your bpjs kesehatan number!',
                    },
                ]}>
                    <Input placeholder="Enter BPJS Kesehatan Number" />
                </Form.Item>
                <Form.Item
                label="NPWP" 
                name="npwp"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your npwp!',
                    },
                ]}>
                    <Input placeholder="Enter NPWP" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Registery Number" 
                name="registery_number"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your registry number!',
                    },
                ]}>
                    <Input placeholder="Enter Registry Number" />
                </Form.Item>
                <Form.Item 
                label="Emergency Contact Name" 
                name="emergency_contact_name"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your emergency contact name!',
                    },
                ]}>
                    <Input placeholder="Enter Emergency Contact Name" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Emergency Contact Number" 
                name="emergency_contact_number"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your emergency contact name!',
                    },
                ]}>
                    <Input placeholder="Enter Emergency Contact Number" />
                </Form.Item>
                <Form.Item 
                label="Join Date" 
                name="join_date"
                className='column'rules={[
                    {
                    required: true,
                    message: 'Please input your join data!',
                    },
                ]}>
                    <DatePicker style={{width:"100%"}} placeholder='YYYY-MM-DD'/>
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Separation Date" 
                name="separation_date"
                className='column'>
                    <DatePicker style={{width:"100%"}} placeholder='YYYY-MM-DD'/>
                </Form.Item>
                <Form.Item 
                label="Status" 
                name="is_active"
                className='column'>
                    <Radio.Group>
                        <Radio value={true}>Actice</Radio>
                        <Radio value={false}>Not Active</Radio>
                    </Radio.Group>
                </Form.Item>
            </Flex>
            <Flex 
            wrap="wrap"
            justify='space-between'
            className='row'>
                {/* <Form.Item label="Avatar" className='column'>
                    Upload
                </Form.Item> */}
            </Flex>
            <Form.Item>
            <Flex gap={30} align='center' justify='end'>
                <Link to="/employee" style={{color:"black"}} >Cancel</Link>
                <SubmitButton buttonText={"Save"} />
            </Flex>
          </Form.Item>
        </Form>

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
    )
}

export default AddEmployee