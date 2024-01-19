import React, {useState} from 'react'
import { TbClipboardTypography } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { DownOutlined } from '@ant-design/icons';
import { CiPaperplane } from "react-icons/ci";
import { DatePicker, Input, List, Button, Space, Flex, Avatar, Tooltip, Typography, Card, Row, Col, Dropdown, message } from 'antd';
import SuccessAddDataModal from '@common/modals/successModal/SuccessAddDataModal';
import FailedAddDataModal from '@common/modals/failedModal/FailedAddDataModal';
import './taskDetail.css'
import dayjs from 'dayjs';


const TaskDetail = () => {
    const { Paragraph } = Typography;
    const [delegateLabel, setDelegateLabel] = useState('Click to Delegate');
    const [statusLabel, setStatusLabel] = useState(
        <Button className="open-button" type="primary" size="small" value="open" ghost>
            open
        </Button>
    );
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [editableTitleTask, setEditableTitleTask] = useState('Create Register Page');
    const [editableDescription, setEditableDescription] = useState('Lorem ipsum dolor sit amet');

    // handle delegate click
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

        // show message
        message.info(`You have delegated this task to ${delegate.name}`);

    }

    const dataProfile = [
        {
            id: 1,
            name: 'James',
            avatar: 'J'
        },
        {
            id: 2,
            name: 'Michael',
            avatar: 'M'
        },
        {
            id: 3,
            name: 'Santos',
            avatar: 'S'
        },
        {
            id: 4,
            name: 'Andreas',
            avatar: 'A'
        },
        {
            id: 5,
            name: 'Billy',
            avatar: 'B'
        },
        {
            id: 6,
            name: 'Jackson Alvarez',
            avatar: 'J'
        }
    ]

    const itemsDelegate = dataProfile.map((item) => {
        return {
            key: item.id,
            name: item.name,
            avatar: item.avatar,
            label: (
                <Space direction='horizontal' align='center'>
                    <Avatar style={{ backgroundColor: '#17A2B8' }}> {item.avatar} </Avatar>
                    <Space direction='vertical'>
                        <Paragraph style={{marginBottom: 0}}>{item.name}</Paragraph>
                    </Space>
                </Space>
            ),
        };
    });
    // end of handle delegate click

    // handle status click
    const dataStatus = [
        {
            id: 1,
            name: 'cancel',
        },
        {
            id: 2,
            name: 'done',
        },
        {
            id: 3,
            name: 'in progress',
        },
        {
            id: 4,
            name: 'open',
        },
        {
            id: 5,
            name: 'reopen',
        },
        {
            id: 6,
            name: 'review',
        }
    ]

    const itemsStatus = dataStatus.map((item) => {
        return {
            key: item.id,
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
                ) : item.name === 'in progress' ? (
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
    );

    const onClickStatus = ({ key, item }) => {
        // render name and avatar to one object
        const status = {
            name: item.props.name,
        };

        // set delegateLabel to the object
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
                ) : (
                    <Button className="open-button" type="primary" size="small" value="open" ghost>
                        {status.name}
                    </Button>
                )
            ) : 'Open'
        );

        // show message
        message.info(`You have change status this task to ${status.name}`);

    }
    // end of handle status click

    // handle datepicker
    // format deadline DD MMM YYYY at HH:mm
    const format = 'DD MMMM YYYY [at] HH:mm';
    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    };

    const disabledDate = (current) => {
        // Can not select days before today only
        return current && current < dayjs().startOf('day');
    }

    const disabledDateTime = () => {
        // disable time less than now
        return {
            disabledHours: () => range(0, 24).splice(0, dayjs().hour()),
            disabledMinutes: () => range(0, 60).splice(0, dayjs().minute()),
            disabledSeconds: () => range(0, 60).splice(0, dayjs().second()),
        };
    }
    // end of handle datepicker

    // handle update task button
    const handleUpdateTask = () => {
        setIsSuccessModalVisible(true);
    }

    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    }

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
    }
    // end of handle update task button

    // handle comment
    const dataComment = [
        {
            name: 'Jackson Alvarez',
            avatar: 'J',
            comment: 'Lorem ipsum dolor sit amet, ore magna aliqua. Lorem ipsum dolor sit amet, ore magna aliqua. Lorem ipsum dolor sit amet, ore magna aliqua. Lorem ipsum dolor sit amet, ore magna aliqua. Lorem ipsum dolor sit amet, ore magna aliqua.',
            date: '31 December 2020 at 19:00'
        },
        {
            name: 'Michael',
            avatar: 'M',
            comment: 'Lorem ipsum dolor sit amet, ore magna aliqua.',
            date: '31 December 2020 at 19:00'
        },
        {
            name: 'Santos',
            avatar: 'S',
            comment: 'Lorem ipsum dolor sit amet, ore magna aliqua. ',
            date: '31 December 2020 at 19:00'
        },
        {
            name: 'Andreas',
            avatar: 'A',
            comment: 'Lorem ipsum dolor sit amet, ore magna aliqua.',
            date: '31 December 2020 at 19:00'
        }
    ];
    // end of handle comment
    
  return (
    <> 
        <div className='task-title'>
            <Flex gap={12}> 
                <TbClipboardTypography style={{fontSize: 30, color: '#556172'}}/>
                <Paragraph strong={true} style={{ fontSize: 20, color: '#556172'}}>Web Development Project</Paragraph>
            </Flex>
            <Row gutter={[16, 16]} style={{marginLeft: 40}}>
                <Col xs={8} sm={5} md={5} lg={3} xl={3} xxl={2}>
                <Paragraph style={{color: '#888888'}}> Client </Paragraph>
                </Col>
                <Col>
                <Paragraph ellipsis={true}> PT. ABC </Paragraph>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{marginLeft: 40}}>
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
                        <Tooltip title="James" placement="top">
                            <Avatar style={{ backgroundColor: '#17A2B8' }}> J </Avatar>
                        </Tooltip>
                        <Tooltip title="Michael" placement="top">
                            <Avatar style={{ backgroundColor: '#17A2B8' }}> M </Avatar>
                        </Tooltip>
                        <Tooltip title="Santos" placement="top">
                            <Avatar style={{ backgroundColor: '#17A2B8' }}> S </Avatar>
                        </Tooltip>
                        <Tooltip title="Andreas" placement="top">
                            <Avatar style={{ backgroundColor: '#17A2B8' }}> A </Avatar>
                        </Tooltip>
                        <Tooltip title="Billy" placement="top">
                            <Avatar style={{ backgroundColor: '#17A2B8' }}> B </Avatar>
                        </Tooltip>
                        <Tooltip title="Jackson Alvarez" placement="top">
                            <Avatar style={{ backgroundColor: '#17A2B8' }}> J </Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </Space>
                </Col>
            </Row>
        </div>

        <div className='task-body' style={{marginTop: 24}}>
        <Flex gap={12}>  
            <LuClipboardList style={{fontSize: 30, color: '#556172'}}/>
            <Paragraph editable={{onChange: setEditableTitleTask}} strong={true} style={{ fontSize: 20, color: '#556172', width: '100%'}}>{editableTitleTask}</Paragraph>
        </Flex>
        <Row gutter={[16, 16]} style={{marginLeft: 32}}>
            <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={18}>
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
                            <Avatar style={{ backgroundColor: '#17A2B8' }}> J </Avatar>
                            <Space direction='vertical'>
                                <Paragraph style={{marginBottom: 0}}>John Doe</Paragraph>
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
                            <Avatar style={{ backgroundColor: '#17A2B8' }}> J </Avatar>
                            <Space direction='vertical'>
                                <Paragraph style={{marginBottom: 0}}>James</Paragraph>
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
                            <Paragraph editable={{onChange: setEditableDescription, triggerType: 'text'}} style={{marginBottom: 0, width: '100%'}}>{editableDescription}</Paragraph>
                        </Flex>
                    </Card>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={6}>
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
                        <Flex justify='space-between' align='center'>
                            <Paragraph strong={true} style={{color: '#DC3545', marginBottom: 0}}> Deadline </Paragraph>
                            <DatePicker format={format} disabledDate={disabledDate} showTime style={{width: '70%',color: 'red'}}/>
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
                        <Flex justify='space-between' align='center'>
                            <Paragraph strong={true} style={{color: '#28A745', marginBottom: 0}}> Done at </Paragraph>
                            <DatePicker placeholder='31 December 2024 at 19:00' disabled format={format} showTime style={{width: '70%'}}/>
                        </Flex>
                    </Card>
                </Row>
                <Flex justify='flex-end' style={{marginTop: 12}}>
                    <Button type="primary" className='update-task-button' onClick={handleUpdateTask}>
                        Update Task
                    </Button>
                </Flex>
            </Col>
        </Row>

        <SuccessAddDataModal
            visible={isSuccessModalVisible}
            onClose={handleSuccessModalClose}
            textParagraph="Data upload successful!"
        />

        <FailedAddDataModal
            visible={isFailedModalVisible}
            onClose={handleFailedModalClose}
        />
        </div>

        <div className='comment-section' style={{marginTop: 24}}>
        <Flex gap={12}> 
            <FaRegCommentDots style={{fontSize: 30, color: '#556172'}}/>
            <Paragraph strong={true} style={{ fontSize: 20, color: '#556172'}}>Comments</Paragraph>
        </Flex>

        <Flex gap={16} style={{marginLeft: 40}}>
            <Space>
                <Avatar style={{ backgroundColor: '#17A2B8' }}> C </Avatar>
            </Space>
            <Input
                // value={comment}
                // onChange={handleInputChange}
                placeholder='Add a comment...'
                suffix={
                    <CiPaperplane
                    //   onClick={handleCommentSubmit}
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
            style={{marginTop: 24, marginLeft: 40}}
            renderItem={(item, index) => (
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
                description={item.comment}
                />
            </List.Item>
            )}
        />

        </div>
    </>
  )
}

export default TaskDetail