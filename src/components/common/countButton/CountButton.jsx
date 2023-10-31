import React, {useState} from 'react';
import { Select } from 'antd';
import './countButton.css';

const CountButton = ({onCount}) => {

  const [countValue, setCountValue] = useState('10');

  const handleChange = (value) => {
    setCountValue(value);
    onCount(value);
  }

  return (
    <Select
      className="count-button"
      defaultValue="8"
      value={countValue}
      onChange={handleChange}
      options={[
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
        {
          value: '6',
          label: '6',
        },
        {
          value: '7',
          label: '7',
        },
        {
          value: '8',
          label: '8',
        },
        {
          value: '9',
          label: '9',
        },
        {
          value: '10',
          label: '10',
        },
      ]}
    />
  )
};
export default CountButton;