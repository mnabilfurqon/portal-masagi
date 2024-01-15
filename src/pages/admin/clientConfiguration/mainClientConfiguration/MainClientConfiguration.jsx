import React, {useState} from 'react'
import SearchBox from '@common/SearchBox/SearchBox'
import FilterButton from '@common/buttons/FilterButton/FilterButton'
import SortButton from '@common/buttons/sortButton/SortButton'
import CountButton from '@common/buttons/countButton/CountButton'
import AddButton from '@common/buttons/addButton/AddButton'
import ClientTable from '@common/tables/clientTable/ClientTable'
import { Row, Col, Space, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineFileSearch } from "react-icons/ai";

const MainClientConfiguration = () => {
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
          label: 'A to Z Client Name'
        },
        {
          key: 'zToA',
          label: 'Z to A Client Name'
        },
    ];

    const columns = [
        {
            title: 'Client Name',
            dataIndex: 'client_name',
            key: 'client_name',
            ellipsis: true,
        },
        {
            title: 'Contact Person',
            dataIndex: 'contact_person',
            key: 'contact_person',
            ellipsis: true,
        },
        {
            title: 'Contact Person Name',
            dataIndex: 'contact_person_name',
            key: 'contact_person_name',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
                </Space>
            ),
        },
    ];

    const handleDetailClick = (record) => {
        const value = record.key;
        navigate(`/client/detail-client/${value}`);
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
                        <Link to='/client/add-client'>
                            <AddButton buttonText="Add Client"/>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div style={{marginTop: 24}}>
                <ClientTable {...propsTable} />
            </div>
        </div>
    )
}

export default MainClientConfiguration