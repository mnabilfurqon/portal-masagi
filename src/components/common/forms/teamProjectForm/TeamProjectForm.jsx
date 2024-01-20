import React, {useState, useEffect} from 'react';
import { Button, Form, Input, Select } from 'antd';
import SubmitButton from '../../buttons/submitButton/SubmitButton';
import './teamProjectForm.css';
import { Link } from 'react-router-dom';

const TeamProjectForm = ( {onFinish, onFinishFailed, buttonText}) => {
    const [form] = Form.useForm();
    const { Option } = Select;

        return (
            <>
                <Form
                    name="team-project"
                    form={form}
                    className='add-team-project-form'
                    labelCol={{
                    span: 6,
                    className: 'add-team-project-label'
                    }}
                    wrapperCol={{
                    className: 'add-team-project-input'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
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
                            <Option value="mobile_dev_project">Mobile Development Project</Option>
                            <Option value="web_dev_proect">Web Development Project</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                    label="Team Leader"
                    name="team_leader"
                    colon={false}
                    rules={[
                        {
                        required: true,
                        message: 'Please select team leader!',
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

export default TeamProjectForm