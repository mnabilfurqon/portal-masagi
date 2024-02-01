import React, {useState, useEffect} from 'react'
import SearchBox from '@common/SearchBox/SearchBox'
import FilterRadio from '@common/buttons/filterButton/FilterRadio'
import SortButton from '@common/buttons/sortButton/SortButton'
import CountButton from '@common/buttons/countButton/CountButton'
import AddButton from '@common/buttons/addButton/AddButton'
import TaskTable from '@common/tables/taskTable/TaskTable'
import DeleteModal from '@common/modals/deleteModal/DeleteModal'
import SuccessDeleteModal from '@common/modals/successModal/SuccessDeleteModal'
import { Row, Col, Flex, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiTrash } from 'react-icons/bi';
import axios from 'axios'
import Cookies from 'js-cookie'

const TaskMain = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const roleName = decodeURIComponent(Cookies.get('role_name'));
    const [loading, setLoading] = useState(false);
    const [taskUuid, setTaskUuid] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSuccessDeleteModalOpen, setIsSuccessDeleteModalOpen] = useState(false);
    let urlApi;

    if (roleName !== 'Head of Division') {
        urlApi = 'http://103.82.93.38/api/v1/task/employee'
    } else {
        urlApi = 'http://103.82.93.38/api/v1/task/'
    }

    const getFilterData = async () => {
        try {
            const response = await axios.get(urlApi, {
                headers: {
                    Authorization: token,
                },
            });
            setFilterData(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    const getStatusData = async () => {
        try {
            const response = await axios.get('http://103.82.93.38/api/v1/task_status/', {
                headers: {
                    Authorization: token,
                },
            });
            setStatusData(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async () => {
        try {
            setLoading(true);
            await axios.delete(`http://103.82.93.38/api/v1/task/${taskUuid}`, {
                headers: {
                    Authorization: token,
                },
            });
            setIsSuccessDeleteModalOpen(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } 
        getFilterData();
        getStatusData();
    }, [token, navigate]);

    // search handler
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value) => {
        setSearchValue(value);
    };
    // end of search handler

    // filter handler
    const [filterProjectValue, setFilterProjectValue] = useState("");

    const handleFilterProject = (value) => {
        setFilterProjectValue(value);
    };

    const [filterStatusValue, setFilterStatusValue] = useState("");

    const handleFilterStatus = (value) => {
        setFilterStatusValue(value);
    };
    // end of filter handler

    // sort handler
    const [sortValue, setSortValue] = useState("");

    const handleSort = (value) => {
        setSortValue(value);
    };
    // end of sort handler

    // count handler
    const [countValue, setCountValue] = useState("10");

    const handleCount = (value) => {
        setCountValue(value);
    };
    // end of count handler

    // delete modal handler
    const handleDeleteButtonDeleteModal = () => {
        setIsDeleteModalOpen(false);
        deleteTask();
    };

    const handleCancelButtonDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleOkSuccessDeleteModal = () => {
        setIsSuccessDeleteModalOpen(false);
    };

    // end of delete modal handler

    const uniqueProjectNames = new Set();

    const radioDataProject = filterData.map(item => {
        const projectName = item.project.name;
        if (!uniqueProjectNames.has(projectName)) {
            uniqueProjectNames.add(projectName);
                return {
                    key: item.project.uuid,
                    label: item.project.name,
                }
        }

        return null;
    }).filter(item => item !== null);


    const radioDataStatus = statusData.map(item => {
        return {
            key: item.uuid,
            label: item.name,
        }
    });

    const itemsSort = [
        {
          key: 'aToZTask',
          label: 'A to Z Task Name'
        },
        {
          key: 'zToATask',
          label: 'Z to A Task Name'
        },
    ];

    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            ellipsis: true,
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            ellipsis: true,
        },
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
            ellipsis: true,
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            ellipsis: true,
        },
        {
            title: 'Assign To',
            dataIndex: 'assignTo',
            key: 'assignTo',
            ellipsis: true,
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            render: (text) => {
                if (text === 'cancel') {
                    return (
                        <Button className="cancel-button" type="primary" size="small" value="cancel" ghost>
                        cancel
                        </Button>
                    );
                } else if (text === 'done') {
                    return (
                        <Button className="done-button" type="primary" size="small" value="done" ghost>
                        done
                        </Button>
                    );
                } else if (text === 'review') {
                    return (
                        <Button className="review-button" type="primary" size="small" value="review" ghost>
                        review
                        </Button>
                    );
                } else if (text === 'in-progress') {
                    return (
                        <Button className="in-progress-button" type="primary" size="small" value="in-progress" ghost>
                        in progress
                        </Button>
                    );
                } else if (text === 'reopen') {
                    return (
                        <Button className="reopen-button" type="primary" size="small" value="reopen" ghost>
                        reopen
                        </Button>
                    );
                } else if (text === 'delegate') {
                    return (
                        <Button className="delegate-button" type="primary" size="small" value="delegate" ghost>
                        delegate
                        </Button>
                    );
                } else {
                    return (
                        <Button className="open-button" type="primary" size="small" value="open" ghost>
                        open
                        </Button>
                    );
                }
            },
        },
        {
          title: 'Action',
          key: 'action',
          ellipsis: true,
            render: (record) => (
                <Flex gap={10}>
                    <Button style={{border: 'none'}} type="primary" size="small" ghost onClick={() => handleDetailClick(record)}>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                    {roleName === 'Head of Division' ? (
                    <Button style={{border: 'none'}} type="primary" size="small" onClick={() => handleDeleteClick(record)} ghost>
                        <BiTrash className="action-icon-delete" />
                    </Button>
                    ) : null}
                </Flex>
            ),
        },
    ];

    const handleDetailClick = (record) => {
        const value = record.key;
        navigate(`/task/detail-task/${value}`);
    }

    const handleDeleteClick = (record) => {
        const value = record.key;
        setTaskUuid(value);
        setIsDeleteModalOpen(true);
    }

    const propsTable = {
        searchValue,
        filterProjectValue,
        filterStatusValue,
        sortValue,
        countValue,
        columns,
        urlApi,
        isSuccessDeleteModalOpen,
    };

    return (
        <div>
            <div>
                <Row gutter={[16, 8]}>
                    <Col xs={24} md={24} lg={8} xl={5} xxl={5}>
                        <SearchBox onSearch={handleSearch} placeholder='Search by Task Name' /> 
                    </Col>
                    <Col xs={24} md={12} lg={8} xl={4} xxl={3}>
                        <FilterRadio onFilter={handleFilterProject} radioData={radioDataProject} title='Filter Project' />
                    </Col>
                    <Col xs={24} md={12} lg={8} xl={4} xxl={3}>
                        <FilterRadio onFilter={handleFilterStatus} radioData={radioDataStatus} title='Filter Status' />
                    </Col>
                    <Col xs={24} md={10} lg={8} xl={4} xxl={3}>
                        <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
                    </Col>
                    <Col xs={8} md={4} lg={4} xl={2} xxl={2}>
                        <CountButton className="count-button" onCount={handleCount} />
                    </Col>
                    <Col xs={16} md={10} lg={12} xl={{span: 4, offset: 1}} xxl={{span: 4, offset: 4}}>
                        <Link to='/task/add-task'>
                            <AddButton buttonText="Add Task"/>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: 24}}>
                <TaskTable {...propsTable} />
                <DeleteModal
                    textModal="Are you sure you want to delete this task?"
                    visible={isDeleteModalOpen}
                    loading={loading}
                    handleDelete={handleDeleteButtonDeleteModal}
                    handleCancel={handleCancelButtonDeleteModal}
                />
                <SuccessDeleteModal
                visible={isSuccessDeleteModalOpen}
                onClose={handleOkSuccessDeleteModal}
                />
            </div>
        </div>
    )
}

export default TaskMain