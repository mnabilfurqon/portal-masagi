import React from 'react';
import dayjs from 'dayjs';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import SubmitButton from '../../buttons/submitButton/SubmitButton';
import './teamMemberForm.css';
import { Link } from 'react-router-dom';

const TeamMemberForm = ( {onFinish, onFinishFailed, buttonText}) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    // Address Input
    const { TextArea } = Input;

    // Date Picker
    const dateFormatList = 'DD/MM/YYYY';

        return (
            <>
                <Form
                    name="team-member"
                    form={form}
                    className='add-team-member-form'
                    labelCol={{
                    span: 6,
                    className: 'add-team-member-label'
                    }}
                    wrapperCol={{
                    className: 'add-team-member-input'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{
                        date_founded: dayjs('01/01/2024', dateFormatList)
                    }}
                >
                    <Form.Item
                    label="Client"
                    name="client"
                    colon={false}
                    >
                    <Input disabled placeholder='PT. Mitra Solusi Aktual Integrasi' className='input-button'/>
                    </Form.Item>

                    <Form.Item
                    label="Project Name"
                    name="project_name"
                    colon={false}
                    >
                    <Input disabled placeholder='Mobile Development Project' className='input-button'/>
                    </Form.Item>
        
                    <Form.Item
                    label="Description"
                    name="description"
                    colon={false}
                    >
                    <TextArea disabled rows={4} className='input-description' placeholder='Lorem Ipsum dolor sit amet'/>
                    </Form.Item>

                    <Form.Item
                    label="Start Date"
                    name="start_date"
                    colon={false}
                    >
                    <DatePicker disabled placeholder='01/01/2024' format={dateFormatList} className='date-picker'/>
                    </Form.Item>

                    <Form.Item
                    label="Due Date"
                    name="due_date"
                    colon={false}
                    >
                    <DatePicker disabled placeholder='01/02/2024' format={dateFormatList} className='date-picker'/>
                    </Form.Item>
        
                    <Form.Item
                    label="Team Leader"
                    name="team_leader"
                    colon={false}
                    >
                    <Input disabled placeholder='Chamber' className='input-button'/>
                    </Form.Item>
        
                    <Form.Item
                    label="Team Member"
                    name="team_member"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please select team member!',
                        },
                    ]}
                    >
                        <Select placeholder="Please select team leader">
                            <Option value="eden_hazard">Eden Hazard</Option>
                            <Option value="frank_lampard">Frank Lampard</Option>
                            <Option value="didier_drogba">Didier Drogba</Option>
                            <Option value="john_terry">John Terry</Option>
                            <Option value="diego_costa">Diego Costa</Option>
                            <Option value="petr_cech">Petr Cech</Option>                          
                        </Select>
                    </Form.Item>

                    <Form.Item
                    label="Role Project"
                    name="role_project"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please select role project!',
                        },
                    ]}
                    >
                        <Select placeholder="Please select role project">
                            <Option value="backend">Backend</Option>
                            <Option value="frontend">Frontend</Option>
                            <Option value="ui_ux">UI/UX Designer</Option>                       
                        </Select>
                    </Form.Item>
        
                    <Form.Item
                    >
                    <div className='action-button'>
                        <Link to='/team-project'>
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

export default TeamMemberForm