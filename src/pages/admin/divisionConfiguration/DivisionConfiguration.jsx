import React, { useState, useEffect } from 'react'
import "./divisionConfiguration.css"
import AddButton from '../../../components/common/addButton/AddButton'
import DivisionTable from '../../../components/common/divisionTable/DivisionTable'
import DeleteModal from '../../../components/common/deleteModal/DeleteModal'
import SuccessDeleteModal from '../../../components/common/successModal/SuccessDeleteModal'
import AddEditModal from '../../../components/common/addEditModal/AddEditModal'
import SuccessAddDataModal from '../../../components/common/successModal/SuccessAddDataModal'
import FailedAddDataModal from '../../../components/common/failedModal/FailedAddDataModal'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const DivisionConfiguration = ({searchValue, sortValue, countValue}) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [actionValue, setActionValue] = useState("");
  const [uuid, setUuid] = useState("");
  const [defaultDivisionName, setDefaultDivisionName] = useState("");

  // Handler Declaration
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessDeleteModalOpen, setIsSuccessDeleteModalOpen] = useState(false);
  const [isFailedDeleteModalOpen, setIsFailedDeleteModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessAddDataModalOpen, setIsSuccessAddDataModalOpen] = useState(false);
  const [isFailedAddDataModalOpen, setIsFailedAddDataModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuccessEditDataModalOpen, setIsSuccessEditDataModalOpen] = useState(false);
  const [isFailedEditDataModalOpen, setIsFailedEditDataModalOpen] = useState(false);

  const handleActionValue = (e) => {
      setActionValue(e.target.value)
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // POST API for Add Division
  const addDivision = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/v1/division/", {
        "name": actionValue,
      }, {
        headers: {
          "Authorization": token,
        },
      });
      setIsAddModalOpen(false);
      setIsSuccessAddDataModalOpen(true);
      setActionValue("");
    } catch (error) {
      console.log(error);
    }
  }

  // GET API for Selected Division
  const getSelectedDivision = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/division/${uuid}`, {
        headers: {
          "Authorization": token,
        },
      });
      setDefaultDivisionName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  }

  // PUT API for Edit Division
  const editDivision = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/division/${uuid}`, {
        "name": actionValue,
      }, {
        headers: {
          "Authorization": token,
        },
      });
      setIsEditModalOpen(false);
      setIsSuccessEditDataModalOpen(true);
      setActionValue("");
    } catch (error) {
      console.log(error);
    } 
  }
  
  // Delete API for Delete Division
  const deleteDivision = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/v1/division/${uuid}`, {
        headers: {
          "Authorization": token,
        },
      });
      console.log(response);
      setIsDeleteModalOpen(false);
      setIsSuccessDeleteModalOpen(true);
    } catch (error) {
      setIsFailedDeleteModalOpen(true);
      console.log(error);
    }
  }

  // Open Delete Modal 
  const isDeleteButtonClicked = (record) => {
    const value = record.key;
    setUuid(value);
    setIsDeleteModalOpen(true);
  };

  // Open Add Modal
  const isAddButtonClicked = () => {
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const isEditButtonClicked = (record) => {
    const value = record.key;
    setUuid(value);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (uuid) {
      getSelectedDivision();
    }
  }, [uuid]);

  useEffect(() => {
    getSelectedDivision();
  }, [isEditModalOpen]);

  // Delete Modal Handler
  const handleDeleteButtonDeleteModal = () => {
    deleteDivision();
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
    if (actionValue.trim() !== "") {
      addDivision();
    } else {
      setIsFailedAddDataModalOpen(true);
    }
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
    if (actionValue.trim() !== "") {
      editDivision();
    } else {
      setIsFailedEditDataModalOpen(true);
    }
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

  // Failed Edit Modal Handler
  const handleOkFailedEditDataModal = () => {
    setIsFailedEditDataModalOpen(false);
  }

  const handleOkFailedDeleteDataModal = () => {
    setIsFailedDeleteModalOpen(false);
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
            actionValue={actionValue}
            handleActionValue={handleActionValue}
            />
        </div>
        <div className='division-table-container'>

            <DivisionTable
            isDeleteButtonClicked={isDeleteButtonClicked}
            isEditButtonClicked={isEditButtonClicked}
            searchValue={searchValue}
            sortValue={sortValue}
            countValue={countValue}
            isAddModalOpen={isAddModalOpen}
            isEditModalOpen={isEditModalOpen}
            isDeleteModalOpen={isDeleteModalOpen}
            />

            <AddEditModal
            visible={isEditModalOpen}
            title = "Edit Name"
            handleOk={handleOkEditModal}
            subtitle="Division"
            textButton="Save"
            handleCancle={handleCancelEditModal}
            onFinishFailed={onFinishFailed}
            defaultDivisionName={defaultDivisionName}
            actionValue={actionValue}
            handleActionValue={handleActionValue}
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

            <FailedAddDataModal
            visible={isFailedEditDataModalOpen}
            onClose={handleOkFailedEditDataModal}
            />

            <FailedAddDataModal
            visible={isFailedDeleteModalOpen}
            onClose={handleOkFailedDeleteDataModal}
            />
      </div>
    </>
  )
}

export default DivisionConfiguration