import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { radioData, sortItems } from "./constans";
import TableOvertimeEmployee from "./tableOvertimeEmployee/TableOvertimeEmployee";
import SearchBox from "@common/SearchBox/SearchBox";
import SortButton from "@common/buttons/sortButton/SortButton";
import FilterRadio from "@common/buttons/filterButton/FilterRadio";
import CountButton from "@common/buttons/countButton/CountButton";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./overtimeEmployee.css";

const OvertimeEmployee = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [countValue, setCountValue] = useState("10");

  const handleAddButton = () => {
    navigate("/overtime/overtime-requested");
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const handleSort = (value) => {
    setSortValue(value);
  };

  const handleCount = (value) => {
    setCountValue(value);
  };

  return (
    <>
      <Row gutter={[16, 8]}>
        <Col xs={24} md={14} lg={7} xl={8} xxl={6}>
          <SearchBox onSearch={handleSearch} />
        </Col>
        <Col xs={11} md={10} lg={3} xl={3} xxl={3}>
          <FilterRadio onFilter={handleFilter} radioData={radioData} />
        </Col>
        <Col xs={13} md={8} lg={3} xl={3} xxl={3}>
          <SortButton
            className="sort-button"
            onSort={handleSort}
            items={sortItems}
          />
        </Col>
        <Col xs={8} md={4} lg={3} xl={2} xxl={2}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col
          xs={16}
          md={12}
          lg={{ span: 6, offset: 2}}
          xl={{ span: 5, offset: 3}}
          xxl={{ span: 3, offset: 7 }}
        >
          <Button
            onClick={handleAddButton}
            className="add-button-overtime-employee"
          >
            <AiOutlinePlus />
            Request Overtime
          </Button>
        </Col>
      </Row>

      <TableOvertimeEmployee 
        searchValue={searchValue}
        filterValue={filterValue}
        sortValue={sortValue}
        countValue={countValue}
      />
    </>
  );
};

export default OvertimeEmployee;
