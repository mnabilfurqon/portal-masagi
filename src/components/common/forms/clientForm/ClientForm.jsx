import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import SubmitButton from '../../buttons/submitButton/SubmitButton';
import './clientForm.css';
import { Link } from 'react-router-dom';

const ClientForm = ( {onFinish, onFinishFailed, buttonText, editClientData}) => {
    const [form] = Form.useForm();

    // Address Input
    const { TextArea } = Input;

    useEffect(() => {
        if (editClientData) {     
          form.setFieldsValue({
            name: editClientData.name,
            contact_person: editClientData.contact_person,
            contact_person_name: editClientData.contact_person_name,
            email: editClientData.email,
            phone_number: editClientData.phone_number,
            address: editClientData.address
          });
        }
      }, [editClientData, form]);
      
        return (
            <>
                <Form
                    name="client"
                    form={form}
                    className='add-client-form'
                    labelCol={{
                    span: 6,
                    className: 'add-client-label'
                    }}
                    wrapperCol={{
                    className: 'add-client-input'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    label="Client Name"
                    name="name"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please input client name!',
                        },
                    ]}
                    >
                    <Input placeholder='Enter client name' className='input-button'/>
                    </Form.Item>

                    <Form.Item
                    label="Contact Person"
                    name="contact_person"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please input contact person!',
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'Please enter a valid contact person (numbers only)!',
                        },
                    ]}
                    >
                    <Input placeholder='Enter contact person' className='input-button'/>
                    </Form.Item>
        
                    <Form.Item
                    label="Contact Person Name"
                    name="contact_person_name"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please input contact person name!',
                        },
                    ]}
                    >
                    <Input placeholder='Enter client contact person name' className='input-button'/>
                    </Form.Item>

                    <Form.Item
                    label="Email"
                    name="email"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please input email!',
                        },
                        {
                        type: 'email',
                        message: 'Please enter a valid email!',
                        },
                    ]}
                    >
                    <Input placeholder='Enter client email address' className='input-button'/>
                    </Form.Item>

                    <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please input phone number!',
                        },
                        {
                        pattern: /^[0-9]+$/,
                        message: 'Please enter a valid phone number (numbers only)!',
                        },
                    ]}
                    >
                    <Input placeholder='Enter phone number' className='input-button'/>
                    </Form.Item>
        
                    <Form.Item
                    label="Address"
                    name="address"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please input address!',
                        },
                    ]}
                    >
                    <TextArea rows={4} className='input-address' placeholder='Address'/>
                    </Form.Item>
        
                    <Form.Item
                    >
                    <div className='action-button'>
                        <Link to='/client'>
                        <Button type="text">
                            Cancel
                        </Button>
                        </Link>
                        <SubmitButton buttonText={buttonText}/>
                    </div>
                    </Form.Item>
                </Form>
            </>
        );
}

export default ClientForm