import React from 'react';
import { Table, Button, Space } from 'antd';
import './divisionTable.css'
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const DivisionTable = ({isDeleteButtonClicked, isEditButtonClicked, searchValue, sortValue}) => {

    const columns = [
        {
          title: 'Division',
          dataIndex: 'division',
          key: 'division',
        },
        {
          title: <div className="action-title">Action</div>,
          key: 'action',
            render: () => (
              <div className="action-container">
                <Space size="medium">
                    <Button className="action-button" type="primary" size="small" onClick={isEditButtonClicked} ghost>
                        <BiEdit className="action-icon-edit" />
                    </Button>
                    <Button className="action-button" type="primary" size="small" onClick={isDeleteButtonClicked} ghost>
                        <MdOutlineDelete className="action-icon-delete" />
                    </Button>
                </Space>
              </div>
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

    // Filter data berdasarkan searchValue
    const filteredData = data.filter(item =>
      item.division.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Sort data berdasarkan sortValue
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortValue === 'aToZ') {
        return a.division.localeCompare(b.division);
      } else if (sortValue === 'zToA') {
        return b.division.localeCompare(a.division);
      } else {
        return 0;
      }
    });

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
            dataSource={sortedData}
            pagination={paginationConfig}
            rowClassName="custom-row"  
        />
      </>
    )
}

export default DivisionTable;