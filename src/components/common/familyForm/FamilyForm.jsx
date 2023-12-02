import React, {useState} from 'react';
import dayjs from 'dayjs';
import { Button, Form, Input, DatePicker } from 'antd';
import SubmitButton from '../submitButton/SubmitButton';
import './familyForm.css';

const FamilyForm = ( {onFinish, onFinishFailed, onCancleEditFormButton, editFamilyData}) => {
    // Address Input
    const { TextArea } = Input;
    const [form] = Form.useForm();

    // Date Picker
    const dateFormatList = 'YYYY-MM-DD';

    if (editFamilyData) {
        form.setFieldsValue({
            full_name: editFamilyData.full_name,
            nik: editFamilyData.nik,
            birth_date: dayjs(editFamilyData.birth_date, dateFormatList),
            birth_place: editFamilyData.birth_place,
            address: editFamilyData.address,
            relation: editFamilyData.relation,
            job: editFamilyData.job,
        })
    }

  return (
    <>
        <Form
            form={form}
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
            initialValues={{
                birth_date: dayjs('1970-01-01', dateFormatList),
            }}
        >
            <Form.Item
            label="Full Name"
            name="full_name"
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
                {
                    pattern: /^[0-9]+$/,
                    message: 'Please enter a valid contact person (numbers and dot(.) only)!',
                },
            ]}
            >
            <Input placeholder='Enter NIK' className='input-button'/>
            </Form.Item>

            <Form.Item
            label="Birth Date"
            name="birth_date"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please input birth date!',
                },
            ]}
            >
            <DatePicker placeholder='YYYY-MM-DD' format={dateFormatList} className='date-picker'/>
            </Form.Item>

            <Form.Item
            label="Birth Place"
            name="birth_place"
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
                {editFamilyData ? <SubmitButton buttonText="Edit"/> :
                <SubmitButton buttonText="Add"/>
                }
            </div>
            </Form.Item>
        </Form>
    </>
  )
}

export default FamilyForm