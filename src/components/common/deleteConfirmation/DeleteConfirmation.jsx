import React, { useState } from 'react'
import "./deleteConfirmation.css"
import { PiWarningCircleBold } from "react-icons/pi";
import { MdOutlineDelete } from 'react-icons/md';
import { Button, Modal, Space } from 'antd';

const DeleteConfirmation = () => {
    const { confirm } = Modal;
    const showDeleteConfirm = () => {
        confirm({
          title: 'Attention',
          // icon: <PiWarningCircleBold className="icon-warning" size="40"/>,
          content:
            <div>
                Are you sure delete this account?
            </div>,
          okText: 'DELETE',
          okType: 'danger',
          cancelText: 'CANCEL',
          onOk() {
            console.log('Delete');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

    return (
    <>
        <Button onClick={showDeleteConfirm} type="none">
            <MdOutlineDelete className="icon-delete" size="20" />
        </Button>
    </>
    )
}

export const DeleteConfirmationDialog = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log('Deleted');
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="none" style={{margin:0, padding:0}} onClick={showModal}>
        <MdOutlineDelete className="icon-delete" size="25" />
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div>
            <Button className="cancel-button" type="none" onClick={handleCancel}>CANCEL</Button>
            <Button className="delete-button" type="danger" onClick={handleOk}>DELETE</Button>
          </div>
        }
      >
        <div className="dialog">
          <PiWarningCircleBold className="icon-warning" size="70"/>
          <h1>Attention</h1>
          <p>Are you sure delete this {props.data}?</p>
        </div>
      </Modal>
    </>
  )
}

export default DeleteConfirmation