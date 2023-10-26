import React from 'react';
import { Table, Button, Space } from 'antd';
import './educationTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { Link } from 'react-router-dom';

const EducationTable = ({onDetailClick}) => {

    const columns = [
        {
          title: 'Education',
          dataIndex: 'education',
          key: 'education',
          width: 400,
        },
        {
          title: 'Institution',
          dataIndex: 'institution',
          key: 'institution',
        },
        {
          title: 'Entry Year',
          dataIndex: 'entryYear',
          key: 'entryYear',
        },
        {
          title: 'Out Year',
          key: 'outYear',
          dataIndex: 'outYear',
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
          education: 'Magister',
          institution: 'Harvard University',
          entryYear: '2023',
          outYear: '2026',
        },
        {
          key: '2',
          education: 'Sarjana',
          institution: 'Harvard University',
          entryYear: '2023',
          outYear: '2026',
        },
        {
          key: '3',
          education: 'Sekolah Menengah Atas',
          institution: 'SMA Negeri 1 Jakarta',
          entryYear: '2023',
          outYear: '2026',
        },
        {
          key: '4',
          education: 'Sekolah Menengah Pertama',
          institution: 'SMP Negeri 1 Jakarta',
          entryYear: '2023',
          outYear: '2026',
        },
        {
          key: '5',
          education: 'Sekolah Dasar',
          institution: 'SD Negeri 1 Jakarta',
          entryYear: '2023',
          outYear: '2026',
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

export default EducationTable;