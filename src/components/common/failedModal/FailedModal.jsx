import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import "./failedModal.css"
import { VscError } from "react-icons/vsc"

const FailedModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    return (
    <>
        <Button type="none" onClick={showModal}>
          Failed
        </Button>
        <Modal
            open={isModalOpen}
            centered
            closable={false}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={
                <center>
                <Button type="none" onClick={handleOk} className="failed-button">
                  Back
                </Button>
                </center>
            }
        >
          <center>
            <VscError style={{ color: "#dc3545" }} size="100"/>
            <h1>Failed</h1>
            <p>Something went wrong!</p>
          </center>
        </Modal>
    </>
    )
}

export default FailedModal