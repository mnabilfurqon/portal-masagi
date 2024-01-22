import React, {useState} from 'react'
import SearchBox from '@common/SearchBox/SearchBox'
import FilterButton from '@common/buttons/FilterButton/FilterButton'
import SortButton from '@common/buttons/sortButton/SortButton'
import CountButton from '@common/buttons/countButton/CountButton'
import AddButton from '@common/buttons/addButton/AddButton'
import TaskTable from '@common/tables/taskTable/TaskTable'
import { Row, Col, Space, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineFileSearch } from "react-icons/ai";

const TaskMain = () => {
    const navigate = useNavigate();

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

    const treeData = [
        {
          title: 'All Project',
          key: 'all_project',
        },
        {
          title: 'Data Mining',
          key: 'data_mining',
        },
        {
          title: 'Web Development',
          key: 'web_development',
        },
        {
          title: 'Mobile Development',
          key: 'mobile_development',
        },
        {
          title: 'Sistem Internal',
          key: 'sistem_internal',
        }
    ];

    const itemsSort = [
        {
          key: 'aToZProject',
          label: 'A to Z Project Name'
        },
        {
          key: 'zToAProject',
          label: 'Z to A Project Name'
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
                } else if (text === 'in progress') {
                    return (
                        <Button className="in-progress-button" type="primary" size="small" value="in progress" ghost>
                        in progress
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