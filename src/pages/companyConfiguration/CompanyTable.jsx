import React from 'react';
import { Table, Button } from 'antd';
import './companyTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";

const CompanyTable = () => {
    
    const activeButton = (
        <Button className="active-button" type="primary" size="small" ghost>
            active
        </Button>
    );

    const notActiveButton = (
        <Button className="not-active-button" type="primary" size="small" ghost>
            non active
        </Button>
    );

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
        },
        {
          title: 'Action',
          key: 'action',
            render: () => (
                <>
                    <Button className="action-button" type="primary" size="small" ghost>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                    <Button className="action-button" type="primary" size="small" ghost>
                        <BsPersonAdd className="action-icon" />
                    </Button>
                </>
            ),
        },
    ];
      
    const data = [
        {
          key: '1',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '2',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '3',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '4',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '5',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '6',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '7',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '8',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '9',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '10',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '11',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '12',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '13',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '14',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '15',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '16',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '17',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: notActiveButton,
        },
        {
          key: '18',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '19',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
          joinDate: '08/08/2023',
          status: activeButton,
        },
        {
          key: '20',
          companyName: 'PT Masagi',
          email: 'helpdesk@masagi.co.id',
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

export default CompanyTable;