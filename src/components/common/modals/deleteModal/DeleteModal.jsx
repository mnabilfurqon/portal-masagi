import React from 'react'
import { PiWarningCircleBold } from "react-icons/pi";
import { Modal, Button } from 'antd';
import './deleteModal.css'

const DeleteModal = (props) => {
  const {visible, handleDelete, handleCancel, textModal, loading} = props;
  return (
    <Modal
    open={visible}
    onDelete={handleDelete}
    onCancel={handleCancel}
    centered={true}
    footer={
        <div>
            <Button className="cancel-delete-button" type="none" onClick={handleCancel}>CANCEL</Button>
            <Button className="delete-button-modal" loading={loading} type="danger" onClick={handleDelete}>DELETE</Button>
        </div>
    }
    >
        <div className="dialog">
            <PiWarningCircleBold className="icon-warning" size="70"/>
            <h1>Attention</h1>
            <p>{textModal}</p>
        </div>
    </Modal>
  )
}

export default DeleteModal