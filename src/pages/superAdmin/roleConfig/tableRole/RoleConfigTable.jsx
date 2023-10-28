import React from "react";
import { Modal, Table } from "antd";
import { Button } from "antd";
import { AiOutlineCheckCircle, AiOutlineFileSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import { paginationConfig, tabel_data } from "./constans";
import "./roleConfigTable.css";

const RoleConfigTable = ({searchValue, sortValue}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);

  const successTitle = (
    <div className="success-title">
      <AiOutlineCheckCircle size={80} className="success-logo" />
      <p className="success-text">Success</p>
    </div>
  );
  
  const deleteTitle = (
    <div className="delete-title">
      <PiWarningCircleLight size={70} className="caution-icon" />
      <p className="delete-header">Attention</p>
    </div>
  );

  const handleDeleteButton = () => {
    setDeleteModalOpen(false);
    setDeleteSuccessModalOpen(true);
  }

  const handleCancelButton = () => {
    setDeleteModalOpen(false);
  };

  const showDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const title = [
    {
      key: "roleName",
      title: "Role Name",
      dataIndex: "roleName",
    },
    {
      key: "action",
      title: <div className="action-title">Action</div>,
      render: () => (
        <div className="action-container">
          <Link to="/role/detail-role">
            <Button className="detail-button" type="primary" size="small" ghost>
              <AiOutlineFileSearch className="detail-icon" />
            </Button>
          </Link>
          <Button
            className="delete-button"
            type="primary"
            size="small"
            onClick={showDeleteModal}
            ghost
          >
            <BiTrash className="delete-icon" />
          </Button>
        </div>
      ),
    },
  ];

  // Filter data berdasarkan searchValue
  const filteredData = tabel_data.filter(item =>
    item.roleName.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Sort data berdasarkan sortValue
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortValue === 'aToZ') {
      return a.roleName.localeCompare(b.roleName);
    } else if (sortValue === 'zToA') {
      return b.roleName.localeCompare(a.roleName);
    } else {
      return 0;
    }
  });

  return (
    <>
      <Table
        columns={title}
        dataSource={sortedData}
        pagination={paginationConfig}
      />
      <Modal
        title={deleteTitle}
        centered
        visible={deleteModalOpen}
        onCancel={handleCancelButton}
        footer={[
          <Button
            type="text"
            key="cancelButton"
            className="cancel-delete-role"
            onClick={handleCancelButton}
          >
            CANCEL
          </Button>,
          <Button key="deleteButton" className="delete-role" onClick={handleDeleteButton}>
            DELETE
          </Button>,
        ]}
      >
        <p className="delete-caption">Are you sure delete this role?</p>
      </Modal>

      <Modal
        title={successTitle}
        centered
        visible={deleteSuccessModalOpen}
        onCancel={() => setDeleteSuccessModalOpen(false)}
        footer={null}
      >
        <div className="modal-content">
          <p className="success-caption">Delete successfull!</p>
          <Button
            key="successDeleteRole"
            className="save-button"
          >
            Ok
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RoleConfigTable;
