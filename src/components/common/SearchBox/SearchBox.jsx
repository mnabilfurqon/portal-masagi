import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './searchBox.css';
import { Input } from 'antd';

const SearchBox = () => (
    <Input 
        className="search-box" 
        prefix={<SearchOutlined/>} 
        placeholder="Search" 
        allowClear 
    />
);
export default SearchBox;