import React from 'react';
import { Table, Button, Space } from 'antd';
import './familyTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { Link } from 'react-router-dom';

const FamilyTable = ({onDetailClick}) => {

    const columns = [
        {
          title: 'Full Name',
          dataIndex: 'fullName',
          key: 'fullName',
          width: 400,
        },
        {
          title: 'NIK',
          dataIndex: 'nik',
          key: 'nik',
        },
        {
          title: 'Relation',
          dataIndex: 'relation',
          key: 'relation',
        },
        {
          title: 'Job',
          key: 'job',
          dataIndex: 'job',
        },
        {
          title: 'Action',
          key: 'action',
            render: () => (
                <Space size="small">
                  <Link to='/employee/detail-employee'>
                    <Button className="action-button" type="primary" size="small" ghost onClick={onDetailClick}>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                  </Link>
                </Space>
            ),
        },
    ];
      
    const data = [
        {
          key: '1',
          fullName: 'Maria Doe',
          nik: '312312412341231231',
          relation: 'Istri',
          job: 'Ibu Rumah Tangga',
        },
        {
          key: '2',
          fullName: 'Anton Doe',
          nik: '312312412341231231',
          relation: 'Anak',
          job: 'Pelajar',
        },
        {
          key: '3',
          fullName: 'Jack Doe',
          nik: '312312412341231231',
          relation: 'Anak',
          job: 'Pelajar',
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

export default FamilyTable;