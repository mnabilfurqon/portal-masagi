import React from 'react';
import dayjs from 'dayjs';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import SubmitButton from '../../buttons/submitButton/SubmitButton';
import './taskForm.css';
import { Link } from 'react-router-dom';

const TaskForm = ( {onFinish, onFinishFailed, buttonText}) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    // Address Input
    const { TextArea } = Input;

    // Date Picker
    const dateFormatList = 'DD/MM/YYYY';

        return (
            <>
                <Form
                    name="task"
                    form={form}
                    className='add-task-form'
                    labelCol={{
                    span: 6,
                    className: 'add-task-label'
                    }}
                    wrapperCol={{
                    className: 'add-task-input'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{
                        date_founded: dayjs('01/01/2024', dateFormatList)
                    }}
                >
                    <Form.Item
                    label="Task"
                    name="task"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please input task name!',
                        },
                    ]}
                    >
                    <Input placeholder='Enter Name Task' className='input-button'/>
                    </Form.Item>

                    <Form.Item
                    label="Project Name"
                    name="project_name"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please select project name!',
                        },
                    ]}
                    >
                        <Select placeholder="Please select project name">
                            <Option value="mobile_dev">Mobile Development</Option>
                            <Option value="web_dev">Web Development</Option>
                            <Option value="maintenance_web">Maintenance Web</Option>
                            <Option value="sistem_internal">Sistem Internal</Option>                       
                        </Select>
                    </Form.Item>

                    <Form.Item
                    label="Assign to"
                    name="assign_to"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please select assign to!',
                        },
                    ]}
                    >
                        <Select placeholder="Please select assign to">
                            <Option value="eden_hazard">Eden Hazard</Option>
                            <Option value="frank_lampard">Frank Lampard</Option>
                            <Option value="didier_drogba">Didier Drogba</Option>
                            <Option value="john_terry">John Terry</Option>
                            <Option value="diego_costa">Diego Costa</Option>
                            <Option value="petr_cech">Petr Cech</Option>                       
                        </Select>
                    </Form.Item>

                    <Form.Item
                    label="Status"
                    name="status"
                    colon={false}
                    >
                    <Input disabled placeholder='Open' className='input-button'/>
                    </Form.Item>

                    <Form.Item
                    label="Deadline"
                    name="deadline"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please select deadline!',
                        },
                    ]}
                    >
                    <DatePicker placeholder='01/01/2024' format={dateFormatList} className='date-picker'/>
                    </Form.Item>

                    <Form.Item
                    label="Created by"
                    name="created_by"
                    colon={false}
                    >
                    <Input disabled placeholder='Chamber' className='input-button'/>
                    </Form.Item>
        
                    <Form.Item
                    >
                    <div className='action-button'>
                        <Link to='/task'>
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

export default TaskForm