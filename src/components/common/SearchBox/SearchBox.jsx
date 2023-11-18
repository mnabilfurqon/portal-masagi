import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './searchBox.css';
import { Input, Row, Col } from 'antd';

const SearchBox = ({onSearch}) => {

    const [searchValue, setSearchValue] = useState('');
    
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    }

    useEffect(() => {
        onSearch(searchValue);
    }, [searchValue, onSearch]);

    return (
        <Input 
            className='search-box'
            prefix={<SearchOutlined/>} 
            value={searchValue}
            onChange={handleChange}
            placeholder='Search'
            allowClear
        />
    );
};

export default SearchBox;