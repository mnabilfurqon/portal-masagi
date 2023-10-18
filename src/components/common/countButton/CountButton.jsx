import React from 'react';
import { Select } from 'antd';
import './countButton.css';

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const CountButton = () => (
    <Select
        className="count-button"
      defaultValue="8"
      onChange={handleChange}
      options={[
        {
          value: '4',
          label: '4',
        },
        {
          value: '8',
          label: '8',
        },
        {
          value: '12',
          label: '12',
        },
      ]}
    />
);
export default CountButton;