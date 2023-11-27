import React, { useState } from 'react'
import './EmployeeEditForm.css'
import { Form, Input, DatePicker, Radio, Select, Flex, Checkbox, Button } from 'antd'
import { Link } from 'react-router-dom'
import SubmitButton from '../submitButton/SubmitButton'
import dayjs from 'dayjs'

const EmployeeEditForm = (props) => {
    const { selectedEmployeeData } = props;

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
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
    const { TextArea } = Input;
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const dateFormatList = 'YYYY-MM-DD';
    const handleEditButton = (e) => {
        setComponentDisabled(e.target.checked);
        setButtonDisabled(true);
    };

    const [requiredMark, setRequiredMarkType] = useState(false);
    const customizeRequiredMark = (label, { required }) => (
        <>
            {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
            {label}
        </>
    );

    if (selectedEmployeeData) {
        form.setFieldsValue({
            nip: selectedEmployeeData.nip,
            nik: selectedEmployeeData.nik,
            name: selectedEmployeeData.name,
            birth_date: dayjs(selectedEmployeeData.birth_date, dateFormatList),
            place_of_birth: selectedEmployeeData.place_of_birth,
            religion: selectedEmployeeData.religion,
            phone_number: selectedEmployeeData.phone_number,
            nationality: selectedEmployeeData.nationality,
            email: selectedEmployeeData.email,
            office_email: selectedEmployeeData.office_email,
            address_1: selectedEmployeeData.address_1,
            address_2: selectedEmployeeData.address_2,
            gender: selectedEmployeeData.gender,
            blood_type: selectedEmployeeData.blood_type,
            marital_status: selectedEmployeeData.marital_status,
            number_of_child: selectedEmployeeData.number_of_child,
            company_id: selectedEmployeeData.company_id,
            role: selectedEmployeeData.role,
            position: selectedEmployeeData.position,
            division: selectedEmployeeData.division,
            bank_name: selectedEmployeeData.bank_name,
            bank_account: selectedEmployeeData.bank_account,
            account_bank_number: selectedEmployeeData.account_bank_number,
            account_holder_name: selectedEmployeeData.account_holder_name,
            salary: selectedEmployeeData.salary,
            no_bpjs_tk: selectedEmployeeData.no_bpjs_tk,
            no_bpjs_kes: selectedEmployeeData.no_bpjs_kes,
            npwp: selectedEmployeeData.npwp,
            registry_number: selectedEmployeeData.registery_number,
            emergency_contact_name: selectedEmployeeData.emergency_contact_name,
            emergency_contact_number: selectedEmployeeData.emergency_contact_number,
            join_date: dayjs(selectedEmployeeData.join_date, dateFormatList),
            separation_date: dayjs(selectedEmployeeData.separation_date, dateFormatList),
            is_active: selectedEmployeeData.is_active ? "1" : "0",
        })
    }

    return (
    <>
        <Form
          form={form}
          name='Employee'
          onFinish={props.onFinish}
          onFinishFailed={props.onFinishFailed}
          {...formItemLayout}
          layout={formLayout}
          initialValues={{
            layout: formLayout,
          }}
          disabled={componentDisabled}
          requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
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
                <TextArea rows={3} className='input-residence'/>
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
                <TextArea rows={3} className='input-id-card-address'/>
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
                      <Select.Option value='it'>IT</Select.Option>
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
                name="account_bank_number"
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
                name="account_holder_name"
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

        <Flex justify='end'>
            <Button
            disabled={buttonDisabled}
            onClick={handleEditButton}
            className='edit-employee-button'>
               Edit Data
            </Button>
        </Flex>
        
    </>
    )
}

export default EmployeeEditForm