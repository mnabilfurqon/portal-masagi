import React, {useState} from 'react';
import dayjs from 'dayjs';
import { Button, Form, Input, DatePicker, Radio } from 'antd';
import SubmitButton from '../submitButton/SubmitButton';
import './formTemplate.css';
import { Link } from 'react-router-dom';

const FormTemplate = ( {onFinish, onFinishFailed, buttonText, isSuperAdmin}) => {
    const [form] = Form.useForm();

    // Address Input
    const { TextArea } = Input;

    // Date Picker
    const dateFormatList = 'DD/MM/YYYY';

    // Radio Button
    const [valueRadio, setValue] = useState('active');
    const onRadioChange = (e) => {
        setValue(e.target.value);
    };

  return (
    <>
        <Form
            name="company"
            form={form}
            className='add-company-form'
            labelCol={{
            span: 6,
            className: 'add-company-label'
            }}
            wrapperCol={{
            className: 'add-company-input'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Company Name"
            name="company_name"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your company name!',
                },
            ]}
            >
            <Input placeholder='Enter company name' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Address"
            name="address"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your company address!',
                },
            ]}
            >
            <TextArea rows={4} className='input-address' placeholder='Address'/>
            </Form.Item>

            <Form.Item
            label="Phone Number"
            name="phone_number"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your company phone number!',
                },
            ]}
            >
            <Input placeholder='Enter phone number' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Date Founded "
            name="date_founded"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your company date founded!',
                },
            ]}
            >
            <DatePicker placeholder='DD/MM/YYYY' defaultValue={dayjs('01/01/2015', dateFormatList)} format={dateFormatList} className='date-picker'/>
            </Form.Item>

            <Form.Item
            label="Email"
            name="email_address"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your company email!',
                },
            ]}
            >
            <Input placeholder='Enter company email address' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Website"
            name="website"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your company website!',
                },
            ]}
            >
            <Input placeholder='Enter company website' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Contact Person"
            name="contact_person"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your company contact person!',
                },
            ]}
            >
            <Input placeholder='Enter contact person' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Contact Name"
            name="contact_name"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your company contact name!',
                },
            ]}
            >
            <Input placeholder='Enter contact name' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Status"
            name="is_active"
            colon={false}
            rules={[
                {
                    required: isSuperAdmin,
                    message: 'Please select company status!',
                },
            ]}
            >
                {/* Conditional Rendering Company Status */}
                {isSuperAdmin ? (
                    <Radio.Group onChange={onRadioChange} value={valueRadio} className='radio-status'>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>Not Active</Radio>
                    </Radio.Group>
                ) : (
                    <Input disabled='true' defaultValue="Active" className='input-button'/>
                )}
            </Form.Item>

            <Form.Item
            >
            <div className='action-button'>
                <Link to='/company'>
                <Button type="text">
                    Cancel
                </Button>
                </Link>
                <SubmitButton buttonText={buttonText}/>
            </div>
            </Form.Item>
        </Form>
    </>
  )
}

export default FormTemplate