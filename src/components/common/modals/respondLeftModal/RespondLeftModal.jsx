import React from 'react'
import { Modal, Button } from 'antd';
import './respondLeftModal.css'
import { AiOutlineCheckCircle } from 'react-icons/ai';

const RespondLeftModal = (props) => {
    const { visible, handleOk, textButton, dialogText, dialogTitle } = props;
    return (
        <Modal
        open={visible}
        onOk={handleOk}
        centered={true}
        footer={
            <div>
                <Button className="ok-button" type="danger" onClick={handleOk}>{textButton}</Button>
            </div>
        }
        width={400}
        closable={false}
        >
            <div>
                <AiOutlineCheckCircle style={{color: '#28A745'}} size="70"/>
                <h1>{dialogTitle}</h1>
                <p>{dialogText}</p>
            </div>
        </Modal>
    )
}

export default RespondLeftModal