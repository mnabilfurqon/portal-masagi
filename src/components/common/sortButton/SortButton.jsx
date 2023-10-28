import React, {useState} from 'react';
import { BiSortAlt2 } from "react-icons/bi";
import { Button, Dropdown } from 'antd';
import './sortButton.css';

const SortButton = ({onSort}) => {

  const [sortLabel, setSortLabel] = useState('Sort');

  const items = [
    {
      key: 'aToZ',
      label: 'A to Z'
    },
    {
      key: 'zToA',
      label: 'Z to A'
    },
    {
      key: 'latest',
      label: 'Latest'
    },
    {
      key: 'oldest',
      label: 'Oldest'
    },
    {
      key: 'default',
      label: 'Default'
    }
  ];

  const handlerSort = (e) => {
    const value = e.key;
    onSort(value);
    if (e.key === 'aToZ') {
      setSortLabel('A to Z');
    } else if (e.key === 'zToA') {
      setSortLabel('Z to A');
    } else if (e.key === 'latest') {
      setSortLabel('Latest');
    } else if (e.key === 'oldest') {
      setSortLabel('Oldest');
    } else {
      setSortLabel('Sort');
    }
};

  return (
    <Dropdown
        menu={{
          items,
          onClick: handlerSort,
        }}
        placement="bottomLeft"
      >
        <Button className='sort-button'> <BiSortAlt2 className='sort-icon'/> {sortLabel} </Button>
    </Dropdown>
  )
};
export default SortButton;