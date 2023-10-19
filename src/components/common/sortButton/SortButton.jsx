import React from 'react';
import { BiSortAlt2 } from "react-icons/bi";
import { Button, Dropdown } from 'antd';
import './sortButton.css';

const items = [
    {
      key: 'aToZ',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          A to Z ⬆️
        </a>
      ),
    },
    {
      key: 'zToA',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          Z to A ⬇️
        </a>
      ),
    },
    {
      key: 'new',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          New
        </a>
      ),
    },
    {
      key: 'old',
      label: (
        <a target="_blank" rel="noopener noreferrer" >
          Old
        </a>
      ),
    },
];

const SortButton = () => (
    <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Button className='sort-button'> <BiSortAlt2 className='sort-icon'/> Sort </Button>
    </Dropdown>
);
export default SortButton;