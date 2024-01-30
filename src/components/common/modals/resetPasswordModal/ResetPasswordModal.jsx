import React, {useState} from 'react'
import { Modal, Input, Button } from 'antd'
import "./resetPasswordModal.css"

const ResetPasswordModal = (props) => {
    const { visible, handleOk, handleCancle, onFinishFailed, loading, handleNewPassword, handleConfirmNewPassword, messageError, newPassword, confirmNewPassword } = props;
    const addTitle = <div className="add-title">Reset Password</div>;
    let placeholderNewPassword;
    let placeholderConfirmNewPassword;
    if (newPassword === '') {
        placeholderNewPassword = "Please enter new password"
    } else {
        placeholderNewPassword = newPassword
    }

    if (confirmNewPassword === '') {
        placeholderConfirmNewPassword = "Please enter confirmation new password"
    } else {
        placeholderConfirmNewPassword = confirmNewPassword
    }

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
                <p className='subtitle-input'>New Password</p>
                <Input.Password type='password' placeholder={placeholderNewPassword} value={newPassword} onChange={handleNewPassword}/>
                <p className='subtitle-input' style={{marginTop: 10}}>Confirmation New Password</p>
                <Input.Password placeholder={placeholderConfirmNewPassword} value={confirmNewPassword} onChange={handleConfirmNewPassword}/>
                {messageError && <p className="error-message" style={{marginBottom: 0}}>{messageError}</p>}
                {newPassword === '' || confirmNewPassword === '' ?
                <Button
                    className="reset-password-button-modal-disabled"
                    disabled
                    onClick={handleOk}
                    loading={loading}
                    style={{marginTop: 40}}
                >
                   Reset Password 
                </Button>
                :
                <Button
                    className="reset-password-button-modal"
                    onClick={handleOk}
                    loading={loading}
                    style={{marginTop: 40}}
                >
                     Reset Password
                </Button>
                }
                </div>
            </Modal>
        )
}

export default ResetPasswordModal