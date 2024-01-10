import React, { useState } from 'react'
import './presentConfiguration.css'
import { useNavigate } from 'react-router-dom'
import { Row, Col, DatePicker, Progress, Input, Table, Button } from 'antd'
import { IoIosSearch } from "react-icons/io";
import { AiOutlineFileSearch } from 'react-icons/ai'
import FilterDropdown from '@common/buttons/FilterButton/FilterDropdown'
import CountButton from '@common/buttons/countButton/CountButton'
import HistoryButton from '@common/buttons/historyButton/HistoryButton'

const PresentConfiguration = () => {
  // Declaration
  const navigate = useNavigate();

  // Date Filter Handler
  const onChange = () => {}

  // OnClick Handler
  const onPresents = () => {}
  const onAbsents = () => {}
  const onTravels = () => {}
  const onOvertimes = () => {}
  const onLeaves = () => {}
  const onPermits = () => {}

  // Search Handler
  const [searchValue, setSearchValue] = useState("");

  // Count Handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };

  // Table
  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      // defaultSortOrder: "ascend",
      sorter: (a, b) => {
        return a.employee.length - b.employee.lenght
      },
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Presents",
      dataIndex: "presents",
      key: "presents",
    },
    {
      title: "Absents",
      dataIndex: "absents",
      key: "absents",
    },
    {
      title: "Official Travels",
      dataIndex: "official_travels",
      key: "official_travels",
    },
    {
      title: "Overtimes",
      dataIndex: "overtimes",
      key: "overtimes",
    },
    {
      title: "Leaves",
      dataIndex: "leaves",
      key: "leaves",
    },
    {
      title: "Permits",
      dataIndex: "permits",
      key: "permits",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button className="action-button" type="primary" size="small" onClick={() => {handleDetailClick(record)}} ghost>
          <AiOutlineFileSearch className="action-icon" />
        </Button>
      ),
    },
  ]

  const handleDetailClick = (record) => {
    navigate('/present/detail', { state: { data: record } });
    // navigate('/report/detail');
  };

  const onChangeTable = (pagination, filter, sorter, extra) => {
    //
  }

  const data = [
    {
      key: "1",
      employee: "Albert",
      presents: "7",
      absents: "0",
      official_travels: "0",
      overtimes: "1",
      leaves: "0",
      permits: "0",
    },
    {
      key: "2",
      employee: "Banny",
      presents: "7",
      absents: "0",
      official_travels: "0",
      overtimes: "1",
      leaves: "0",
      permits: "0",
    },
    {
      key: "3",
      employee: "Flauny",
      presents: "7",
      absents: "0",
      official_travels: "0",
      overtimes: "1",
      leaves: "0",
      permits: "0",
    },
    {
      key: "4",
      employee: "Harry",
      presents: "7",
      absents: "0",
      official_travels: "0",
      overtimes: "1",
      leaves: "0",
      permits: "0",
    },
    {
      key: "5",
      employee: "Klaust",
      presents: "7",
      absents: "0",
      official_travels: "0",
      overtimes: "1",
      leaves: "0",
      permits: "0",
    },
    {
      key: "6",
      employee: "Ian",
      presents: "7",
      absents: "0",
      official_travels: "0",
      overtimes: "1",
      leaves: "0",
      permits: "0",
    },
    {
      key: "7",
      employee: "Zack",
      presents: "7",
      absents: "0",
      official_travels: "0",
      overtimes: "1",
      leaves: "0",
      permits: "0",
    },
  ]

  // Filter by Division Handler
  const division = [
    {
      key: "all",
      label: "All Division",
    },
    {
      key: "it",
      label: "IT",
    },
    {
      key: "marketing",
      label: "Marketing",
    },
    {
      key: "finance",
      label: "Finance",
    },
    {
      key: "hr",
      label: "Human Resource",
    },
  ]

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
          <p className='week'>Saturday, 28 October 2023</p>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
          <DatePicker onChange={onChange} picker="date" placeholder='Filter By Date' style={{ width: "100%", background: "#629093",}} />
        </Col>
      </Row>
      <br />

      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={95} strokeWidth={10} size={55} />
            }
            title="Total Presents"
            value="146"
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={25} strokeColor="#DC3545" strokeWidth={10} size={55} />
            }
            title="Absents"
            value="1"
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={25} strokeColor="#28A745" strokeWidth={10} size={55} />
            }
            title="Official Travels"
            value="1"
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={25} strokeColor="#FD7E14" strokeWidth={10} size={55} />
            }
              title="Overtimes"
              value="3"
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={25} strokeColor="#6F42C1" strokeWidth={10} size={55} />
            }
            title="Leaves"
            value="1"
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={10} strokeColor="#FFC107" strokeWidth={10} size={55} />
            }
            title="Permits"
            value="1"
          />
        </Col>
      </Row>
      <br /> <br />

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={14} lg={18} xl={18} xxl={18}>
          <Input 
            className='search-box'
            prefix={<IoIosSearch />} 
            placeholder='Search for employee name' 
            onSearch={(value)=>{ 
              setSearchValue(value)
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
              }}
            allowClear
          />
        </Col>
        <Col xs={6} sm={6} md={4} lg={2} xl={2} xxl={2}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col xs={18} sm={18} md={6} lg={4} xl={4} xxl={4}>
          <FilterDropdown className="sort-button" text="All Division" items={division} />
        </Col>
      </Row>
      <br /> <br />

      <div className='table'>
        <p className='sub-title'>Attendance Report</p>
        <Table 
          dataSource={data}
          columns={columns}
          // onChange={onChangeTable}
          scroll={{
            x: 200,
          }}
          pagination={{
            pageSize: countValue,
          }}
        />
      </div>
    </>
  )
}

export default PresentConfiguration