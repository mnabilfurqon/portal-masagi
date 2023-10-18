import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './searchBox.css';

const SearchBox = () => (
    <Button className="search-box">
        <SearchOutlined className="search-icon" />
        Search
    </Button>
);
export default SearchBox;