import React, {useState} from 'react';
import dayjs from 'dayjs';
import { Button, Form, Input, DatePicker } from 'antd';
import SubmitButton from '../submitButton/SubmitButton';
import './familyForm.css';

const FamilyForm = ( {onFinish, onFinishFailed, onCancleEditFormButton}) => {
    // Address Input
    const { TextArea } = Input;

    // Date Picker
    const dateFormatList = 'DD/MM/YYYY';

  return (
    <>
        <Form
            name="family"
            className='add-family-form'
            labelCol={{
            span: 6,
            className: 'add-family-label'
            }}
            wrapperCol={{
            className: 'add-family-input'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Full Name"
            name="fullName"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input fullname!',
                },
            ]}
            >
            <Input placeholder='Enter Full Name' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="NIK"
            name="nik"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input NIK!',
                },
            ]}
            >
            <Input placeholder='Enter NIK' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Birth Date"
            name="birthDate"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input birth date!',
                },
            ]}
            >
            <DatePicker placeholder='DD/MM/YYYY' defaultValue={dayjs('01/01/2015', dateFormatList)} format={dateFormatList} className='date-picker'/>
            </Form.Item>

            <Form.Item
            label="Birth Place"
            name="birthPlace"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input birth place!',
                },
            ]}
            >
            <Input placeholder='Enter Birth Place' className='input-button'/>
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
            <TextArea rows={4} className='input-address' placeholder='Enter Address'/>
            </Form.Item>

            <Form.Item
            label="Relation"
            name="relation"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input relation!',
                },
            ]}
            >
            <Input placeholder='Enter Relation' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Job"
            name="job"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input job!',
                },
            ]}
            >
            <Input placeholder='Enter Job' className='input-button'/>
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

export default FamilyForm