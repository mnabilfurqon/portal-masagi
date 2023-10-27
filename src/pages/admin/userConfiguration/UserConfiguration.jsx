import React from 'react'
// import { AudioOutlined } from '@ant-design/icons'
// import { Input } from 'antd'
// import { Button, Dropdown } from 'antd'
// import { InputNumber } from 'antd'
import { Table, Tag, Space } from 'antd'
import './userConfiguration.css'
import EditUser from './editUser/EditUser'
import { DeleteConfirmationDialog } from '../../../components/common/deleteConfirmation/DeleteConfirmation'
import SuccessModal from '../../../components/common/successModal/SuccessModal'
import FailedModal from '../../../components/common/failedModal/FailedModal'
import { SuccessUpdateModal } from '../../../components/common/successModal/SuccessModal'

const UserConfiguration = ({searchValue}) => {
    // // Search
    // const { Search } = Input;
    // const onSearch = (value, _e, info) => console.log(info?.source, value);

    // // Filter
    // const items = [
    //     {
    //       key: '1',
    //       label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //           Active
    //         </a>
    //       ),
    //     },
    //     {
    //       key: '2',
    //       label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
    //           Not Active
    //         </a>
    //       ),
    //     },
    // ];

    // // Sort
    // const sort = [
    //     {
    //       key: '1',
    //       label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //           A to Z
    //         </a>
    //       ),
    //     },
    //     {
    //       key: '2',
    //       label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
    //           Z to A
    //         </a>
    //       ),
    //     },
    // ];

    // // View by Number
    // const onChange = (value) => {
    //     console.log('changed', value);
    // };

    // Table
    const columns = [
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          // sorter: (record1, record2) => { return record1.username > record2.username }
        //   render: (text) => <a>{text}</a>,
        },
        {
          title: 'Password',
          dataIndex: 'password',
          responsive: ["sm"],
          key: 'password',
          // sorter: (record1, record2) => { return record1.password > record2.password }
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          responsive: ["md"],
          // sorter: (a, b) => { return a.role > b.role }
        },
        {
          title: 'Status',
          key: 'is_active',
          dataIndex: 'is_active',
          render: (_, { is_active }) => (
            <>
              {is_active.map((status) => {
                let color = 'green';
                if (status === '0') {
                  color = 'volcano';
                  status = 'not active';
                } else {
                  status='active';
                }
                return (
                  <Tag color={color} key={status} style={{borderRadius: 25}}>
                    {status}
                  </Tag>
                );
              })}
            </>
          ),
          responsive: ["md"],
          // sorter: (record1, record2) => { return record1.is_active > record2.is_active }
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="small">
              <EditUser />
              <DeleteConfirmationDialog data="account"/>
            </Space>
          ),
        },
    ];
    const data = [
        {
          key: '1',
          username: 'JohnBrown',
          password: "JohnB32",
          role: 'User',
          is_active: ['1'],
        },
        {
          key: '2',
          username: 'JimGreen',
          password: 'JimG42',
          role: 'Admin',
          is_active: ['0'],
        },
        {
          key: '3',
          username: 'JoeBlack',
          password: 'JoeB32',
          role: 'Admin',
          is_active: ['1'],
        },
    ];

    // Filter data berdasarkan searchValue
    const filteredData = data.filter(item =>
      item.username.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
        {/* <Flex horizontal gap="middle"
            style={{
                marginBottom: 20
            }}
            >
            <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />

            <Dropdown
                menu={{ items }}
                placement="bottom" >
                    <Button>Filter</Button>
            </Dropdown>

            <Dropdown
                menu={{ items }}
                placement="bottom" >
                    <Button>Sort</Button>
            </Dropdown>

            <InputNumber min={1} max={100000} defaultValue={3} onChange={onChange} style={{ width:50 }}/>
              </Flex>*/}

        <div>
            <Table columns={columns} dataSource={filteredData} />
        </div>

        <div>
          <SuccessModal action="Delete"/>
          <FailedModal />
          <SuccessUpdateModal />
        </div>
        </>
    )
}

export default UserConfiguration