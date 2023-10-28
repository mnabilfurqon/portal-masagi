import React from 'react';
import { Table, Button, Space } from 'antd';
import './employeeTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from 'react-router-dom';

const EmployeeTable = ({searchValue, filterValue, sortValue, countValue}) => {

    const columns = [
        {
          title: 'Employee Name',
          dataIndex: 'employeeName',
          key: 'employeeName',
          width: 400,
        },
        {
          title: 'NIP',
          dataIndex: 'nip',
          key: 'nip',
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
                  <Link to='/employee/detail-employee'>
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
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '2',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '3',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '4',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '5',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '6',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '7',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '8',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '9',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '10',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '11',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '12',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '13',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '14',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '15',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '16',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '17',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'notActive',
        },
        {
          key: '18',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: 'active',
        },
        {
          key: '19',
          employeeName: 'Sorting',
          nip: '199707182023092008',
          joinDate: '06/08/2023',
          status: 'active',
        },
        {
          key: '20',
          employeeName: 'Testing',
          nip: '199707182023092008',
          joinDate: '07/08/2023',
          status: 'active',
        },
    ];

    // Filter data berdasarkan searchValue
    const filteredData = data.filter(item =>
      item.employeeName.toLowerCase().includes(searchValue.toLowerCase()) &&
      // conditional rendering if else untuk filterValue
      (filterValue === 'active' ? item.status === 'active' : filterValue === 'notActive' ? item.status === 'notActive' : true)
    );

    // Sort data berdasarkan sortValue
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortValue === 'aToZ') {
        return a.employeeName.localeCompare(b.employeeName);
      } else if (sortValue === 'zToA') {
        return b.employeeName.localeCompare(a.employeeName);
      } else if (sortValue === 'latest') {
        return new Date(b.joinDate) - new Date(a.joinDate);
      } else if (sortValue === 'oldest') {
        return new Date(a.joinDate) - new Date(b.joinDate);
      } else {
        return 0;
      }
    });

    const paginationConfig = {
        pageSize: countValue, // Jumlah item per halaman
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

export default EmployeeTable;