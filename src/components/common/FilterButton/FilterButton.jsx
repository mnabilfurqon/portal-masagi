import React, {useState} from 'react';
import { Button, Dropdown } from 'antd';
import { BsFilter } from 'react-icons/bs'; // Import the icon
import './filterButton.css';

const FilterButton = ({onFilter}) => {

  const [filterLabel, setFilterLabel] = useState('Filter');

  const items = [
    {
      key: 'active',
      label: 'Active',
    },
    {
      key: 'notActive',
      label: 'Not Active',
    },
    {
      key: 'all',
      label: 'All',
    },
  ];

  const handlerFilter = (e) => {
    const value = e.key;
    onFilter(value);

    if (e.key === 'active') {
      setFilterLabel('Active');
    } else if (e.key === 'notActive') {
      setFilterLabel('Not Active');
    } else {
      setFilterLabel('Filter');
    }
};

  return (
    <Dropdown
        menu={{
          items,
          onClick: handlerFilter,
        }}
        placement="bottomLeft"
      >
        <Button className='filter-button'> <BsFilter className='filter-icon'/>{filterLabel} </Button>
    </Dropdown>
  );
};
export default FilterButton;