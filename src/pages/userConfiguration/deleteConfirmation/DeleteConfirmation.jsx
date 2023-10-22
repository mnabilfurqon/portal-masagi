import React from 'react'
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

export default DeleteConfirmation