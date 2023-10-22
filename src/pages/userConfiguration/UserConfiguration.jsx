import React from 'react'
// import { AudioOutlined } from '@ant-design/icons'
// import { Input } from 'antd'
// import { Button, Dropdown } from 'antd'
// import { InputNumber } from 'antd'
import { Table, Tag, Flex, Space } from 'antd'
import { BiEdit } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md"
import './userConfiguration.css'
import SearchBox from '../../components/common/SearchBox/SearchBox'
import FilterButton from '../../components/common/FilterButton/FilterButton'
import SortButton from '../../components/common/SortButton/SortButton'
import CountButton from '../../components/common/countButton/CountButton'
import EditUser from './editUser/EditUser'
import DeleteConfirmation from './deleteConfirmation/DeleteConfirmation'

const UserConfiguration = () => {
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
          sorter: (record1, record2) => {
            return record1.username > record2.username
          }
        //   render: (text) => <a>{text}</a>,
        },
        {
          title: 'Password',
          dataIndex: 'password',
          key: 'password',
          sorter: (record1, record2) => {
            return record1.password > record2.password
          }
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          sorter: (a, b) => {
            return a.role > b.role
          }
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
                  status = 'Not Active';
                } else {
                  status='Active';
                }
                return (
                  <Tag color={color} key={status}>
                    {status}
                  </Tag>
                );
              })}
            </>
          ),          
          sorter: (record1, record2) => {
            return record1.is_active > record2.is_active
          }
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="small">
              {/* <a><BiEdit className="icon-edit" size="20" /></a>
              <a><MdOutlineDelete className="icon-delete" size="20" /></a> */}
              <EditUser />
              <DeleteConfirmation />
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

        <Flex horizontal="true" gap="large">
            <SearchBox />
            <FilterButton />
            <SortButton />
            <CountButton />
        </Flex>
        <br />

        <div>
            <Table columns={columns} dataSource={data} />
        </div>

        <div>
          {/* <EditUser /> */}
        </div>
        </>
    )
}

export default UserConfiguration