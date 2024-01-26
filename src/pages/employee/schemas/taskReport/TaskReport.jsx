import React, { useState } from "react";
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
import { filterData } from "./constans";
import "./taskReport.css";

const TaskReport = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [countValue, setCountValue] = useState("10");

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
            <h1 className="number">2</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <VscIssueReopened className="reopen-icon" />
            <p className="text">Reopen</p>
            <h1 className="number">2</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <IoMdCheckmarkCircleOutline className="done-icon" />
            <p className="text">Done</p>
            <h1 className="number">2</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <MdOutlineCancel className="cancel-icon" />
            <p className="text">Cancel</p>
            <h1 className="number">1</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <TbClipboardList className="total-task-icon" />
            <p className="text">Total Task</p>
            <h1 className="number">7</h1>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={6} xl={4}>
          <Card className="components">
            <GoChecklist className="summary-icon" />
            <p className="text">Summary</p>
            <h1 className="number">60%</h1>
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
          <FilterButton onFilter={handleFilter} treeData={filterData} />
        </Col>
      </Row>

      <TableTaskReport
        searchValue={searchValue}
        filterValue={filterValue}
        countValue={countValue}
      />
    </>
  );
};

export default TaskReport;
