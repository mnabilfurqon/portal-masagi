import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './projectConfiguration.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import dayjs from 'dayjs'
import SearchBox from '@common/SearchBox/SearchBox'
import FilterButton from '@common/buttons/FilterButton/FilterButton'
import SortButton from '@common/buttons/sortButton/SortButton'
import CountButton from '@common/buttons/countButton/CountButton'
import SuccessModal from '@common/modals/successModal/SuccessModal'
import FailedModal from '@common/modals/failedModal/FailedModal'
import { Row, Col, Table, Input, Button, Flex } from 'antd'
import { AiOutlineSearch, AiOutlinePlus, AiOutlineFileSearch, } from 'react-icons/ai'

const ProjectConfiguration = () => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [loading, setLoading] = useState();

  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // getUsersData();
  }, [token, navigate]);

  // Search Handler
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
  }

  // Filter Handler
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const treeData = [
    {
      title: 'All',
      key: 'all',
    },
    {
      title: 'Cancel',
      key: 'cancel',
    },
    {
      title: 'Done',
      key: 'done',
    },
    {
      title: 'In-Progress',
      key: 'inProgress',
    },
  ];

  // Sort Handler
  const [sortValue, setSortValue] = useState("");

  const handleSort = (value) => {
    setSortValue(value);
  };

  const itemsSort = [
    {
      key: 'aToZ',
      label: 'A-Z Username'
    },
    {
      key: 'zToA',
      label: 'Z-A Username'
    },
  ];

  // Count Handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };

  // Detail Button Handler
  const handleDetailClick = (record) => {
    const value = record.key;
    navigate(`/project/detail-project/${value}`);
  }

  // Table
  const columns = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.projectName).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (record) => {
        if (record === "done") {
          return (
            <Button key={record.uuid} className="active-button" type="primary" size="small" value="active" ghost>
              done
            </Button>
          );
        } else if (record === "inProgress") {
          return (
            <Button key={record.uuid} style={{ borderRadius: 10, }} type="primary" size="small" value="active" ghost>
              in-progress
            </Button>
          );
        } else {
          return (
            <Button key={record.uuid} className="not-active-button" type="primary" size="small" value="notActive" ghost>
              cancel
            </Button>
          );
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Button className="action-button" type="primary" size="small" onClick={() => {handleDetailClick(record)}} ghost>
          <AiOutlineFileSearch className="action-icon" />
        </Button>
      ),
    },
  ];

  // Data
  const dataSource = [
    {
        key: "1",
        client: "PT Suka-Suka",
        projectName: "HRIS",
        startDate: "10/11/2022",
        dueDate: "20/02/2023",
        status: "done",
    },
    {
        key: "2",
        client: "PT Suka-Suka",
        projectName: "Mobile E-Learning",
        startDate: "10/12/2022",
        dueDate: "20/02/2024",
        status: "inProgress",
    },
    {
        key: "3",
        client: "PT Suka-Suka",
        projectName: "Desktop E-Learning",
        startDate: "05/01/2021",
        dueDate: "22/12/2021",
        status: "cancel",
    },
    {
        key: "4",
        client: "PT Suka-Suka",
        projectName: "Website E-Learning",
        startDate: "15/01/2020",
        dueDate: "25/10/2020",
        status: "done",
    },
  ]

  return (
    <>
      <Row gutter={[5, 10]} justify="space-between">
      <Col lg={8} md={12} sm={24}>
        <Input 
          className='search-box'
          prefix={<AiOutlineSearch/>} 
          placeholder='Search' 
          onSearch={handleSearch}
          onChange={onChangeSearch}
          allowClear
        />
        {/* <SearchBox /> */}
      </Col>
      <Col lg={3} md={6} sm={8}>
        <FilterButton onFilter={handleFilter} treeData={treeData} />
      </Col>
      <Col lg={3} md={6} sm={8}>
        <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
      </Col>
      <Col lg={3} md={8} sm={8}>
        <CountButton className="count-button" onCount={handleCount} />
      </Col>
      <Col lg={6} md={16} sm={24}>
        {/* <AddPosition /> */}
        <Button onClick={() => navigate("/add-project")} className="submit-button" style={{ color: "white", width: "100%", }} >
          <Flex justify='center' align='center' gap={10}>
            <AiOutlinePlus />
            Add Project
          </Flex> 
        </Button>
      </Col>
      </Row>
      <br />

      <Table 
        columns={columns} 
        pagination={{ pageSize: countValue, }} 
        dataSource={dataSource} 
        loading={loading}
        scroll={{
            x: 200,
        }}
      />
    </>
  )
}

export default ProjectConfiguration