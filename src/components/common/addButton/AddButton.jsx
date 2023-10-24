import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from 'antd';
import './addButton.css';

const addButton = ({ buttonText, handleClick }) => (
    <Button className="add-button" onClick={handleClick}>
        <AiOutlinePlus className="add-icon" />
        {buttonText}
    </Button>
);
export default addButton;