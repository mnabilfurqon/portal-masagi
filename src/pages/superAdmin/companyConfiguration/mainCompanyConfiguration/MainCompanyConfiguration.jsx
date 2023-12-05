import React, {useState} from 'react'
import "./mainCompanyConfiguration.css"
import AddButton from '@common/addButton/AddButton'
import CompanyTable from '@common/companyTable/CompanyTable'
import { Link } from 'react-router-dom'
import SearchBox from '@common/SearchBox/SearchBox'
import FilterButton from '@common/FilterButton/FilterButton'
import SortButton from '@common/sortButton/SortButton'
import CountButton from '@common/countButton/CountButton'
import { Button, Col, Row } from 'antd';

const MainCompanyConfiguration = () => {

  // search handler
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };
  // end of search handler

  // filter handler
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = (value) => {
    setFilterValue(value);
  };
  // end of filter handler

  // sort handler
  const [sortValue, setSortValue] = useState("");

  const handleSort = (value) => {
    setSortValue(value);
  };
  // end of sort handler

  // count handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };
  // end of count handler

  const treeData = [
    {
      title: 'Status',
      key: 'is_active',
    },
    {
      title: 'Company Name',
      key: 'company_name',
    },
    // {
    //   title: 'Email Address',
    //   key: 'email_address',
    // },
    // {
    //   title: 'Address',
    //   key: 'address',
    // },
    // {
    //   title: 'Phone Number',
    //   key: 'phone_number',
    // },
    // {
    //   title: 'Website',
    //   key: 'website',
    // },
    // {
    //   title: 'Contact Name',
    //   key: 'contact_name',
    // },
    // {
    //   title: 'Contact Person',
    //   key: 'contact_person',
    // },
  ];

  const itemsSort = [
    {
      key: 'aToZCompany',
      label: 'A-Z Company Name'
    },
    {
      key: 'zToACompany',
      label: 'Z-A Company Name'
    },
    {
      key: 'latestJoinDate',
      label: 'Latest Join Date'
    },
    {
      key: 'oldestJoinDate',
      label: 'Oldest Join Date'
    },
  ];

  return (
    <div className='main-company-configuration'>
      <Row gutter={[16, 8]}>
        <Col xs={24} md={14} lg={8} xl={6} xxl={6}>
          <SearchBox onSearch={handleSearch} /> 
            </Col>
        <Col xs={11} md={10} lg={8} xl={4} xxl={3}>
          <FilterButton onFilter={handleFilter} treeData={treeData} />
        </Col>
        <Col xs={13} md={8} lg={8} xl={6} xxl={3}>
          <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
        </Col>
        <Col xs={8} md={4} lg={12} xl={2} xxl={2}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col xs={16} md={12} lg={12} xl={{span: 4, offset: 2}} xxl={{span: 4, offset: 6}}>
          <Link to='/company/add-company'>
          <AddButton buttonText="Add Company"/>
          </Link>
        </Col>
      </Row>
      <div className='company-table-container'>
        <CompanyTable searchValue={searchValue} filterValue={filterValue} sortValue={sortValue} countValue={countValue} />
      </div>
    </div>
  )
}

export default MainCompanyConfiguration
