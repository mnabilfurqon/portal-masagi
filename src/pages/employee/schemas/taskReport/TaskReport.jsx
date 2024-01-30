import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { TbProgress, TbClipboardList } from "react-icons/tb";
import { VscIssueReopened } from "react-icons/vsc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import SearchBox from "../../../../components/common/searchBox/SearchBox";
import CountButton from "../../../../components/common/buttons/countButton/CountButton";
import FilterButton from "../../../../components/common/buttons/filterButton/FilterButton";
import TableTaskReport from "./tableTaskReport/TableTaskReport";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./taskReport.css";

const TaskReport = () => {
  let urlApi;
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const roleName = decodeURIComponent(Cookies.get("role_name"));
  const [filterData, setFilterData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [inProgressData, setInProgressData] = useState(0);
  const [openData, setOpenData] = useState(0);
  const [doneData, setDoneData] = useState(0);
  const [cancelData, setCancelData] = useState(0);
  const [totalTaskData, setTotalTaskCount] = useState(0);
  const [summary, setSummary] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [countValue, setCountValue] = useState("10");

  if (roleName !== "Head of Division") {
    urlApi = "http://103.82.93.38/api/v1/task/employee";
  } else {
    urlApi = "http://103.82.93.38/api/v1/task/";
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
      const response = await axios.get(
        "http://103.82.93.38/api/v1/task_status/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setStatusData(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getSummaryData = async () => {
    try {
      const response = await axios.get("http://103.82.93.38/api/v1/task/summary/employee",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setInProgressData(response.data.in_progress_task || 0);
      setOpenData(response.data.open_task || 0);
      setDoneData(response.data.done_task || 0);
      setCancelData(response.data.cancel_task || 0);
      setTotalTaskCount(response.data.total_task || 0);
      setSummary(response.data.summary || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueProjectNames = new Set();
  const radioDataProjectRaw = filterData
  .map((item) => {
    const projectName = item.project.name;
    if (!uniqueProjectNames.has(projectName)) {
      uniqueProjectNames.add(projectName);
      return {
        key: item.project.uuid,
        label: item.project.name,
        type: "project",
      };
    }

    return null;
  })
  .filter((item) => item !== null);

const radioDataStatusRaw = statusData.map((item) => {
  return {
    key: item.uuid,
    label: item.name,
    type: "status",
  };
});

const radioData = [...radioDataProjectRaw, ...radioDataStatusRaw];

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getFilterData();
    getStatusData();
    getSummaryData();
  }, [token, navigate]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const handleCount = (value) => {
    setCountValue(value);
  };

  return (
    <>
      <Row gutter={[16, 16]} className="task-report">
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <TbProgress className="in-progress-icon" />
            <p className="text">In Progress</p>
            <h1 className="number">{inProgressData}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <VscIssueReopened className="reopen-icon" />
            <p className="text">Open</p>
            <h1 className="number">{openData}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <IoMdCheckmarkCircleOutline className="done-icon" />
            <p className="text">Done</p>
            <h1 className="number">{doneData}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <MdOutlineCancel className="cancel-icon" />
            <p className="text">Cancel</p>
            <h1 className="number">{cancelData}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <TbClipboardList className="total-task-icon" />
            <p className="text">Total Task</p>
            <h1 className="number">{totalTaskData}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <GoChecklist className="summary-icon" />
            <p className="text">Summary</p>
            <h1 className="number">{summary}</h1>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} md={14} lg={12} xl={8} xxl={8}>
          <SearchBox onSearch={handleSearch} />
        </Col>
        <Col xs={8} md={4} lg={3} xl={2} xxl={2}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col xs={16} md={6} lg={9} xl={6} xxl={4}>
          <FilterButton onFilter={handleFilter} radioData={radioData} />
        </Col>
      </Row>

      <TableTaskReport
        searchValue={searchValue}
        filterValue={filterValue}
        countValue={countValue}
        urlApi={urlApi}
      />
    </>
  );
};

export default TaskReport;
