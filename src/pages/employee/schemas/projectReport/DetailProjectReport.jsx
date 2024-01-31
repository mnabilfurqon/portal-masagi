import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GoChecklist } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { VscIssueReopened } from "react-icons/vsc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbProgress, TbClipboardList, TbClipboardTypography } from "react-icons/tb";
import { Table, Row, Col, Input, Button, Card, Flex, Spin, Avatar, } from 'antd'
import { AiOutlineSearch, AiOutlineFileSearch, } from 'react-icons/ai'
import axios from "axios";
import dayjs from "dayjs";
import Cookies from 'js-cookie';
import FilterButton from '@common/buttons/FilterButton/FilterButton'
import CountButton from '@common/buttons/countButton/CountButton'
import HistoryButton from '@common/buttons/historyButton/HistoryButton';
import './detailProject.css'

const DetailProjectReport = () => {
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const params = useParams();
  
    const [loading, setLoading] = useState();
    const [tableName, setTableName] = useState("All Task");
    const [tasks, setTasks] = useState();
    const [client, setClient] = useState();
    const [project, setProject] = useState({});
  
    // Header
    useEffect(() => {
      if (!token) {
        navigate('/login');
      }
      getTasks();
      getProject();
      // console.log(params)
    }, [token, navigate]);
  
    // Get All Task
    const getTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://103.82.93.38/api/v1/task/", {
          headers: {
            Authorization: token,
          }
        });
        setLoading(false);
        setTasks(response.data.items);
        console.log("All Tasks", tasks);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    // Get Project Detail
    const getProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://103.82.93.38/api/v1/project/${params.uuid}`, {
          headers: {
            Authorization: token,
          }
        });
        setLoading(false);
        setProject(response.data);
        setClient(response.data.client.name);
        // console.log("Detail Project", project);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  
    // const data = projects?.map(item => {
    //   return {
    //     key: item.uuid,
    //     client: item.client.name,
    //     name: item.name,
    //     start_date: dayjs(item.start_date).format("DD/MM/YYYY"),
    //     due_date: dayjs(item.due_date).format("DD/MM/YYYY"),
    //     status: item.status.name,
    //     type: item.type.name,
    //     cancle_at: dayjs(item.cancle_at).format("DD/MM/YYYY"),
    //     done_at: dayjs(item.done_at).format("DD/MM/YYYY"),
    //   }
    // })
  
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
        title: 'All Project',
        key: 'all',
      },
      {
        title: 'Website Development Project',
        key: 'we-dev',
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
          key: "project",
          title: "Project",
          dataIndex: "project",
          ellipsis: true,
        },
        {
          key: "client",
          title: "Client",
          dataIndex: "client",
          ellipsis: true,
        },
        {
          key: "task",
          title: "Task",
          dataIndex: "task",
          ellipsis: true,
        },
        {
          key: "deadline",
          title: "Deadline",
          dataIndex: "deadline",
          ellipsis: true,
        },
        {
          key: "assignTo",
          title: "Assign To",
          dataIndex: "assignTo",
          ellipsis: true,
        },
        {
          key: "createdBy",
          title: "Created By",
          dataIndex: "createdBy",
          ellipsis: true,
        },
        {
          key: "status",
          title: "Status",
          dataIndex: "status",
          ellipsis: true,
          render: (text) => {
            if (text === "in-progress") {
              return (
                <Button
                  className="in-progress-buttons"
                  type="primary"
                  size="small"
                  value="in-progress"
                  ghost
                >
                  in-progress
                </Button>
              );
            } else if (text === "done") {
              return (
                <Button
                  className="done-buttons"
                  type="primary"
                  size="small"
                  value="done"
                  ghost
                >
                  done
                </Button>
              );
            } else if (text === "review") {
              return (
                <Button
                  className="review-buttons"
                  type="primary"
                  size="small"
                  value="review"
                  ghost
                >
                  review
                </Button>
              );
            } else if (text === "cancel") {
              return (
                <Button
                  className="cancel-buttons"
                  type="primary"
                  size="small"
                  value="cancel"
                  ghost
                >
                  cancel
                </Button>
              );
            } else {
              return (
                <Button
                  className="open-buttons"
                  type="primary"
                  size="small"
                  value="open"
                  ghost
                >
                  open
                </Button>
              );
            }
          },
          filters: [
            {
              text: 'In-Progress',
              value: 'in-progress',
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
              text: 'Cancel',
              value: 'cancel',
            },
            {
              text: 'Open',
              value: 'open',
            },
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
          key: "action",
          title: "Action",
          ellipsis: true,
          render: (record) => (
            <Button
              className="detail-button-task-report"
              type="primary"
              onClick={() => handleDetailClick(record)}
              size="small"
              ghost
            >
              <AiOutlineFileSearch className="detail-icon-task-report" />
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
    <Spin spinning={loading} size='large'>
    <Card className='card'>
      <Flex gap={10} align='center' style={{ marginBottom: 8, }}>
        <TbClipboardTypography size={23} />
        <span style={{ fontWeight: 700, fontSize: 20, }}>{project.name}</span>
      </Flex>
      <Row gutter={10} align='top' style={{ marginBottom: 8, }}>
        <Col sm={3}>
          <span style={{ }}>Client</span>
        </Col>
        <Col sm={9}>
          <span style={{ fontWeight: 500, fontSize: 15 }}>{client}</span>
        </Col>
      </Row>
      <Row gutter={10} align='top'>
        <Col sm={3}>
          <span>Members</span>
        </Col>
        <Col sm={9}>
          {/* <Avatar.Group
          maxCount={5}
          maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
          }}
          >
            // get data from detailTask.project.team.team_members[i].employee.name
            {detailTask.project && detailTask.project.team && detailTask.project.team.team_members ? detailTask.project.team.team_members.map((item) => {
              return (
                  // title is item.employee.name + item.role_project.name
                  <Tooltip key={item.employee.uuid} title={item.employee.name + ' - ' + item.role_project.name} placement="top">
                      <Avatar style={{ backgroundColor: '#17A2B8' }}> {item.employee.name.charAt(0)} </Avatar>
                  </Tooltip>
              )
            }) : (
              <Tooltip title="James" placement="top">
                  <Avatar style={{ backgroundColor: '#17A2B8' }}> J </Avatar>
              </Tooltip>
            )}
          </Avatar.Group> */}
          <Avatar.Group>
            <Avatar />
            <Avatar />
            <Avatar />
          </Avatar.Group>
        </Col>
      </Row>
    </Card> <br />

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
        <Col xs={24} md={14} lg={15} >
          {/* <SearchBox onSearch={handleSearch} /> */}
          <Input 
          className='search-box'
          prefix={<AiOutlineSearch/>} 
          placeholder='Search' 
          onChange={onChangeSearch}
          allowClear
          />
        </Col>
        <Col xs={8} md={4} lg={3} >
          <CountButton className="count-button" onCount={handleCount} />
          {/* <CountButton className="count-button" onCount={handleCount} /> */}
        </Col>
        <Col xs={16} md={6} lg={6} >
          <FilterButton onFilter={handleFilter} treeData={treeData} />
          {/* <FilterButton onFilter={handleFilter} treeData={filterData} /> */}
        </Col>
      </Row> <br />

      <div className='table'>
        <p className='sub-title'>{tableName}</p>
        <Table 
            loading={loading}
            // dataSource={data}
            columns={columns}
            pagination={false}
            scroll={{
                x: 200,
            }}
        />
      </div>
    </Spin>
  )
}

export default DetailProjectReport