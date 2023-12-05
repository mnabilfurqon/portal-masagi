import React, { useState } from 'react'
import './addEmployee.css'
import { Space, Tabs, Button, Form, Input, DatePicker, Radio, Select, Flex } from 'antd'
import { Link } from 'react-router-dom'
import SubmitButton from '@common/submitButton/SubmitButton'
import SuccessAddDataModal from '@common/successModal/SuccessAddDataModal'
import FailedAddDataModal from '@common/failedModal/FailedAddDataModal'

const AddEmployee = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);const { TextArea } = Input;
    const [requiredMark, setRequiredMarkType] = useState(false);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const onFinish = (values) => {
        setIsSuccessModalVisible(true);
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        setIsFailedModalVisible(true);
        console.log('Failed:', errorInfo);
    };
    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
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

    return (
    <>
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
                    <Input placeholder="Enter NIK" />
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
                    <DatePicker style={{width:"100%"}}/>
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
                    message: 'Please input your gender!',
                    },
                ]}>
                    <Input placeholder="Enter Gender" />
                </Form.Item>
                <Form.Item 
                label="Blood Type" 
                name="blood_type"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your blood type!',
                    },
                ]}>
                    <Input placeholder="Enter Blood Type" />
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
                    message: 'Please input your marital status!',
                    },
                ]}>
                    <Input placeholder="Enter Marital Status" />
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
                    <Input placeholder="Enter Number of Child" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Company ID" 
                name="company_id"
                className='column'>
                    <Input placeholder="Enter Company ID" />
                </Form.Item>
                <Form.Item 
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
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Position" 
                name="position"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your position!',
                    },
                ]}>
                    <Select>
                      <Select.Option value="general manager">General Manager</Select.Option>
                      <Select.Option value="usual employee">Usual Employee</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item 
                label="Division" 
                name="division"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please select your division!',
                    },
                ]}>
                    <Select>
                      <Select.Option value="it">IT</Select.Option>
                      <Select.Option value="marketing">Marketing</Select.Option>
                    </Select>
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
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
                <Form.Item 
                label="Account Bank" 
                name="bank_account"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your account bank!',
                    },
                ]}>
                    <Input placeholder="Enter Account Bank" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Account Name" 
                name="account_name"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your account name!',
                    },
                ]}>
                    <Input placeholder="Enter Account Name" />
                </Form.Item>
                <Form.Item 
                label="Salary" 
                name="salary"
                className='column'>
                    <Input placeholder="Enter Salary" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
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
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
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
                <Form.Item 
                label="Registry Number" 
                name="registry_number"
                className='column'
                rules={[
                    {
                    required: true,
                    message: 'Please input your registry number!',
                    },
                ]}>
                    <Input placeholder="Enter Registry Number" />
                </Form.Item>
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
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
            </Flex>
            <Flex 
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Join Date" 
                name="join_date"
                className='column'>
                    <DatePicker style={{width:"100%"}}/>
                </Form.Item>
                <Form.Item 
                label="Separation Date" 
                name="separation_date"
                className='column'>
                    <DatePicker style={{width:"100%"}}/>
                </Form.Item>
            </Flex>
            <Flex 
            wrap="wrap"
            justify='space-between'
            className='row'>
                <Form.Item 
                label="Status" 
                name="is_active"
                className='column'>
                    <Radio.Group>
                        <Radio value="1">Actice</Radio>
                        <Radio value="0">Not Active</Radio>
                    </Radio.Group>
                </Form.Item>
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

export default AddEmployee