import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './searchBox.css';
import { Input } from 'antd';

const onSearch = (value, _e, info) => console.log(info?.source, value);

const SearchBox = () => (
    <Input 
        className="search-box" 
        prefix={<SearchOutlined/>} 
        onSearch={onSearch}
        placeholder="Search" 
        allowClear 
    />
);
export default SearchBox;