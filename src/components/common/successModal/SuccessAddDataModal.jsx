import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './successAddDataModal.css';

const SuccessAddDataModal = ({ visible, onClose, textParagraph }) => {
  return (
    <Modal
      open={visible}
      closable={false}
      footer={[]}
      centered={true}
    >
      <div className='modal-container'>
        <AiOutlineCheckCircle className='icon-modal-success' />
        <h1 className='success-title'>Success</h1>
        <p>{textParagraph}</p>
        <Button key="ok" type="primary" onClick={onClose} className='ok-button'>
          OK
        </Button>,
      </div>
    </Modal>
  );
};

export default SuccessAddDataModal;
