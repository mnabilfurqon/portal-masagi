import React, { useState } from "react";
import { Button, Input, Modal, Tree } from "antd";
import { treeData } from "./constans";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./roleConfigDetail.css";

const RoleConfigDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const successTitle = (
    <div className="success-title">
      <AiOutlineCheckCircle size={80} className="success-logo" />
      <p className="success-text">Success</p>
    </div>
  );

  const failedTitle = (
    <div className="failed-title">
      <AiOutlineCloseCircle size={70} className="failed-logo" />
      <p className="failed-text">Failed</p>
    </div>
  );

  const handleAddRole = () => {
    const operationSucceeded = true;

    if (operationSucceeded) {
      setSuccessModalOpen(true);
    } else {
      setErrorModalOpen(true);
    }

    setModalOpen(false);
  };

  const handleEditRole = () => {
    setModalOpen(false);
  };

  const handleBackRole = () => {
    setErrorModalOpen(false);
    setModalOpen(false);
  };

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <>
      <p>Role Name</p>
      <div className="input-container">
        <Input className="input-role-name" />
        <Button className="button-input" onClick={handleAddRole}>
          Edit Role
        </Button>
      </div>

      <Modal
        title={successTitle}
        centered
        visible={successModalOpen}
        onCancel={() => setSuccessModalOpen(false)}
        footer={null}
      >
        <div className="modal-content">
          <p className="success-caption">Data changes successfull!</p>
          <Button
            key="editRole"
            className="save-button"
            onClick={handleEditRole}
          >
            Ok
          </Button>
        </div>
      </Modal>

      <Modal
        title={failedTitle}
        centered
        visible={errorModalOpen}
        onCancel={() => setErrorModalOpen(false)}
        footer={null}
      >
        <div className="modal-content">
        <p className="failed-caption">Something went wrong!</p>
          <Button
            key="backEdit"
            className="back-edit-button"
            onClick={handleBackRole}
          >
            Back
          </Button>
        </div>
      </Modal>

      <p className="permission-title">Permissions</p>
      <Tree
        checkable
        defaultExpandedKeys={["0", "0"]}
        defaultSelectedKeys={["0", "0"]}
        defaultCheckedKeys={["0", "0"]}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        className="tree-permission"
      />
    </>
  );
};

export default RoleConfigDetail;
