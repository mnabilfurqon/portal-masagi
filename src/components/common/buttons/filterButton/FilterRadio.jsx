import React, { useState } from 'react';
import { Button, Dropdown, Radio, Flex, Space } from 'antd';
import { BsFilter } from 'react-icons/bs';
import './filterButton.css';

const FilterRadio = (props) => {
  const { onFilter, radioData, title } = props;
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onFilter(value);
  };

  const handleReset = () => {
    setSelectedValue(null);
    onFilter(null);
  };

  return (
    <Dropdown
      overlay={
        <div>
          <Radio.Group onChange={handleRadioChange} value={selectedValue} className='radio-filter'>
          <Space direction="vertical">
            {radioData.map((radioItem) => (
              <Radio key={radioItem.key} value={radioItem.key}>
                {radioItem.label}
              </Radio>
            ))}
          </Space>
          </Radio.Group>
          <div style={{ marginTop: 5 }}></div>
          {selectedValue !== null && (
            <Button className='button-reset' onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>
      }
      placement='bottom'
    >
      <Flex justify='center' align='center'>
        <Button icon={<BsFilter />} className='filter-button'>
          {title ? title : 'Filter'}
        </Button>
      </Flex>
    </Dropdown>
  );
};

export default FilterRadio;