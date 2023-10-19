import React from 'react'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Button, Dropdown } from 'antd';
import { InputNumber } from 'antd';
import { Table, Tag, Flex } from 'antd';
import './userConfiguration.css'
import SearchBox from '../../components/common/SearchBox/SearchBox'
import FilterButton from '../../components/common/FilterButton/FilterButton'
import SortButton from '../../components/common/SortButton/SortButton'
import CountButton from '../../components/common/countButton/CountButton'
import AddButton from '../../components/common/addButton/AddButton'

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
        //   render: (text) => <a>{text}</a>,
        },
        {
          title: 'Password',
          dataIndex: 'password',
          key: 'password',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: 'Status',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = 'green';
                if (tag === '0') {
                  color = 'volcano';
                  tag = 'Not Active';
                } else {
                  tag='Active';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Edit</a>
              <a>Delete</a>
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
          tags: ['1'],
        },
        {
          key: '2',
          username: 'JimGreen',
          password: 'JimG42',
          role: 'Admin',
          tags: ['0'],
        },
        {
          key: '3',
          username: 'JoeBlack',
          password: 'JoeB32',
          role: 'Admin',
          tags: ['1'],
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

        <Flex horizontal gap="large">
            <SearchBox />
            <FilterButton />
            <SortButton />
            <CountButton />
        </Flex>
        <br />

        <div>
            <Table columns={columns} dataSource={data} />
        </div>
        </>
    )
}

export default UserConfiguration