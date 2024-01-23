import React, { useState } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { Button, Dropdown } from 'antd';
import './sortButton.css';

const SortButton = ({onSort, items}) => {
  const [sortLabel, setSortLabel] = useState('Sort');

  const labelMap = {
    latestJoinDate: 'Latest Join Date',
    oldestJoinDate: 'Oldest Join Date',
    aToZCompany: 'A-Z Company Name',
    zToACompany: 'Z-A Company Name',
    aToZRole: 'A-Z Role Name',
    zToARole: 'Z-A Role Name',
    aToZDivision: 'A-Z Division Name',
    zToADivision: 'Z-A Division Name',
    aToZEmployee: 'A-Z Employee Name',
    zToAEmployee: 'Z-A Employee Name',
    aToZProject: 'A-Z Project Name',
    zToAProject: 'Z-A Project Name',
    aToZTask: 'A-Z Task Name',
    zToATask: 'Z-A Task Name',
    latestOvertimeDate: 'Latest Overtime Date',
    oldestOvertimeDate: 'Oldest OverTime Date',
    latestEndPermitDate: 'Latest End Permit Date',
    oldestEndPermitDate: 'Oldest End Permit Date',
  };

  const handlerSort = e => {
    const value = e.key;
    onSort(value);
    setSortLabel(labelMap[value] || 'Sort');
};

  return (
    <Dropdown
        menu={{
          items,
          onClick: handlerSort,
        }}
        placement="bottom">
        <Button icon={<BiSortAlt2/>} className='sort-button'>
          {' '}{sortLabel}{' '}
        </Button>
    </Dropdown>
  );
};
export default SortButton;
