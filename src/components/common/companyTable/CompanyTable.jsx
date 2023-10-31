import React from 'react';
import { Table, Button, Space } from 'antd';
import './companyTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from 'react-router-dom';

const CompanyTable = ({ searchValue, filterValue, sortValue, countValue }) => {

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
      
    const data = [
        {
          key: '1',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '2',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '3',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '4',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '5',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '6',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '7',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '8',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '9',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '10',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '11',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '12',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '13',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '14',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '15',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '16',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '17',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '18',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '19',
          companyName: 'Sorting',
          email: 'helpdesk@masagi.co.id',
          joinDate: '06/08/2023',
          status: 'active',
        },
        {
          key: '20',
          companyName: 'Testing',
          email: 'helpdesk@masagi.co.id',
          joinDate: '07/08/2023',
          status: 'active',
        },
    ];

    // Filter data berdasarkan searchValue
    const filteredData = data.filter(item =>
      // conditional rendering untuk searchValue
      item.companyName.toLowerCase().includes(searchValue.toLowerCase()) &&
      // conditional rendering if else untuk filterValue
      (filterValue === 'active' ? item.status === 'active' : filterValue === 'notActive' ? item.status === 'notActive' : true)
    );

    // Sort data berdasarkan sortValue
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortValue === 'aToZ') {
        return a.companyName.localeCompare(b.companyName);
      } else if (sortValue === 'zToA') {
        return b.companyName.localeCompare(a.companyName);
      } else if (sortValue === 'latest') {
        return new Date(b.joinDate) - new Date(a.joinDate);
      } else if (sortValue === 'oldest') {
        return new Date(a.joinDate) - new Date(b.joinDate);
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