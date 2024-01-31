import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { TbProgress, TbClipboardList } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import SearchBox from "../../../../components/common/searchBox/SearchBox";
import CountButton from "../../../../components/common/buttons/countButton/CountButton";
import FilterRadio from "../../../../components/common/buttons/filterButton/FilterRadio";
import TableProjectReport from "./tableProjectReport/TableProjectReport";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./projectReport.css";

const ProjectReport = () => {
  let urlApi;
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const roleName = decodeURIComponent(Cookies.get("role_name"));
  const [filterData, setFilterData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [inProgressData, setInProgressData] = useState(0);
  const [doneData, setDoneData] = useState(0);
  const [cancelData, setCancelData] = useState(0);
  const [totalProjectData, setTotalProject] = useState(0);
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

  const getProjectData = async () => {
    try {
      const response = await axios.get("http://103.82.93.38/api/v1/project/", {
        headers: {
          Authorization: token,
        },
      });
      const newData = response.data.items;
  
      const inProgressAmount = newData.filter(
        (item) => item.status.name === "in-progress"
      ).length;
      const doneAmount = newData.filter(
        (item) => item.status.name === "done"
      ).length;
      const cancelAmount = newData.filter(
        (item) => item.status.name === "cancelled"
      ).length;
      const totalProjectAmount = newData.length;
  
      setInProgressData(inProgressAmount || 0);
      setDoneData(doneAmount || 0);
      setCancelData(cancelAmount || 0);
      setTotalProject(totalProjectAmount || 0);
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
    getProjectData();
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
      <Row gutter={[16, 16]} className="project-report">
        <Col xs={12} sm={6} md={8} lg={6} xl={6}>
          <Card className="components">
            <TbProgress className="in-progress-icon" />
            <p className="text">In Progress</p>
            <h1 className="number">{inProgressData}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={8} lg={6} xl={6}>
          <Card className="components">
            <IoMdCheckmarkCircleOutline className="done-icon" />
            <p className="text">Done</p>
            <h1 className="number">{doneData}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={8} lg={6} xl={6}>
          <Card className="components">
            <MdOutlineCancel className="cancel-icon" />
            <p className="text">Cancel</p>
            <h1 className="number">{cancelData}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={8} lg={6} xl={6}>
          <Card className="components">
            <TbClipboardList className="total-task-icon" />
            <p className="text">Total Project</p>
            <h1 className="number">{totalProjectData}</h1>
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
          <FilterRadio onFilter={handleFilter} radioData={radioData} />
        </Col>
      </Row>

      <TableProjectReport
        searchValue={searchValue}
        filterValue={filterValue}
        countValue={countValue}
        urlApi={urlApi}
      />
    </>
  );
};

export default ProjectReport;