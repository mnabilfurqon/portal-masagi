import React, {useState} from 'react'
import { Modal, Input, Button } from 'antd'
import "./addEditModal.css"

const AddEditModal = (props) => {
    const {visible, title, handleOk, handleCancle, subtitle, placeholder, textButton, onFinishFailed, actionValue, handleActionValue, defaultDivisionName, loading} = props
    const addTitle = <div className="add-title">{title}</div>

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
                {actionValue !== '' ?
                <Button
                    className="submit-button-modal"
                    onClick={handleOk}
                    loading={loading}
                >
                    {textButton}
                </Button>
                :
                <Button
                    className="submit-button-modal-disabled"
                    onClick={handleOk}
                    loading={loading}
                    disabled
                >
                    {textButton}
                </Button>
                }
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
                {actionValue !== '' ?
                <Button
                    className="submit-button-modal"
                    onClick={handleOk}
                    loading={loading}
                >
                    {textButton}
                </Button>
                : 
                <Button
                    className="submit-button-modal-disabled"
                    onClick={handleOk}
                    loading={loading}
                    disabled
                >
                    {textButton}
                </Button>
                }
                </div>
            </Modal>
        )
    }
}

export default AddEditModal