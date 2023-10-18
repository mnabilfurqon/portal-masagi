import React from 'react';
import { BiSortAlt2 } from "react-icons/bi";
import { Button } from 'antd';
import './sortButton.css';

const sortButton = () => (
    <Button className="sort-button">
        <BiSortAlt2 className="sort-icon" />
        Sort
    </Button>
);
export default sortButton;