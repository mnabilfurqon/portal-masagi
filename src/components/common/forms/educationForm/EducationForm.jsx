import React, {useState} from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import SubmitButton from '../../buttons/submitButton/SubmitButton';
import './educationForm.css';
import dayjs from 'dayjs';

const EducationForm = ( {onFinish, onFinishFailed, onCancleEditFormButton, editEducationData}) => {
    // Address Input
    const { TextArea } = Input;
    const [form] = Form.useForm();
    // Date Picker
    const dateFormatList = 'YYYY-MM-DD';

    if (editEducationData) {
        form.setFieldsValue({
            education: editEducationData.education,
            institute: editEducationData.institute,
            major: editEducationData.major,
            thesis: editEducationData.thesis,
            ipk: editEducationData.ipk,
            certificate_number: editEducationData.certificate_number,
            entry_year: dayjs(editEducationData.entry_year, dateFormatList),
            out_year: dayjs(editEducationData.out_year, dateFormatList),
        })
    }

    return (
    <>
        <Form
            form={form}
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
            initialValues={{
                entry_year: dayjs('1970-01-01', dateFormatList),
                out_year: dayjs('1970-01-01', dateFormatList),
            }}
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
            name="institute"
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
            label="IPK"
            name="ipk"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your IPK!',
                },
                {
                    pattern: /^[0-9.]+$/,
                    message: 'Please enter a valid contact person (numbers and dot(.) only)!',
                },
            ]}
            >
            <Input placeholder='Enter IPK' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Certificate Number"
            name="certificate_number"
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
            name="entry_year"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your entry year!',
                },
            ]}
            >
            <DatePicker placeholder='YYYY-MM-DD' format={dateFormatList} className='date-picker'/>
            </Form.Item>

            <Form.Item
            label="Out Year"
            name="out_year"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input your out year!',
                },
            ]}
            >
            <DatePicker placeholder='YYYY-MM-DD' format={dateFormatList} className='date-picker'/>
            </Form.Item>

            <Form.Item
            >
            <div className='action-button'>
                <Button type="text" onClick={onCancleEditFormButton}>
                    Cancel
                </Button>
                {editEducationData ? <SubmitButton buttonText="Edit"/> :
                <SubmitButton buttonText="Add"/>
                }
            </div>
            </Form.Item>
        </Form>
    </>
  )
}

export default EducationForm