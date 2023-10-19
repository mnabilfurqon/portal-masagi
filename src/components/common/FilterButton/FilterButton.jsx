import React from 'react';
import { Button, Dropdown } from 'antd';
import { BsFilter } from 'react-icons/bs'; // Import the icon
import './filterButton.css';

const items = [
  {
    key: 'active',
    label: (
      <a target="_blank" rel="noopener noreferrer" >
        Active
      </a>
    ),
  },
  {
    key: 'notActive',
    label: (
      <a target="_blank" rel="noopener noreferrer" >
        Not Active
      </a>
    ),
  },
];

const FilterButton = () => (
    <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Button className='filter-button'> <BsFilter className='filter-icon'/> Filter </Button>
    </Dropdown>
);
export default FilterButton;