import React, {useEffect, useState} from 'react';
import { Table, Button, Space } from 'antd';
import './companyTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';

const CompanyTable = ({ searchValue, filterValue, sortValue, countValue }) => {
  const token = Cookies.get("token");
  const [companyData, setCompanyData] = useState([]);
  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  }

  const getCompanyData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/v1/company/", {
        headers: {
          "Authorization": token,
        },
      });
      setCompanyData(response.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCompanyData();
  }, []);

    const columns = [
        {
          title: 'Company Name',
          dataIndex: 'companyName',
          key: 'companyName',
          width: 400,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Data Founded',
          dataIndex: 'dateFounded',
          key: 'dateFounded',
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
            render: () => (
                <Space size="small">
                  <Link to='/company/detail-company'>
                    <Button className="action-button" type="primary" size="small" ghost>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                  </Link>
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
        email: item.email_address,
        dateFounded: formatDate(item.date_founded),
        status: item.is_active ? 'active' : 'notActive',
      }
    });

    // Filter data berdasarkan searchValue
    const filteredData = data.filter(item =>
      // conditional rendering untuk searchValue
      item.companyName.toLowerCase().includes(searchValue.toLowerCase()) &&
      // conditional rendering if else untuk filterValue
      (filterValue === 'active' ? item.status === 'active' : filterValue === 'notActive' ? item.status === 'notActive' : true)
    );

    // Sort data berdasarkan sortValue
    const sortedData = [...filteredData].sort((a, b) => {

      const momentA = moment(a.joinDate, 'DD/MM/YYYY');
      const momentB = moment(b.joinDate, 'DD/MM/YYYY');

      if (sortValue === 'aToZ') {
        return a.companyName.localeCompare(b.companyName);
      } else if (sortValue === 'zToA') {
        return b.companyName.localeCompare(a.companyName);
      } else if (sortValue === 'latest') {
        return momentB.diff(momentA);
      } else if (sortValue === 'oldest') {
        return momentA.diff(momentB);
      } else {
        return 0;
      }
    });

    const paginationConfig = {
        pageSize: countValue, // Jumlah item per halaman berdasarkan countValue
        showTotal: (total, range) => (
            <span style={{ color: '#556172' }}>
                Page {Math.ceil(range[0] / paginationConfig.pageSize)} of {Math.ceil(total / paginationConfig.pageSize)}
            </span>
        ),
        showLessItems: true,
    };

    return (
      <>
        <Table 
            columns={columns}
            dataSource={sortedData}
            pagination={paginationConfig}
            rowClassName="custom-row"  
        />
      </>
    )
}

export default CompanyTable;