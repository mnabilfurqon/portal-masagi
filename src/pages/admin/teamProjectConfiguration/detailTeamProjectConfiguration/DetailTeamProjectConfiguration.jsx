import React, {useState} from 'react'
import { Avatar, Space, Divider, Card  } from 'antd';
import TeamMemberTable from '@common/tables/teamMemberTable/TeamMemberTable';
import AddButton from '@common/buttons/addButton/AddButton';
import DeleteModal from '@common/modals/deleteModal/DeleteModal'
import SuccessDeleteModal from '@common/modals/successModal/SuccessDeleteModal'
import { Col, Row, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";

const DetailTeamProjectConfiguration = () => {
    const navigate = useNavigate()
    const { uuid } = useParams()
    const noMarginTop = { marginTop: 0 }
    const noMarginBottom = { marginBottom: 0 }
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSuccessDeleteModalOpen, setIsSuccessDeleteModalOpen] = useState(false);

    const handleAddMemberTeamClick = (uuid) => {
        navigate(`/team-project/add-member-team-project/${uuid}`)
    }

    // delete modal handler
    const handleDeleteButtonDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setIsSuccessDeleteModalOpen(true);
    };

    const handleCancelButtonDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleOkSuccessDeleteModal = () => {
        setIsSuccessDeleteModalOpen(false);
    };

    // end of delete modal handler

    const columns = [
        {
            title: 'Employee',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record) => (
                <Space direction='horizontal' size={16}>
                <Avatar size={64} src={record.avatar} />
                    <Space direction='vertical'>
                        <p style={noMarginBottom}><b>{text}</b></p>
                        <Space direction='horizontal'>
                            <p style={noMarginBottom}>{record.position}</p>
                        </Space>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            ellipsis: true,
            width: 100,
            render: (record) => (
                <Space size="small">
                    <Button className="action-button" type="primary" size="small" onClick={() => isDeleteButtonClicked(record)} ghost>
                        <MdOutlineDelete className="action-icon-delete" />
                    </Button>
                </Space>
            ),
        },
    ];

    const propsTable = {
        columns,
    };

    const isDeleteButtonClicked = (record) => {
        const value = record.key;
        console.log(value);
        setIsDeleteModalOpen(true);
    }
        
    return (
        <>
            <h2 style={noMarginTop}>Mobile Development Project</h2>
            <Space direction='horizontal' size={16}>
                <Avatar size={64} src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
                <Space direction='vertical'>
                    <p style={noMarginBottom}><b>Mikhailo Mudryk</b></p>
                    <Space direction='horizontal'>
                        <p style={noMarginBottom}>Backend</p>
                        <p style={noMarginBottom}> | </p>
                        <p style={noMarginBottom}>Team Leader</p>
                    </Space>
                </Space>
            </Space>
            <Divider />
            <Card
                bordered={false}
                style={{
                    boxShadow: '0px 0px 5px 0px rgba(179, 174, 174, 0.75)',
                }}
            >
                <Row gutter={[16, 8]} style={{marginBottom: 12}}>
                    <Col xs={24} md={14} lg={16} xl={18} xxl={20}>
                        <h2 style={noMarginTop}>Team Member</h2>
                    </Col>
                    <Col xs={24} md={10} lg={8} xl={6} xxl={4}>
                        <AddButton buttonText="Add Team Member" handleClick={() => handleAddMemberTeamClick(uuid)} />
                    </Col>
                </Row>
                <TeamMemberTable {...propsTable} />
                <DeleteModal
                    textModal="Are you sure you want to delete this team member?"
                    visible={isDeleteModalOpen}
                    handleDelete={handleDeleteButtonDeleteModal}
                    handleCancel={handleCancelButtonDeleteModal}
                />
                <SuccessDeleteModal
                visible={isSuccessDeleteModalOpen}
                onClose={handleOkSuccessDeleteModal}
                />
            </Card>
        </>
    )
}

export default DetailTeamProjectConfiguration