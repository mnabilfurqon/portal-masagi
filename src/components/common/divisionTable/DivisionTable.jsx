import React from 'react';
import { Table, Button, Space } from 'antd';
import './divisionTable.css'
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const DivisionTable = ({isDeleteButtonClicked, isEditButtonClicked}) => {

    const columns = [
        {
          title: 'Division',
          dataIndex: 'division',
          key: 'division',
          width: 3000,
        },
        {
          title: 'Action',
          key: 'action',
            render: () => (
                <Space size="small">
                    <Button className="action-button" type="primary" size="small" onClick={isEditButtonClicked} ghost>
                        <BiEdit className="action-icon-edit" />
                    </Button>
                    <Button className="action-button" type="primary" size="small" onClick={isDeleteButtonClicked} ghost>
                        <MdOutlineDelete className="action-icon-delete" />
                    </Button>
                </Space>
            ),
        },
    ];
      
    const data = [
        {
          key: '1',
          division: 'Human Resource',
        },
        {
          key: '2',
          division: 'Finance',
        },
        {
          key: '3',
          division: 'IT',
        },
        {
          key: '4',
          division: 'Marketing',
        },
        {
          key: '5',
          division: 'Quality Management & Research',
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

export default DivisionTable;