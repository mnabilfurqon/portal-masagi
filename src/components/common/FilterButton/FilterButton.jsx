import React from 'react';
import { BsFilter } from "react-icons/bs";
import { Button } from 'antd';
import './filterButton.css';

const filterButton = () => (
    <Button className="filter-button">
        <BsFilter className="filter-icon" />
        Filter
    </Button>
);
export default filterButton;