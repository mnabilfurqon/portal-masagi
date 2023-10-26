import React, {useState} from 'react';
import { Button, Form, Input } from 'antd';
import SubmitButton from '../submitButton/SubmitButton';
import './educationForm.css';

const EducationForm = ( {onFinish, onFinishFailed, onCancleEditFormButton}) => {
    // Address Input
    const { TextArea } = Input;

  return (
    <>
        <Form
            name="education"
            className='add-education-form'
            labelCol={{
            span: 6,
            className: 'add-education-label'
            }}
            wrapperCol={{
            className: 'add-education-input'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Education"
            name="education"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your education!',
                },
            ]}
            >
            <Input placeholder='Enter education' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Institution"
            name="institution"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your institution!',
                },
            ]}
            >
            <Input placeholder='Enter Institution' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Major"
            name="major"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your major!',
                },
            ]}
            >
            <Input placeholder='Enter Major' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Thesis"
            name="thesis"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your thesis!',
                },
            ]}
            >
            <TextArea rows={4} className='input-thesis' placeholder='Enter Thesis'/>
            </Form.Item>

            <Form.Item
            label="GPA"
            name="gpa"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your GPA!',
                },
            ]}
            >
            <Input placeholder='Enter GPA' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Certificate Number"
            name="certificateNumber"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your certificate number!',
                },
            ]}
            >
            <Input placeholder='Enter certificate number' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Entry Year"
            name="entryYear"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your entry year!',
                },
            ]}
            >
            <Input placeholder='Enter Year' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Out Year"
            name="outYear"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your out year!',
                },
            ]}
            >
            <Input placeholder='Enter Year' className='input-button'/>
            </Form.Item>

            <Form.Item
            >
            <div className='action-button'>
                <Button type="text" onClick={onCancleEditFormButton}>
                    Cancel
                </Button>
                <SubmitButton buttonText="Save"/>
            </div>
            </Form.Item>
        </Form>
    </>
  )
}

export default EducationForm