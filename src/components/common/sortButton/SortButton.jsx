import React, { useState } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { Button, Dropdown } from 'antd';
import './sortButton.css';

const SortButton = ({ onSort }) => {
  const [sortLabel, setSortLabel] = useState('Sort');

  const items = [
    {
      key: 'latest',
      label: 'Latest Join Date',
    },
    {
      key: 'oldest',
      label: 'Oldest Join Date',
    },
  ];

  const handlerSort = e => {
    const value = e.key;
    onSort(value);
    if (e.key === 'latest') {
      setSortLabel('Latest Join Date');
    } else if (e.key === 'oldest') {
      setSortLabel('Oldest Join Date');
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
      placement='bottomLeft'>
      <Button className='sort-button'>
        {' '}
        <BiSortAlt2 className='sort-icon' /> {sortLabel}{' '}
      </Button>
    </Dropdown>
  );
};
export default SortButton;
