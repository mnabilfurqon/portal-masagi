import React from 'react'
import "./positionConfiguration.css"
import EditPosition from './editPosition/EditPosition'
import { Table, Space, } from "antd"
import { DeleteConfirmationDialog } from '@common/deleteConfirmation/DeleteConfirmation'
import AddPosition from './addPosition/AddPosition'

const PositionConfiguration = ({searchValue, sortValue, countValue}) => {
  // Table
  const columns = [
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
      width: '88%',
      // sorter: (record1, record2) => { return record1.username > record2.username }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <EditPosition />
          <DeleteConfirmationDialog data="position"/>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'General Manager',
    },
    {
      key: '2',
      name: 'Supervisor',
    },
    {
      key: '3',
      name: 'Human Resource',
    },
];

    // Filter data berdasarkan searchValue
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Sort data berdasarkan sortValue
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortValue === 'aToZ') {
        return a.name.localeCompare(b.name);
      } else if (sortValue === 'zToA') {
        return b.name.localeCompare(a.name);
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
      <div className='right-buttons'>
        <AddPosition />
      </div>
      <div>
        <Table columns={columns} dataSource={sortedData} pagination={paginationConfig} />
      </div>
    </>
  )
}

export default PositionConfiguration