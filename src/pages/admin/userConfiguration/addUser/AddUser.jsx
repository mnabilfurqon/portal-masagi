import React, { useState } from 'react'
import './addUser.css'
import { Form, Input, Radio, Select, Flex } from 'antd'
import { Link } from 'react-router-dom'
import SubmitButton from '../../../../components/common/submitButton/SubmitButton'
import SuccessAddDataModal from '../../../../components/common/successModal/SuccessAddDataModal'
import FailedAddDataModal from '../../../../components/common/failedModal/FailedAddDataModal'

const AddUser = () => {
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [form] = Form.useForm();
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

    const [formLayout, setFormLayout] = useState('horizontal');
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

    const [requiredMark, setRequiredMarkType] = useState('optional');
    const customizeRequiredMark = (label, { required }) => (
        <>
            {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
            {label}
        </>
    );

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
          }}
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
                <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
            label="Password"
            name="password"
            colon={false}
            labelAlign='left'
            rules={[
                {
                required: true,
                message: 'Please input your nik!',
                },
            ]}>
                <Input placeholder="Password" />
            </Form.Item>
            <Form.Item 
            label="Role" 
            name="role"
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
                  <Select.Option value="admin">User</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="super admin">Super Admin</Select.Option>
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
                    <Radio value="1">Actice</Radio>
                    <Radio value="0">Not Active</Radio>
                </Radio.Group>
            </Form.Item>
            <Flex justify='end' className='action'>
            <Form.Item>
                <Flex gap={10} align='center' justify='end' >
                    <Link to="/user" style={{color:"black"}} >Cancel</Link>
                    <SubmitButton buttonText={"Save"} />
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