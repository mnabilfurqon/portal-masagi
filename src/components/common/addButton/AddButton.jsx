import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from 'antd';
import './addButton.css';

const addButton = ({ buttonText }) => (
    <Button className="add-button">
        <AiOutlinePlus className="add-icon" />
        {buttonText}
    </Button>
);
export default addButton;