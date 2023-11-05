import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './failedAddDataModal.css'

const FailedAddDataModal = ({ visible, onClose }) => {
  return (
    <Modal
      open={visible}
      closable={false}
      footer={[]}
      centered={true}
    >
      <div className='modal-container'> 
        <AiOutlineCloseCircle className='icon-modal-failed' />
        <h1 className='failed-title'>Failed</h1>
        <p>Something went wrong!</p>
        <Button key="ok" type="primary" onClick={onClose} className='back-button'>
          Back
        </Button>,
      </div>
    </Modal>
  );
};

export default FailedAddDataModal;
