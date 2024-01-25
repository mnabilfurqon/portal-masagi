import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import { Button, Form, Input, DatePicker, Select, Spin } from 'antd';
import SubmitButton from '../../buttons/submitButton/SubmitButton';
import './taskForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const TaskForm = ( {onFinish, onFinishFailed, buttonText}) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const token = Cookies.get("token");
    const roleName = decodeURIComponent(Cookies.get("role_name"));
    const navigate = useNavigate();
    const [project, setProject] = React.useState([]);
    const [employee, setEmployee] = React.useState([]);
    const [uuidProject, setUuidProject] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { TextArea } = Input;

    const getProject = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://103.82.93.38/api/v1/project/', {
                headers: {
                    'Authorization': token,
                }
            });
            setProject(response.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getEmployee = async (value) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://103.82.93.38/api/v1/project/${value}`, {
                headers: {
                    'Authorization': token,
                }
            });
            setEmployee(response.data.team.team_members);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);       
        }
    }

    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
        getProject();
    }
    , [token, navigate]);


    // format deadline DD MMM YYYY at HH:mm
    const format = 'DD MMMM YYYY [at] HH:mm';

    const disabledDate = (current) => {
        // Can not select days before today only
        return current && current < dayjs().startOf('day');
    }

    const handleProjectSelected = (value) => {
        setUuidProject(value);
        getEmployee(value);
    }

        return (
            <Spin spinning={loading} size='large' tip="Get Data...">
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
                        <Select placeholder="Please select project name" onSelect={handleProjectSelected} value={uuidProject}>
                            {project.map((item) => (
                                item.team && item.team.team_members.map((member) => (
                                    member.employee.name === Cookies.get('employee_name') ? 
                                        <Option key={item.uuid} value={item.uuid}>{item.name}</Option> : null
                                ))
                            ))}
                        </Select>
                    </Form.Item>

                    {/* conditional if role name is head of division */}

                    {roleName === 'Head of Division' ?
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
                        <Select placeholder="Please select assign to (select project name first)">
                            {employee.map((item) => (
                                <Option key={item.employee.uuid} value={item.employee.uuid}>{item.employee.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    : 

                    <Form.Item
                    label="Assign to"
                    name="assign_to"
                    colon={false}
                    >
                        <Input placeholder={Cookies.get("employee_name")} className='input-button' disabled/>
                    </Form.Item>
                    }

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
                    <DatePicker placeholder='Please select deadline' format={format} disabledDate={disabledDate} showTime className='date-picker'/>
                    </Form.Item>

                    <Form.Item
                    label="Description"
                    name="description"
                    colon={false}
                    >
                    <TextArea rows={4} className='input-description' placeholder='Enter Description'/>
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
            </Spin>
        );
}

export default TaskForm