import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoChecklist } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { VscIssueReopened } from "react-icons/vsc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbProgress, TbClipboardList } from "react-icons/tb";
import { Table, Row, Col, Input, Button, } from 'antd'
import { AiOutlineSearch, AiOutlineFileSearch, } from 'react-icons/ai'
import axios from "axios";
import dayjs from "dayjs";
import Cookies from 'js-cookie';
import FilterButton from '@common/buttons/FilterButton/FilterButton'
import CountButton from '@common/buttons/countButton/CountButton'
import HistoryButton from '@common/buttons/historyButton/HistoryButton';

const ProjectReport = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [loading, setLoading] = useState();
  const [projects, setProjects] = useState();

  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getProjects();
  }, [token, navigate]);

  // Get All Project
  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://103.82.93.38/api/v1/project/", {
        headers: {
          Authorization: token,
        }
      });
      setLoading(false);
      setProjects(response.data.items);
      // console.log("Projects", projects);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const data = projects?.map(item => {
    return {
      key: item.uuid,
      client: item.client.name,
      name: item.name,
      start_date: dayjs(item.start_date).format("DD/MM/YYYY"),
      due_date: dayjs(item.due_date).format("DD/MM/YYYY"),
      status: item.status.name,
      type: item.type.name,
      cancle_at: dayjs(item.cancle_at).format("DD/MM/YYYY"),
      done_at: dayjs(item.done_at).format("DD/MM/YYYY"),
    }
  })

  // Seacrh Handler
  const [searchText, setSearchText] = useState("");
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
      title: 'All Status',
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
      title: 'In Progress',
      key: 'in-progress',
    },
    {
      title: 'Open',
      key: 'open',
    },
    {
      title: 'Reopen',
      key: 'reopen',
    },
    {
      title: 'Review',
      key: 'revuew',
    },
  ];

  // Count Handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };
  
  // Table
  const columns = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (record) => {
        // console.log(record)
        if (record === "done") {
          return (
            <Button key={record.uuid} className="active-button" type="primary" size="small" value="active" ghost>
              done
            </Button>
          );
        } else if (record === "in-progress") {
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
        <Button type="primary" size="small" onClick={() => {handleDetailClick(record)}} ghost style={{ border: 0,}}>
          <AiOutlineFileSearch className="action-icon" />
        </Button>
      ),
    },
  ];

  // Handel OnClick Detail
  const handleDetailClick = (record) => {
    const value = record.key;
    navigate(`/project-report/detail-project/${value}`, { state: {data: record} });
  }

  const onClickTaskReport = () => {  }
  const onClickReopen = () => {  }
  const onClickDone = () => {  }
  const onClickCancel = () => {  }
  const onClickTotalProject = () => {  }
  const onClickSummary = () => {  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={8} lg={6} xl={4}>
          <HistoryButton
            onClick={onClickTaskReport}
            icon={<TbProgress className="in-progress-icon" />}
            title="In Progress"
            value={3}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4}>
          <HistoryButton
            onClick={onClickReopen}
            icon={<VscIssueReopened className="reopen-icon" />}
            title="Reopen"
            value={0}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4}>
          <HistoryButton
            onClick={onClickDone}
            icon={<IoMdCheckmarkCircleOutline className="done-icon" />}
            title="Done"
            value={0}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4}>
          <HistoryButton
            onClick={onClickCancel}
            icon={<MdOutlineCancel className="cancel-icon" />}
            title="Cancel"
            value={0}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4}>
          <HistoryButton
            onClick={onClickTotalProject}
            icon={<TbClipboardList className="total-task-icon" />}
            title="Total Project"
            value={3}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4}>
          <HistoryButton
            onClick={onClickSummary}
            icon={<GoChecklist className="summary-icon" />}
            title="Summary"
            value={"40%"}
          />
        </Col>
      </Row> <br />

      <Row gutter={[16, 8]}>
        <Col xs={24} md={14} lg={16} >
          {/* <SearchBox onSearch={handleSearch} /> */}
          <Input 
          className='search-box'
          prefix={<AiOutlineSearch/>} 
          placeholder='Search' 
          onChange={onChangeSearch}
          allowClear
          />
        </Col>
        <Col xs={8} md={4} lg={2} >
          <CountButton className="count-button" onCount={handleCount} />
          {/* <CountButton className="count-button" onCount={handleCount} /> */}
        </Col>
        <Col xs={16} md={6} lg={6} >
          <FilterButton onFilter={handleFilter} treeData={treeData} />
          {/* <FilterButton onFilter={handleFilter} treeData={filterData} /> */}
        </Col>
      </Row> <br />

      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{
            x: 200,
        }}
      />
    </>
  )
}

export default ProjectReport