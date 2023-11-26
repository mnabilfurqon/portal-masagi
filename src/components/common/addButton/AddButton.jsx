import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from 'antd';
import './addButton.css';

const addButton = ({ buttonText, handleClick }) => (
    <Button icon={<AiOutlinePlus/>} className="add-button" onClick={handleClick}>
        {buttonText}
    </Button>
);
export default addButton;