import React, {useState, useEffect} from 'react'
import SearchBox from '@common/SearchBox/SearchBox'
import FilterButton from '@common/buttons/FilterButton/FilterButton'
import SortButton from '@common/buttons/sortButton/SortButton'
import CountButton from '@common/buttons/countButton/CountButton'
import AddButton from '@common/buttons/addButton/AddButton'
import TaskTable from '@common/tables/taskTable/TaskTable'
import { Row, Col, Space, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineFileSearch } from "react-icons/ai";
import axios from 'axios'
import Cookies from 'js-cookie'

const TaskMain = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const roleName = decodeURIComponent(Cookies.get('role_name'));
    const [filterData, setFilterData] = useState([]);
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
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setFilterData(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } 
        getFilterData();
    }, [token, navigate]);

    // search handler
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value) => {
        setSearchValue(value);
    };
    // end of search handler

    // filter handler
    const [filterValue, setFilterValue] = useState("");

    const handleFilter = (value) => {
        setFilterValue(value);
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

    const uniqueProjectNames = new Set();

    const treeData = filterData.map(item => {
        const projectName = item.project.name;
        if (!uniqueProjectNames.has(projectName)) {
            uniqueProjectNames.add(projectName);
                return {
                    key: item.project.uuid,
                    title: item.project.name,
                }
        }

        return null;
    }).filter(item => item !== null);

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
            filters: [
                {
                    text: 'Cancel',
                    value: 'cancel',
                },
                {
                    text: 'Done',
                    value: 'done',
                },
                {
                    text: 'Review',
                    value: 'review',
                },
                {
                    text: 'In progress',
                    value: 'in progress',
                },
                {
                    text: 'Open',
                    value: 'open',
                },
                {
                    text: 'Reopen',
                    value: 'reopen',
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
          title: 'Action',
          key: 'action',
          ellipsis: true,
            render: (record) => (
                <Space size="small">
                    <Button className="action-button" type="primary" size="small" ghost onClick={() => handleDetailClick(record)}>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDetailClick = (record) => {
        const value = record.key;
        navigate(`/task/detail-task/${value}`);
    }

    const propsTable = {
        searchValue,
        filterValue,
        sortValue,
        countValue,
        columns,
        urlApi,
    };

    return (
        <div>
            <div>
                <Row gutter={[16, 8]}>
                    <Col xs={24} md={14} lg={8} xl={6} xxl={6}>
                        <SearchBox onSearch={handleSearch} /> 
                    </Col>
                    <Col xs={11} md={10} lg={8} xl={4} xxl={3}>
                        <FilterButton onFilter={handleFilter} treeData={treeData} />
                    </Col>
                    <Col xs={13} md={8} lg={8} xl={6} xxl={3}>
                        <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
                    </Col>
                    <Col xs={8} md={4} lg={12} xl={2} xxl={2}>
                        <CountButton className="count-button" onCount={handleCount} />
                    </Col>
                    <Col xs={16} md={12} lg={12} xl={{span: 4, offset: 2}} xxl={{span: 4, offset: 6}}>
                        <Link to='/task/add-task'>
                            <AddButton buttonText="Add Task"/>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: 24}}>
                <TaskTable {...propsTable} />
            </div>
        </div>
    )
}

export default TaskMain