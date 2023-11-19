import React, {useEffect, useState} from 'react';
import { Table, Button, Space } from 'antd';
import './companyTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CompanyTable = ({ searchValue, filterValue, sortValue, countValue }) => {
  console.log(searchValue);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  }

  // Handlre value filter button
  const filterArray = Array.isArray(filterValue) ? filterValue : [];
  const encodedFilterValue = filterArray.map(value => encodeURIComponent(value)).join(',');
  // End of handler value filter button

  // handle search value for status
  if (searchValue === 'active') {
    searchValue = 1;
  } else if (searchValue === 'not active') {
    searchValue = 0;
  }
  // end of handle search value for status

  const [tableParams, setTableParams] = useState({
    pagination : {
      current: 1,
      pageSize: countValue,
      showTotal: (total, range) => (
        <div className='total-data'>
          {range[0]}-{range[1]} of {total} items
        </div>
      ),
      showLessItems: true,
    },
  });

  const [params, setParams] = useState({
    page: tableParams.pagination.current,
    per_page: tableParams.pagination.pageSize,
  });

  const handleDetailClick = (record) => {
    const value = record.key;
    navigate(`/company/detail-company/${value}`);
  }

  const getCompanyData = async () => {
    try {
      var page;
      setLoading(true);
      if (tableParams.pagination.total < countValue) {
        page = 1;
      } else {
        page = tableParams.pagination.current;
      }
      const response = await axios.get("https://attendance-1-r8738834.deta.app/api/v1/company/", {
        params: {
          page: page,
          per_page: countValue,
          search: searchValue,
          search_by: encodedFilterValue? encodedFilterValue : 'company_name',
          desc: sortValue === 'latestJoinDate' || sortValue === 'zToACompany' ? true : false,
          sort_by: sortValue === 'latestJoinDate' || sortValue === 'oldestJoinDate' ? 'created_date' : 'company_name',
        },
        headers: {
          "Authorization": token,
        },
      });
      console.log(response);
      setCompanyData(response.data.items);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data._meta.total_items,
          pageSize: countValue,
        },
      });
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getCompanyData();
  }, [token, navigate, params, countValue, searchValue, sortValue, filterValue]);

    const columns = [
        {
          title: 'Company Name',
          dataIndex: 'companyName',
          key: 'companyName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Join Date',
          dataIndex: 'joinDate',
          key: 'joinDate',
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: (text) => {
            if (text === 'active') {
              return (
                <Button className="active-button" type="primary" size="small" value="active" ghost>
                active
                </Button>
              );
            } else {
              return (
                <Button className="not-active-button" type="primary" size="small" value="notActive" ghost>
                not active
                </Button>
              );
            }
          },
        },
        {
          title: 'Action',
          key: 'action',
            render: (record) => (
                <Space size="small">
                  <Button className="action-button" type="primary" size="small" ghost onClick={() => handleDetailClick(record)}>
                      <AiOutlineFileSearch className="action-icon" />
                  </Button>
                  <Button className="action-button" type="primary" size="small" ghost>
                      <BsPersonAdd className="action-icon" />
                  </Button>
                </Space>
            ),
        },
    ];
    
    const data = companyData.map(item => {
      return {
        key: item.uuid,
        companyName: item.company_name,
        address: item.address,
        phoneNumber: item.phone_number,
        dateFounded: formatDate(item.date_founded),
        email: item.email_address,
        website: item.website,
        contactPerson: item.contact_person,
        contactName: item.contact_name,
        status: item.is_active ? 'active' : 'notActive',
        joinDate: formatDate(item.created_date),
        updatedDate: formatDate(item.updated_date),
      }
    });

    const handleTableChange = (pagination, filters, sorter) => {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          current: pagination.current,
          pageSize: countValue,
        },
        filters,
        ...sorter,
      });
  
      setParams({
        page: pagination.current,
        per_page: pagination.pageSize,
        search: searchValue,
      });
  
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setCompanyData([]);
      }
    };

    return (
      <>
        <Table 
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            rowClassName="custom-row"
            onChange={handleTableChange}
            scroll={{ x: true, y: 650 }}
        />
      </>
    )
}

export default CompanyTable;