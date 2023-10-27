import React, { useState } from 'react'
import "./divisionConfiguration.css"
import AddButton from '../../../components/common/addButton/AddButton'
import DivisionTable from '../../../components/common/divisionTable/DivisionTable'
import DeleteModal from '../../../components/common/deleteModal/DeleteModal'
import SuccessDeleteModal from '../../../components/common/successModal/SuccessDeleteModal'
import AddEditModal from '../../../components/common/addEditModal/AddEditModal'
import SuccessAddDataModal from '../../../components/common/successModal/SuccessAddDataModal'
import FailedAddDataModal from '../../../components/common/failedModal/FailedAddDataModal'

const DivisionConfiguration = ({searchValue}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessDeleteModalOpen, setIsSuccessDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessAddDataModalOpen, setIsSuccessAddDataModalOpen] = useState(false);
  const [isFailedAddDataModalOpen, setIsFailedAddDataModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuccessEditDataModalOpen, setIsSuccessEditDataModalOpen] = useState(false);

  // Open Delete Modal 
  const isDeleteButtonClicked = () => {
    setIsDeleteModalOpen(true);
  };

  // Open Add Modal
  const isAddButtonClicked = () => {
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const isEditButtonClicked = () => {
    setIsEditModalOpen(true);
  };

  // Delete Modal Handler
  const handleDeleteButtonDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setIsSuccessDeleteModalOpen(true);
  };

  // Cancel Delete Modal Handler
  const handleCancelButtonDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Success Delete Modal Handler
  const handleOkSuccessDeleteModal = () => {
    setIsSuccessDeleteModalOpen(false);
  }

  // Add Modal Handler
  const handleOkAddModal = () => {
    setIsAddModalOpen(false);
    setIsSuccessAddDataModalOpen(true);
  }

  // Cancel Add Modal Handler
  const handleCancelAddModal = () => {
    setIsAddModalOpen(false);
  }

  // Success Add Modal Handler
  const handleOkSuccessAddDataModal = () => {
    setIsSuccessAddDataModalOpen(false);
  }

  // Edit Modal Handler
  const handleOkEditModal = () => {
    setIsEditModalOpen(false);
    setIsSuccessEditDataModalOpen(true);
  }

  // Cancel Edit Modal Handler
  const handleCancelEditModal = () => {
    setIsEditModalOpen(false);
  }

  // Success Edit Modal Handler
  const handleOkSuccessEditDataModal = () => {
    setIsSuccessEditDataModalOpen(false);
  }

  // Failed Add Modal Handler
  const onFinishFailed = () => {
    setIsFailedAddDataModalOpen(true);
  }

  // Failed Add Modal Handler
  const handleOkFailedAddDataModal = () => {
    setIsFailedAddDataModalOpen(false);
  }

  return (
    <>
        <div className='right-buttons'>
            <AddButton buttonText="Add Division" handleClick={isAddButtonClicked}/>
            <AddEditModal
            visible={isAddModalOpen}
            title = "Add Division"
            handleOk={handleOkAddModal}
            subtitle="Division"
            placeholder="Enter Division name"
            textButton="Add Division"
            handleCancle={handleCancelAddModal}
            onFinishFailed={onFinishFailed}
            />
        </div>
        <div className='division-table-container'>

            <DivisionTable
            isDeleteButtonClicked={isDeleteButtonClicked}
            isEditButtonClicked={isEditButtonClicked}
            searchValue={searchValue}
            />

            <AddEditModal
            visible={isEditModalOpen}
            title = "Edit Name"
            handleOk={handleOkEditModal}
            subtitle="Division"
            placeholder="Edit Division name"
            textButton="Save"
            handleCancle={handleCancelEditModal}
            onFinishFailed={onFinishFailed}
            />

            <DeleteModal
            visible={isDeleteModalOpen}
            handleDelete={handleDeleteButtonDeleteModal}
            handleCancel={handleCancelButtonDeleteModal}
            />

            <SuccessDeleteModal
            visible={isSuccessDeleteModalOpen}
            onClose={handleOkSuccessDeleteModal}
            />

            <SuccessAddDataModal
            visible={isSuccessAddDataModalOpen}
            onClose={handleOkSuccessAddDataModal}
            textParagraph="Data upload successful!"
            />

            <SuccessAddDataModal
            visible={isSuccessEditDataModalOpen}
            onClose={handleOkSuccessEditDataModal}
            textParagraph="Data changes successful!"
            />

            <FailedAddDataModal
            visible={isFailedAddDataModalOpen}
            onClose={handleOkFailedAddDataModal}
            />
      </div>
    </>
  )
}

export default DivisionConfiguration