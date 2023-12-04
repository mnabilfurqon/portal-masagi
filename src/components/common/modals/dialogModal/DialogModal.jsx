import React from 'react'
import './dialogModal.css'
import { Modal, Button } from 'antd';

const DialogModal = (props) => {
    const { visible, handleYes, handleNo, textNoOption, textYesOption, dialogTitle, dialogText } = props;
    return (
        <Modal
        open={visible}
        onYes={handleYes}
        onNo={handleNo}
        onCancel={handleNo}
        centered={true}
        footer={
            <div>  
                <Button className="no-button" onClick={handleNo}>{textNoOption}</Button>
                {textYesOption === "APPROVE" ? <Button className="yes-button" onClick={handleYes}>{textYesOption}</Button> :
                <Button className="reject-button" onClick={handleYes}>{textYesOption}</Button> }
            </div>
        }
        width={450}
        closable={false}
        >
            <div>
                <h1>{dialogTitle}</h1>
                <p>{dialogText}</p>
            </div>
        </Modal>
    )
}

export default DialogModal