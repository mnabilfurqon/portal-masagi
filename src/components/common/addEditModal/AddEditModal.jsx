import React from 'react'
import { Modal, Input, Button } from 'antd'
import "./addEditModal.css"

const AddEditModal = ({visible, title, handleOk, handleCancle, subtitle, placeholder, textButton, onFinishFailed}) => {
    const addTitle = <div className="add-title">{title}</div>
    
    return (
        <Modal
        open={visible}
        title={addTitle}
        onOk={handleOk}
        onCancel={handleCancle}
        onFinishFailed={onFinishFailed}
        centered={true}
        footer={null}
        >
            <div className="modal-add-container">
            <p className='subtitle'>{subtitle}</p>
            <Input required placeholder={placeholder} className="input-modal" allowClear/>
            <Button
                className="submit-button-modal"
                onClick={handleOk}
            >
                {textButton}
            </Button>
            </div>
      </Modal>
  )
}

export default AddEditModal