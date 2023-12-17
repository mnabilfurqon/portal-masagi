import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { filterData, sortItems } from "./constans";
import TableOfficialTravelEmployee from "./tableOfficialTravelEmployee/TableOfficialTravelEmployee";
import SearchBox from "../../../../../components/common/searchBox/SearchBox";
import FilterButton from "../../../../../components/common/buttons/filterButton/FilterButton";
import SortButton from "../../../../../components/common/buttons/sortButton/SortButton";
import CountButton from "../../../../../components/common/buttons/countButton/CountButton";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./officialTravelEmployee.css";

const OfficialTravelEmployee = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [countValue, setCountValue] = useState("10");

  const handleAddButton = () => {
    navigate('/official-travel/official-travel-requested')
  }

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
          <FilterButton onFilter={handleFilter} treeData={filterData} />
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
          xs={8}
          md={{ span: 3, offset: 2 }}
          lg={{ span: 5, offset: 1 }}
          xl={{ span: 5, offset: 3 }}
          xxl={{ span: 4, offset: 6 }}
        >
          <Button onClick={handleAddButton} className="add-button-official-travel-employee">
            <AiOutlinePlus />
            Request Official Travel
          </Button>
        </Col>
      </Row>

      <TableOfficialTravelEmployee
        searchValue={searchValue}
        filterValue={filterValue}
        sortValue={sortValue}
        countValue={countValue}
      />
    </>
  );
};

export default OfficialTravelEmployee;
