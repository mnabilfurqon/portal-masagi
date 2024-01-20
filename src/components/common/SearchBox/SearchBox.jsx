import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import './searchBox.css';
import { Input } from 'antd';

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
            prefix={<IoIosSearch/>} 
            value={searchValue}
            onChange={handleChange}
            placeholder='Search'
            allowClear
        />
    );
};

export default SearchBox;