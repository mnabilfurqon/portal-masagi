import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { TbClipboardTypography } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { DownOutlined } from '@ant-design/icons';
import { CiPaperplane } from "react-icons/ci";
import { DatePicker, Input, List, Button, Space, Flex, Avatar, Tooltip, Typography, Card, Row, Col, Dropdown, message, Spin } from 'antd';
import './taskDetail.css'
import dayjs from 'dayjs';
import axios from 'axios';
import Cookies from 'js-cookie';


const TaskDetail = () => {
    const { Paragraph } = Typography;
    const { uuid } = useParams();
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const employeeName = Cookies.get('employee_name');
    const roleName = decodeURIComponent(Cookies.get('role_name'));
    const [loading, setLoading] = useState(false);
    const [detailTask, setDetailTask] = useState({});
    const [delegateLabel, setDelegateLabel] = useState('Click to Delegate');
    const [statusLabel, setStatusLabel] = useState();
    const [statusData, setStatusData] = useState([]);
    const [deadline, setDeadline] = useState();
    const [doneAt, setDoneAt] = useState();
    const [comment, setComment] = useState('');
    const [commentData, setCommentData] = useState([]);
    const [editableTitleTask, setEditableTitleTask] = useState('Task title');
    const [editableDescription, setEditableDescription] = useState('Enter description here...');

    // call API to get task detail
    const getTaskDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://103.82.93.38/api/v1/task/${uuid}`, {
                headers: {
                    "Authorization": token,
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setDetailTask(response.data);
            setEditableTitleTask(response.data.name);
            setDeadline(dayjs(response.data.deadline).format(format));

            // set delegateLabel to the object
            setDelegateLabel(
                response.data.delegate_to_employee && response.data.delegate_to_employee.name ? (
                    <Space direction='horizontal' align='center'>
                        <Avatar style={{ backgroundColor: '#17A2B8' }}> {response.data.delegate_to_employee.name.charAt(0)} </Avatar>
                        <Space direction='vertical'>
                            <Paragraph style={{marginBottom: 0}}>{response.data.delegate_to_employee.name}</Paragraph>
                        </Space>
                    </Space>
                ) : 'Click to Delegate'
            );

            // if description is null, set description to 'Enter description here...'
            if (response.data.description === null || response.data.description === '') {
                setEditableDescription('Enter description here...');
            } else {
            setEditableDescription(response.data.description);
            }

            // render status to one object
            const status = {
                name: response.data.status && response.data.status.name ? response.data.status.name : 'open',
            };

            // set statusLabel to the object
            setStatusLabel(
                status.name ? (
                    status.name === 'cancel' ? (
                        <Button className="cancel-button" type="primary" size="small" value="cancel" ghost>
                            {status.name}
                        </Button>
                    ) : status.name === 'done' ? (
                        <Button className="done-button" type="primary" size="small" value="done" ghost>
                            {status.name}
                        </Button>
                    ) : status.name === 'in-progress' ? (
                        <Button className="in-progress-button" type="primary" size="small" value="in-progress" ghost>
                            {status.name}
                        </Button>
                    ) : status.name === 'review' ? (
                        <Button className="review-button" type="primary" size="small" value="review" ghost>
                            {status.name}
                        </Button>
                    ) : status.name === 'reopen' ? (
                        <Button className="reopen-button" type="primary" size="small" value="reopen" ghost>
                            {status.name}
                        </Button>
                    ) : status.name === 'delegate' ? (
                        <Button className="delegate-button" type="primary" size="small" value="delegate" ghost>
                            {status.name}
                        </Button>
                    ) : (
                        <Button className="open-button" type="primary" size="small" value="open" ghost>
                            {status.name}
                        </Button>
                    )
                ) : 'Open'
            );

            // set doneAt to the object
            setDoneAt(response.data.done_date ? dayjs(response.data.done_date).format(format) : '');

            setCommentData(response.data.comments);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        getTaskDetail();
        getStatus();
    }, [token, navigate]);

    // handle delegate click
    const delegateTo = async (employeeUuid, nameEmployee) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://103.82.93.38/api/v1/task/delegate`, {
                employee_uuid: employeeUuid,    
                task_uuid: uuid,
            }, {
                headers: {
                    "Authorization": token,
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            console.log(response.data);
            setDetailTask(response.data);
            // set status to delegate if delegate success
            setStatusLabel(
                <Button className="delegate-button" type="primary" size="small" value="delegate" ghost>
                    delegate
                </Button>
            );
            message.success(`You have delegated this task to ${nameEmployee}`);
        } catch (error) {
            console.log(error);
            message.error(`You have failed to delegate this task`);
        } finally {
            setLoading(false);
        }
    }

    const onDelegateClick = ({ key, item }) => {

        // render name and avatar to one object
        const delegate = {
            name: item.props.name,
            avatar: item.props.avatar,
        };

        // set delegateLabel to the object
        setDelegateLabel(
            delegate.name ? (
            <Space direction='horizontal' align='center'>
                <Avatar style={{ backgroundColor: '#17A2B8' }}> {delegate.avatar} </Avatar>
                <Space direction='vertical'>
                    <Paragraph style={{marginBottom: 0}}>{delegate.name}</Paragraph>
                </Space>
            </Space>
            ) : 'Click to Delegate'
        );

        // call delegateTo function
        delegateTo(key, delegate.name);

    }

    const dataProfile = detailTask.project && detailTask.project.team && detailTask.project.team.team_members ? detailTask.project.team.team_members.map((item) => {
        return {
            uuid: item.employee.uuid,
            name: item.employee.name,
            avatar: item.employee.name.charAt(0),
            role: item.role_project.name,
        };
    }) : null;

    const itemsDelegate = dataProfile && dataProfile.map((item) => {
        if (item.uuid !== detailTask.asign_to_employee.uuid && item.uuid !== detailTask.created_by_employee.uuid) {
            return {
                key: item.uuid,
                name: item.name,
                avatar: item.avatar,
                label: (
                    <Space direction='horizontal' align='center'>
                        <Avatar style={{ backgroundColor: '#17A2B8' }}> {item.avatar} </Avatar>
                        <Space direction='vertical'>
                            <Paragraph style={{marginBottom: 0}}>{item.name}</Paragraph>
                            <Paragraph style={{marginBottom: 0, marginTop: 0, color: '#cccccc'}}>{item.role}</Paragraph>
                        </Space>
                    </Space>
                ),
            };
        } else {
            return null;
        }
    });
    // end of handle delegate click

    // handle status click
    const getStatus = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://103.82.93.38/api/v1/task_status/`, {
                headers: {
                    "Authorization": token,
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setStatusData(response.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const statusChange = async (statusUuid) => {
        try {
            setLoading(true);
            const response = await axios.patch(`http://103.82.93.38/api/v1/task/${uuid}`, {
                status_uuid: statusUuid,
            }, {
                headers: {
                    "Authorization": token,
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setDetailTask(response.data);
            setStatusLabel(
                response.data.status && response.data.status.name ? (
                    response.data.status.name === 'cancel' ? (
                        <Button className="cancel-button" type="primary" size="small" value="cancel" ghost>
                            {response.data.status.name}
                        </Button>
                    ) : response.data.status.name === 'done' ? (
                        <Button className="done-button" type="primary" size="small" value="done" ghost>
                            {response.data.status.name}
                        </Button>
                    ) : response.data.status.name === 'in-progress' ? (
                        <Button className="in-progress-button" type="primary" size="small" value="in-progress" ghost>
                            {response.data.status.name}
                        </Button>
                    ) : response.data.status.name === 'review' ? (
                        <Button className="review-button" type="primary" size="small" value="review" ghost>
                            {response.data.status.name}
                        </Button>
                    ) : response.data.status.name === 'reopen' ? (
                        <Button className="reopen-button" type="primary" size="small" value="reopen" ghost>
                            {response.data.status.name}
                        </Button>
                    ) : response.data.status.name === 'delegate' ? (
                        <Button className="delegate-button" type="primary" size="small" value="delegate" ghost>
                            {response.data.status.name}
                        </Button>
                    ) : (
                        <Button className="open-button" type="primary" size="small" value="open" ghost>
                            {response.data.status.name}
                        </Button>
                    )
                ) : 'Open'
            );

            // set doneAt to the object if status is done
            setDoneAt(response.data.status && response.data.status.name === 'done' ? dayjs(response.data.done_date).format(format) : '');

            message.success(`You have change status this task to ${response.data.status.name}`);
        } catch (error) {
            console.log(error);
            message.error(`You have failed to change status this task`);
        } finally {
            setLoading(false);
        }
    }

    const itemsStatus = statusData.map((item) => {
        if (roleName === 'Head of Division') {
            return {
                key: item.uuid,
                name: item.name,
                label: (
                    item.name === 'cancel' ? (
                        <Button className="cancel-button" type="primary" size="small" value="cancel" ghost>
                            {item.name}
                        </Button>
                    ) : item.name === 'done' ? (
                        <Button className="done-button" type="primary" size="small" value="done" ghost>
                            {item.name}
                        </Button>
                    ) : item.name === 'in-progress' ? (
                        <Button className="in-progress-button" type="primary" size="small" value="in-progress" ghost>
                            {item.name}
                        </Button>
                    ) : item.name === 'review' ? (
                        <Button className="review-button" type="primary" size="small" value="review" ghost>
                            {item.name}
                        </Button>
                    ) : item.name === 'reopen' ? (
                        <Button className="reopen-button" type="primary" size="small" value="reopen" ghost>
                            {item.name}
                        </Button>
                    ) : item.name === 'delegate' ? (
                        <Button className="delegate-button" type="primary" size="small" value="delegate" ghost>
                            {item.name}
                        </Button>
                    ) : (
                        <Button className="open-button" type="primary" size="small" value="open" ghost>
                            {item.name}
                        </Button>
                    )
                ),
            };
        } else {
            if (item.name === 'cancel' || item.name === 'done' || item.name === 'delegate') {
                return null;
            }
            return {
                key: item.uuid,
                name: item.name,
                label: (
                    item.name === 'in-progress' ? (
                        <Button className="in-progress-button" type="primary" size="small" value="in-progress" ghost>
                            {item.name}
                        </Button>
                    ) : item.name === 'review' ? (
                        <Button className="review-button" type="primary" size="small" value="review" ghost>
                            {item.name}
                        </Button>
                    ) : item.name === 'reopen' ? (
                        <Button className="reopen-button" type="primary" size="small" value="reopen" ghost>
                            {item.name}
                        </Button>
                    ) : (
                        <Button className="open-button" type="primary" size="small" value="open" ghost>
                            {item.name}
                        </Button>
                    )
                ),
            };
        }
        }
    );

    const onClickStatus = ({ key, item }) => {

        // render status to one object
        const status = {
            name: item.props.name,
        };

        // set statusLabel to the object
        setStatusLabel(
            status.name ? (
                status.name === 'cancel' ? (
                    <Button className="cancel-button" type="primary" size="small" value="cancel" ghost>
                        {status.name}
                    </Button>
                ) : status.name === 'done' ? (
                    <Button className="done-button" type="primary" size="small" value="done" ghost>
                        {status.name}
                    </Button>
                ) : status.name === 'in progress' ? (
                    <Button className="in-progress-button" type="primary" size="small" value="in-progress" ghost>
                        {status.name}
                    </Button>
                ) : status.name === 'review' ? (
                    <Button className="review-button" type="primary" size="small" value="review" ghost>
                        {status.name}
                    </Button>
                ) : status.name === 'reopen' ? (
                    <Button className="reopen-button" type="primary" size="small" value="reopen" ghost>
                        {status.name}
                    </Button>
                ) : status.name === 'delegate' ? (
                    <Button className="delegate-button" type="primary" size="small" value="delegate" ghost>
                        {status.name}
                    </Button>
                ) : (
                    <Button className="open-button" type="primary" size="small" value="open" ghost>
                        {status.name}
                    </Button>
                )
            ) : 'Open'
        );

        // call statusChange function
        statusChange(key);

    }
    // end of handle status click

    // handle deadline
    const format = 'DD MMMM YYYY [at] HH:mm';
    const postFormat = 'YYYY-MM-DD HH:mm:ss';

    const disabledDate = (current) => {
        // Can not select days before today only
        return current && current < dayjs().startOf('day');
    }

    const deadlineChange = async (deadline) => {
        try {
            setLoading(true);
            const response = await axios.patch(`http://103.82.93.38/api/v1/task/${uuid}`, {
                deadline: deadline,
            }, {
                headers: {
                    "Authorization": token,
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setDetailTask(response.data);
            setDeadline(dayjs(response.data.deadline).format(format));
            message.success(`You have change deadline this task to ${dayjs(response.data.deadline).format(format)}`);
        } catch (error) {
            console.log(error);
            message.error(`You have failed to change deadline this task`);
        } finally {
            setLoading(false);
        }
    }

    const handleDeadlineChange = (value) => {
        // format post deadline
        const deadline = dayjs(value).format(postFormat);
        deadlineChange(deadline);
    }
    // end of handle deadline

    // handle title task change
    const titleTaskChange = async (title) => {
        try {
            setLoading(true);
            const response = await axios.patch(`http://103.82.93.38/api/v1/task/${uuid}`, {
                name: title,
            }, {
                headers: {
                    "Authorization": token,
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setDetailTask(response.data);
            setEditableTitleTask(response.data.name);
            message.success(`You have change title this task to ${response.data.name}`);
        } catch (error) {
            console.log(error);
            message.error(`You have failed to change title this task`);
        } finally {
            setLoading(false);
        }
    }

    const handleTitleTaskChange = (value) => {
        titleTaskChange(value);
    }
    // end of handle title task change

    // handle description task change
    const descriptionTaskChange = async (description) => {
        try {
            setLoading(true);
            const response = await axios.patch(`http://103.82.93.38/api/v1/task/${uuid}`, {
                description: description,
            }, {
                headers: {
                    "Authorization": token,
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setDetailTask(response.data);
            setEditableDescription(response.data.description);
            message.success('You have success to change description this task');
        } catch (error) {
            console.log(error);
            message.error('You have failed to change description this task');
        } finally {
            setLoading(false);
        }
    }

    const handleDescriptionTaskChange = (value) => {
        descriptionTaskChange(value);
    }
    // end of handle description task change

    // handle comment input
    const dataComment = commentData.map((item) => {
        return {
            key: item.uuid,
            name: item.employee.name,
            avatar: item.employee.name.charAt(0),
            text: item.text,
            date: dayjs(item.created_date).format(format),
        };
    });

    const handleCommentInput = (e) => {
        setComment(e.target.value);
    }

    const commentSubmit = async (comment) => {
        try {
            setLoading(true);
            await axios.post(`http://103.82.93.38/api/v1/task/add_comment`, {
                task_uuid: uuid,
                text: comment,
            }, {
                headers: {
                    "Authorization": token,
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setComment('');
            getTaskDetail();
            message.success('You have success to submit comment');
        } catch (error) {
            console.log(error);
            message.error('You have failed to submit comment');
        } finally {
            setLoading(false);
        }
    }

    const handleCommentSubmit = () => {
        if (comment === '') {
            message.error('Comment cannot be empty');
            return;
        }
        commentSubmit(comment);
    }
    // end of handle comment input
    
  return (
    <Spin spinning={loading} size='large' tip="Sync Data...">
        <div className='task-title'>
            <Flex gap={12}> 
                <TbClipboardTypography style={{fontSize: 30, color: '#556172'}}/>
                <Paragraph strong={true} style={{ fontSize: 20, color: '#556172'}}>
                    {detailTask.project && detailTask.project.name ? detailTask.project.name : 'Project Name'}
                </Paragraph>
            </Flex>
            <Row gutter={[16, 16]} style={{marginLeft: 32}}>
                <Col xs={8} sm={5} md={5} lg={3} xl={3} xxl={2}>
                <Paragraph style={{color: '#888888'}}> Client </Paragraph>
                </Col>
                <Col>
                <Paragraph ellipsis={true}>
                    {detailTask.project && detailTask.project.client && detailTask.project.client.name ? detailTask.project.client.name : '-'}
                </Paragraph>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{marginLeft: 32}}>
                <Col xs={8} sm={5} md={5} lg={3} xl={3} xxl={2}>
                <Paragraph style={{color: '#888888'}}> Members </Paragraph>
                </Col>
                <Col>
                <Space>
                    <Avatar.Group
                        maxCount={5}
                        maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                      }}
                    >
                        {/* get data from detailTask.project.team.team_members[i].employee.name */}
                        {detailTask.project && detailTask.project.team && detailTask.project.team.team_members ? detailTask.project.team.team_members.map((item) => {
                            return (
                                // title is item.employee.name + item.role_project.name
                                <Tooltip key={item.employee.uuid} title={item.employee.name + ' - ' + item.role_project.name} placement="top">
                                    <Avatar style={{ backgroundColor: '#17A2B8' }}> {item.employee.name.charAt(0)} </Avatar>
                                </Tooltip>
                            )
                        }) : (
                            <Tooltip title="James" placement="top">
                                <Avatar style={{ backgroundColor: '#17A2B8' }}> J </Avatar>
                            </Tooltip>
                        )}
                    </Avatar.Group>
                </Space>
                </Col>
            </Row>
        </div>

        <div className='task-body' style={{marginTop: 24}}>
        <Flex gap={12}>  
            <LuClipboardList style={{fontSize: 30, color: '#556172'}}/>
            <Paragraph editable={{onChange: handleTitleTaskChange}} strong={true} style={{ fontSize: 20, color: '#556172', width: '100%'}}>{editableTitleTask}</Paragraph>
        </Flex>
        <Row gutter={[16, 16]} style={{marginLeft: 32}}>
            <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={16}>
                <Row gutter={[12, { xs: 8, sm: 16, md: 12, lg: 12 }]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                    <Card
                        bordered={false} 
                        style={
                            { width: '100%',
                            height: '100%',
                            marginRight: 12,
                            boxShadow: '0px 0px 5px 0px rgba(179, 174, 174, 0.75)',
                            padding: 0 }
                        }
                    >
                        <Paragraph style={{color: '#888888', marginBottom: 12}}> Assign To </Paragraph>
                        <Space direction='horizontal' align='center'>
                            <Avatar style={{ backgroundColor: '#17A2B8' }}>
                                {detailTask.asign_to_employee && detailTask.asign_to_employee.name ? detailTask.asign_to_employee.name.charAt(0) : 'X'}
                            </Avatar>
                            <Space direction='vertical'>
                                <Paragraph style={{marginBottom: 0}}>
                                    {detailTask.asign_to_employee && detailTask.asign_to_employee.name ? detailTask.asign_to_employee.name : 'John Doe'}
                                </Paragraph>
                            </Space>
                        </Space>
                    </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                    <Card
                        bordered={false} 
                        style={
                            { width: '100%',
                            height: '100%',
                            marginRight: 12,
                            boxShadow: '0px 0px 5px 0px rgba(179, 174, 174, 0.75)',
                            padding: 0 }
                        }
                    >
                        <Paragraph style={{color: '#888888', marginBottom: 12}}> Created By </Paragraph>
                        <Space direction='horizontal' align='center'>
                            <Avatar style={{ backgroundColor: '#17A2B8' }}>
                                {detailTask.created_by_employee && detailTask.created_by_employee.name ? detailTask.created_by_employee.name.charAt(0) : 'X'}
                            </Avatar>
                            <Space direction='vertical'>
                                <Paragraph style={{marginBottom: 0}}>
                                    {detailTask.created_by_employee && detailTask.created_by_employee.name ? detailTask.created_by_employee.name : 'John Doe'}
                                </Paragraph>
                            </Space>
                        </Space>
                    </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                    <Card
                        bordered={false} 
                        style={
                            { width: '100%',
                            height: '100%',
                            marginRight: 12,
                            boxShadow: '0px 0px 5px 0px rgba(179, 174, 174, 0.75)',
                            padding: 0 }
                        }
                    >
                        <Paragraph style={{color: '#888888', marginBottom: 12}}> Delegate To </Paragraph>
                        <Dropdown
                            menu={{
                            items: itemsDelegate,
                            onClick: onDelegateClick,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {delegateLabel}
                                <DownOutlined />
                            </Space>
                            </a>
                        </Dropdown>
                    </Card>
                    </Col>
                </Row>
                <Row>
                    <Card
                        bordered={false} 
                        style={
                            { width: '100%',
                            marginTop: 12,
                            boxShadow: '0px 0px 5px 0px rgba(179, 174, 174, 0.75)',
                            padding: 0 }
                        }
                    >
                        <Paragraph style={{color: '#888888', marginBottom: 12}}> Description </Paragraph>
                        <Flex>
                            <Paragraph editable={{onChange: handleDescriptionTaskChange}} style={{marginBottom: 0, width: '100%'}}>{editableDescription}</Paragraph>
                        </Flex>
                    </Card>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={8}>
                <Row>
                    <Card
                        bordered={false} 
                        style={
                            { width: '100%',
                            boxShadow: '0px 0px 5px 0px rgba(179, 174, 174, 0.75)',
                            padding: 0 }
                        }
                    >
                        <Flex justify='space-between'>
                            <Paragraph style={{color: '#888888', marginBottom: 0}}> Status </Paragraph>
                            <Dropdown
                                menu={{
                                items: itemsStatus,
                                onClick: onClickStatus,
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {statusLabel}
                                    <DownOutlined />
                                </Space>
                                </a>
                            </Dropdown>
                        </Flex>
                    </Card>
                </Row>
                <Row style={{marginTop: 12}}>
                    <Card
                        bordered={false} 
                        style={
                            { width: '100%',
                            boxShadow: '0px 0px 5px 0px rgba(179, 174, 174, 0.75)',
                            padding: 0 }
                        }
                    >
                        <Flex wrap='wrap' justify='space-between' gap={'small'} align='center'>
                            <Flex align='center' style={{ height: '100%' }}>
                                <Paragraph strong={true} style={{color: '#DC3545', marginBottom: 0}}> Deadline </Paragraph>
                            </Flex>
                            <Flex align='center' style={{ height: '100%' }}>
                                <DatePicker 
                                    className='custom-placeholder-datepicker' 
                                    placeholder={deadline} 
                                    disabledDate={disabledDate} 
                                    format={format} 
                                    showTime
                                    allowClear={false}
                                    onChange={handleDeadlineChange}
                                />
                            </Flex>
                        </Flex>
                    </Card>
                </Row>
                <Row style={{marginTop: 12}}>
                    <Card
                        bordered={false} 
                        style={
                            { width: '100%',
                            boxShadow: '0px 0px 5px 0px rgba(179, 174, 174, 0.75)',
                            padding: 0 }
                        }
                    >
                        <Flex wrap='wrap' justify='space-between' gap={'small'} align='center'>
                            <Flex align='center' style={{ height: '100%' }}>
                                <Paragraph strong={true} style={{color: '#28A745', marginBottom: 0}}> Done at </Paragraph>
                            </Flex>
                            <Flex align='center' style={{ height: '100%' }}>
                                <DatePicker 
                                    className='custom-done-date-placeholder-datepicker'
                                    placeholder={doneAt} 
                                    disabled 
                                    format={format} 
                                    showTime 
                                    style={{width: '100%'}}
                                />
                            </Flex>
                        </Flex>
                    </Card>
                </Row>
            </Col>
        </Row>
        </div>

        <div className='comment-section' style={{marginTop: 24}}>
        <Flex gap={12}> 
            <FaRegCommentDots style={{fontSize: 30, color: '#556172'}}/>
            <Paragraph strong={true} style={{ fontSize: 20, color: '#556172'}}>Comments</Paragraph>
        </Flex>

        <Flex gap={16} style={{marginLeft: 40}}>
            <Space>
                <Avatar style={{ backgroundColor: '#17A2B8' }}> {employeeName.charAt(0)} </Avatar>
            </Space>
            <Input
                value={comment}
                onChange={handleCommentInput}
                onPressEnter={handleCommentSubmit}
                placeholder='Add a comment...'
                suffix={
                    <CiPaperplane
                    onClick={handleCommentSubmit}
                    style={{ cursor: 'pointer', color: '#888888', fontSize: 25 }}
                    onMouseOver={(e) => (e.target.style.color = '#629093')}
                    onMouseOut={(e) => (e.target.style.color = '#888888')}
                    />
                }
            />
        </Flex>

        <List
            itemLayout="horizontal"
            dataSource={dataComment}
            locale={{ emptyText: 'No comments yet' }}
            style={{marginTop: 24, marginLeft: 40}}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                avatar={
                <Avatar style={{ backgroundColor: '#17A2B8' }}> {item.avatar} </Avatar>}
                title={
                    <Flex justify='space-between' align='center'>
                        <Paragraph style={{marginBottom: 0}}>{item.name}</Paragraph>
                        <Paragraph style={{marginBottom: 0, fontSize: 10, color: '#cccccc'}}>{item.date}</Paragraph>
                    </Flex>
                }
                description={item.text}
                />
            </List.Item>
            )}
        />

        </div>
    </Spin>
  )
}

export default TaskDetail