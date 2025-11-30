import React from 'react'
import { PiWarningCircle } from "react-icons/pi"
import { MdOutlineDelete } from 'react-icons/md'
import { Button, Modal, } from 'antd'
import "./deleteConfirmation.css"

const DeleteConfirmation = () => {
    return (
    <>
        Delete Conformation
    </>
    )
}

export const DeleteConfirmationDialog = ({ onClick, isModalOpen, onOk, onCancel, loading, data}) => {
  return (
    <>
      <Button type="none" style={{margin:0, padding:0}} onClick={onClick}>
        <MdOutlineDelete className="icon-delete" size="25" />
      </Button>
      <Modal
        centered={true}
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
        footer={
          <div>
            <Button type="text" onClick={onCancel}>CANCEL</Button>
            <Button className="delete-button" type="danger" onClick={onOk} loading={loading}>DELETE</Button>
          </div>
        }
      >
        <div className="dialog">
          <PiWarningCircle className="icon-warning" size="70"/>
          <h1>Attention</h1>
          <p>Are you sure delete this {data}?</p>
        </div>
      </Modal>
    </>
  )
}

export default DeleteConfirmation