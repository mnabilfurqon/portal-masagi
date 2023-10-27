import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './searchBox.css';
import { Input } from 'antd';

const SearchBox = ({onSearch}) => {

    const [searchValue, setSearchValue] = useState('');
    
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    }

    return (
        <Input 
            className="search-box"
            prefix={<SearchOutlined />} 
            value={searchValue}
            onChange={handleChange}
            placeholder="Search" 
            allowClear
        />
    );
};

export default SearchBox;