import React, {useState} from 'react'
import { Modal, Input, Button } from 'antd'
import "./addEditModal.css"

const AddEditModal = ({visible, title, handleOk, handleCancle, subtitle, placeholder, textButton, onFinishFailed, actionValue, handleActionValue, defaultDivisionName}) => {
    const addTitle = <div className="add-title">{title}</div>
    console.log(defaultDivisionName)

    if (defaultDivisionName) {
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
                <Input placeholder={defaultDivisionName} value={actionValue} className="input-modal" onChange={handleActionValue} allowClear/>
                <Button
                    className="submit-button-modal"
                    onClick={handleOk}
                >
                    {textButton}
                </Button>
                </div>
            </Modal>
        )
    } else {
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
                <Input placeholder={placeholder} value={actionValue} className="input-modal" onChange={handleActionValue} allowClear/>
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
}

export default AddEditModal