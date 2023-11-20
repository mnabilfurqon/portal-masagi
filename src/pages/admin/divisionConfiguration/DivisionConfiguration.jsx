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
import LoadingComponent from '../../../components/loadingComponent/LoadingComponent';
import SearchBox from '../../../components/common/searchBox/SearchBox';
import SortButton from '../../../components/common/sortButton/SortButton';
import CountButton from '../../../components/common/countButton/CountButton';
import { Row, Col } from 'antd';

const DivisionConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [actionValue, setActionValue] = useState("");
  const [uuid, setUuid] = useState("");
  const [defaultDivisionName, setDefaultDivisionName] = useState("");
  const [selectedLoading, setSelectedLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // search handler
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };
  // end of search handler

  // sort handler
  const [sortValue, setSortValue] = useState("");

  const handleSort = (value) => {
    setSortValue(value);
  };
  // end of sort handler

  // count handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };
  // end of count handler

  const itemsSort = [
    {
      key: 'aToZDivision',
      label: 'A-Z Division Name'
    },
    {
      key: 'zToADivision',
      label: 'Z-A Division Name'
    },
  ];

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
      await axios.post("https://attendance-1-r8738834.deta.app/api/v1/division/", {
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
    } finally {
      setAddLoading(false);
    }
  }

  // GET API for Selected Division
  const getSelectedDivision = async () => {
    try {
      const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/division/${uuid}`, {
        headers: {
          "Authorization": token,
        },
      });
      setDefaultDivisionName(response.data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedLoading(false);
    }
  }

  // PUT API for Edit Division
  const editDivision = async () => {
    try {
      await axios.put(`https://attendance-1-r8738834.deta.app/api/v1/division/${uuid}`, {
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
    } finally {
      setEditLoading(false);
    }
  }

  // Delete API for Delete Division
  const deleteDivision = async () => {
    try {
      const response = await axios.delete(`https://attendance-1-r8738834.deta.app/api/v1/division/${uuid}`, {
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
    } finally {
      setDeleteLoading(false);
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
    setSelectedLoading(true);
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
    setDeleteLoading(true);
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
      setAddLoading(true);
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
      setEditLoading(true);
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
      <Row gutter={[16, 8]}>
        <Col xs={24} md={24} lg={10} xl={6} xxl={6}>
          <SearchBox onSearch={handleSearch} />
        </Col>
        <Col xs={14} md={10} lg={10} xl={5} xxl={5}>
          <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
        </Col>
        <Col xs={10} md={4} lg={4} xl={2} xxl={2}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col xs={24} md={10} lg={24} xl={{span: 4, offset: 7}} xxl={{span: 4, offset: 7}}>
          <AddButton buttonText="Add Division" handleClick={isAddButtonClicked}/>
        </Col>
      </Row>

      {addLoading ? <LoadingComponent /> :
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
      }

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

        {selectedLoading || editLoading ? <LoadingComponent /> :
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
        }

        {deleteLoading ? <LoadingComponent /> :
          <DeleteModal
            visible={isDeleteModalOpen}
            handleDelete={handleDeleteButtonDeleteModal}
            handleCancel={handleCancelButtonDeleteModal}
          />
        }

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