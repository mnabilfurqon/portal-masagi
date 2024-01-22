import React, {useState} from 'react'
import SearchBox from '@common/SearchBox/SearchBox'
import FilterButton from '@common/buttons/FilterButton/FilterButton'
import SortButton from '@common/buttons/sortButton/SortButton'
import CountButton from '@common/buttons/countButton/CountButton'
import AddButton from '@common/buttons/addButton/AddButton'
import TeamProjectTable from '@common/tables/teamProjectTable/TeamProjectTable'
import DeleteModal from '@common/modals/deleteModal/DeleteModal'
import SuccessDeleteModal from '@common/modals/successModal/SuccessDeleteModal'
import { Row, Col, Space, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const MainTeamProjectConfiguration = () => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSuccessDeleteModalOpen, setIsSuccessDeleteModalOpen] = useState(false);

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

    const treeData = [
        {
          title: 'Newest',
          key: 'newest',
        },
        {
          title: 'Latest',
          key: 'latest',
        },
    ];

    const itemsSort = [
        {
          key: 'aToZ',
          label: 'A to Z Project Name'
        },
        {
          key: 'zToA',
          label: 'Z to A Project Name'
        },
    ];

    const columns = [
        {
            title: 'Project Name',
            dataIndex: 'project_name',
            key: 'project_name',
            ellipsis: true,
        },
        {
            title: 'Team Leader',
            dataIndex: 'team_leader',
            key: 'team_leader',
            ellipsis: true,
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            ellipsis: true,
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date',
            key: 'due_date',
            ellipsis: true,
        },
        {
          title: 'Action',
          key: 'action',
            render: (record) => (
                <Space size="small">
                    <Button className="action-button" type="primary" size="small" ghost onClick={() => handleDetailClick(record)}>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                    <Button className="action-button" type="primary" size="small" onClick={() => isDeleteButtonClicked(record)} ghost>
                        <MdOutlineDelete className="action-icon-delete" />
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDetailClick = (record) => {
        const value = record.key;
        navigate(`/team-project/detail-team-project/${value}`);
    }

    const isDeleteButtonClicked = (record) => {
        const value = record.key;
        console.log(value);
        setIsDeleteModalOpen(true);
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
                        <Link to='/team-project/add-team-project'>
                            <AddButton buttonText="Add Team Project"/>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: 24}}>
                <TeamProjectTable {...propsTable} />
                <DeleteModal
                    textModal="Are you sure you want to delete this team project?"
                    visible={isDeleteModalOpen}
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

export default MainTeamProjectConfiguration