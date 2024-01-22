import React, { useState } from 'react'
import axios from 'axios'
import { PiWarningCircleBold } from "react-icons/pi"
import { MdOutlineDelete } from 'react-icons/md'
import { Button, Modal, Space } from 'antd'
import "./deleteConfirmation.css"
import SuccessModal from '../modals/successModal/SuccessModal'
import FailedModal from '../modals/failedModal/FailedModal'

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
  // Declaration
  const [uuid, setUuid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  // Confirmastion Dialog Handler
  const showModal = () => {
    setUuid(props.uuid);
    setIsModalOpen(true);
    // console.log(uuid);
  };

  const handleOk = (event) => {
    if (props.data === "Position") {
      try {
        const response = axios.delete(`http://103.82.93.38/api/v1/position/${uuid}`);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setIsModalOpen(false);
          setIsSuccessModalOpen(true);
          setUuid("");
          event.preventDefault();
          console.log("Position deleted!");
        }, 3000);
      } catch (error) {
        console.log(error);
        setIsFailedModalOpen(true);
      }
    } 
    // else if (props.data === "User") {
    //   try {
    //     const response = axios.delete(`http://103.82.93.38/api/v1/users/${uuid}`);
    //     setIsModalOpen(false);
    //     setIsSuccessModalOpen(true);
    //     event.preventDefault();
    //     setUuid("");
    //     console.log("Deleted");
    //   } catch (error) {
    //     console.log(error);
    //     setIsFailedModalOpen(true);
    //   }
    // }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Success Modal Handle
  const handleSuccessModalOk = (event) => {
    setIsSuccessModalOpen(false);
    event.preventDefault();
  };

  const handleSuccessModalCancel = () => {
    setIsSuccessModalOpen(false);
  };


  // Failed Modal Handle
  const handleFailedModalOk = () => {
    setIsFailedModalOpen(false);
  };

  const handleFailedModalCancel = () => {
    setIsFailedModalOpen(false);
  };

  return (
    <>
      <Button type="none" style={{margin:0, padding:0}} onClick={showModal}>
        <MdOutlineDelete className="icon-delete" size="25" />
      </Button>
      <Modal
        centered={true}
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

      <SuccessModal action="Delete" isModalOpen={isSuccessModalOpen} handleOk={handleSuccessModalOk} handleCancel={handleSuccessModalCancel} />
      <FailedModal isModalOpen={isFailedModalOpen} handleOk={handleFailedModalOk} handleCancel={handleFailedModalCancel} />
    </>
  )
}

export default DeleteConfirmation