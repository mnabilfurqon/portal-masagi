import React, {useState, useEffect} from 'react';
import { Select } from 'antd';
import './countButton.css';

const CountButton = ({onCount}) => {

  const [countValue, setCountValue] = useState('10');

  const handleChange = (value) => {
    setCountValue(value);
    onCount(value);
  }

  useEffect(() => {
    onCount(countValue);
  }, [countValue, onCount]);

  return (
    <Select
      className="count-button"
      value={countValue}
      onChange={handleChange}
      options={[
        {
          value: '5',
          label: '5',
        },
        {
          value: '10',
          label: '10',
        },
        {
          value: '25',
          label: '25',
        },
        {
          value: '50',
          label: '50',
        },
        {
          value: '100',
          label: '100',
        },
      ]}
    />
  )
};
export default CountButton;