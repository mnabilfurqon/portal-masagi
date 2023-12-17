import React from 'react'
import { Button } from 'antd';
import './submitButton.css';

const SubmitButton = ({buttonText}) => {
  return (
    <>
        <Button type="primary" htmlType="submit" className='submit-button'>
            {buttonText}
        </Button>
    </>
  )
}

export default SubmitButton