import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { TbProgress, TbClipboardList } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import SearchBox from "@common/SearchBox/SearchBox";
import CountButton from "@common/buttons/countButton/CountButton";
import FilterRadio from "@common/buttons/filterButton/FilterRadio";
import TableProjectReport from "./tableProjectReport/TableProjectReport";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./projectReport.css";

const ProjectReport = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [statusData, setStatusData] = useState([]);
  const [summaryProject, setSummaryProject] = useState({
    "in-progress": 0,
    done: 0,
    cancelled: 0,
  });
  const [totalProject, setTotalProject] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filterStatusValue, setFilterStatusValue] = useState("");
  const [countValue, setCountValue] = useState("10");

  const getStatusData = async () => {
    try {
      const response = await axios.get(
        "http://103.82.93.38/api/v1/project_status/",
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
      const response = await axios.get(
        "http://103.82.93.38/api/v1/project/summary",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTotalProject(response.data.total_project || 0);
      setSummaryProject(
        response.data.project_by_type || {
          "in-progress": 0,
          done: 0,
          cancelled: 0,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const radioDataStatus = statusData.map((item) => {
    return {
      key: item.uuid,
      label: item.name,
    };
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getStatusData();
    getProjectData();
  }, [token, navigate]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleFilterStatus = (value) => {
    setFilterStatusValue(value);
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
            <h1 className="number">{summaryProject["in-progress"]}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={8} lg={6} xl={6}>
          <Card className="components">
            <IoMdCheckmarkCircleOutline className="done-icon" />
            <p className="text">Done</p>
            <h1 className="number">{summaryProject.done}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={8} lg={6} xl={6}>
          <Card className="components">
            <MdOutlineCancel className="cancel-icon" />
            <p className="text">Cancel</p>
            <h1 className="number">{summaryProject.cancelled}</h1>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={8} lg={6} xl={6}>
          <Card className="components">
            <TbClipboardList className="total-task-icon" />
            <p className="text">Total Project</p>
            <h1 className="number">{totalProject}</h1>
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
          <FilterRadio onFilter={handleFilterStatus} radioData={radioDataStatus} />
        </Col>
      </Row>

      <TableProjectReport
        searchValue={searchValue}
        filterStatusValue={filterStatusValue}
        countValue={countValue}
      />
    </>
  );
};

export default ProjectReport;
