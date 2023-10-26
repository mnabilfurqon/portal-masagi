import React from 'react';
import { Table, Button, Space } from 'antd';
import './employeeTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from 'react-router-dom';

const EmployeeTable = () => {
    
    const activeButton = (
        <Button className="active-button" type="primary" size="small" ghost>
            active
        </Button>
    );

    const notActiveButton = (
        <Button className="not-active-button" type="primary" size="small" ghost>
            not active
        </Button>
    );

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
          status: activeButton,
        },
        {
          key: '2',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '3',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '4',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '5',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '6',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '7',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '8',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '9',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '10',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '11',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '12',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '13',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '14',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '15',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '16',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '17',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '18',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '19',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '20',
          employeeName: 'John Doe',
          nip: '199707182023092008',
          joinDate: '08/08/2023',
          status: activeButton,
        },
    ];

    const paginationConfig = {
        pageSize: 10, // Jumlah item per halaman
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
            dataSource={data}
            pagination={paginationConfig}
            rowClassName="custom-row"  
        />
      </>
    )
}

export default EmployeeTable;