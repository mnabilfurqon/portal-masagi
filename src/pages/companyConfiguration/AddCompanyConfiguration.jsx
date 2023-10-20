import React, {useState} from 'react';
import { Button, Form, Input, DatePicker, Radio, Modal } from 'antd';
import './addCompanyConfiguration.css';
import dayjs from 'dayjs';
import SuccessAddDataModal from './successAddDataModal';
import FailedAddDataModal from './FailedAddDataModal';

const AddCompanyConfiguration = () => {
    // Address Input
    const { TextArea } = Input;

    // Date Picker
    const dateFormatList = 'DD/MM/YYYY';

    // Action Button
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

    const onFinish = () => {
        setIsSuccessModalVisible(true);
    };

    const onFinishFailed = () => {
        setIsFailedModalVisible(true);
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };

    // Radio Button
    const [valueRadio, setValue] = useState(1);
    const onRadioChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };

    return (
        <>
        <Form
            name="company"
            className='add-company-form'
            labelCol={{
            span: 5,
            className: 'add-company-label'
            }}
            wrapperCol={{
            span: 9,
            className: 'add-company-input'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Company Name"
            name="companyName"
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
            name="phoneNumber"
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
            name="dateFounded"
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
            name="email"
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
            name="contactPerson"
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
            name="contactName"
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
            name="status"
            colon={false}
            rules={[
                {
                required: true,
                message: 'Please select company status!',
                },
            ]}
            >
            <Radio.Group onChange={onRadioChange} value={valueRadio} className='radio-status'>
                <Radio value={1}>Active</Radio>
                <Radio value={2}>Not Active</Radio>
            </Radio.Group>
            </Form.Item>

            <Form.Item
            wrapperCol={{
            }}
            >
            <div className='action-button'>
                <Button type="text">
                    Cancel
                </Button>
                <Button type="primary" htmlType="submit" className='add-data-button'>
                    Add Data
                </Button>
            </div>
            </Form.Item>

        </Form>

        <SuccessAddDataModal
        visible={isSuccessModalVisible}
        onClose={handleSuccessModalClose}
        />

        <FailedAddDataModal
        visible={isFailedModalVisible}
        onClose={handleFailedModalClose}
        />
        
        </>
    )
}

export default AddCompanyConfiguration;