import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import "./successModal.css"
import { GoCheckCircle } from "react-icons/go"

const SuccessModal = (props) => {
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
          Success
        </Button>
        <Modal
            open={isModalOpen}
            centered
            closable={false}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={
                <center>
                <Button type="none" onClick={handleOk} className="success-button">
                  OK
                </Button>
                </center>
            }
        >
          <center>
            <GoCheckCircle style={{ color: "#28a745" }} size="100"/>
            <h1>Success</h1>
            <p>{props.action} successfull</p>
          </center>
        </Modal>
    </>
    )
}

export const SuccessUpdateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleUpdate = () => {
    console.log("Berhasil di-update!")
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="none" onClick={showModal}>
        Update Success
      </Button>
      <Modal
        open={isModalOpen}
        centered
        onOk={handleUpdate}
        onCancel={handleClose}
        footer={
          <Button type="none" onClick={handleUpdate} className="update-button">
            View Account
          </Button>
        }
      >
        <div style={{padding: 20, margin:0, paddingBottom:0}}>
          <GoCheckCircle style={{ color: "#28a745" }} size="70"/>
          <h1 style={{fontWeight:600}}>User Updated</h1>
          <p>Thanks for updating user account!</p>
        </div>
      </Modal>
    </>
  )
}

export default SuccessModal