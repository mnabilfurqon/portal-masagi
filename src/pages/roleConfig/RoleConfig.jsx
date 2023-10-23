import "./roleConfig.css";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import RoleConfigTable from "./tableRole/RoleConfigTable";
import { Button, Input, Modal } from "antd";
import { useState } from "react";

const RoleConfig = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const addRoleTitle = <div className="add-role-title">Add Role</div>;

  const successTitle = (
    <div className="success-title">
      <AiOutlineCheckCircle size={70} className="success-logo" />
      <p>Role added</p>
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

  const handleViewRole = () => {
    setModalOpen(false);
  };

  const handleBackRole = () => {
    setErrorModalOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      <div className="right-buttons">
        <Button onClick={() => setModalOpen(true)} className="add-button">
          <AiOutlinePlus />
          Add Role
        </Button>
        <Modal
          title={addRoleTitle}
          centered
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={[
            <Button
              key="addRole"
              className="add-role-button"
              onClick={handleAddRole}
            >
              Add Role
            </Button>,
          ]}
        >
          <p>Role</p>
          <Input placeholder="Employee" />
        </Modal>
      </div>

      <Modal
        title={successTitle}
        centered
        visible={successModalOpen}
        onCancel={() => setSuccessModalOpen(false)}
        footer={[
          <Button
            key="viewRole"
            className="view-role-button"
            onClick={handleViewRole}
          >
            View Role
          </Button>,
        ]}
      >
        <p>Thanks for adding a new role</p>
      </Modal>

      <Modal
        title={failedTitle}
        centered
        visible={errorModalOpen}
        onCancel={() => setErrorModalOpen(false)}
        footer={[
          <Button
            key="backRole"
            className="back-role-button"
            onClick={handleBackRole}
          >
            Back
          </Button>,
        ]}
      >
        <p className="failed-message">Something went wrong!</p>
      </Modal>

      <div className="role-table-container">
        <RoleConfigTable />
      </div>
    </>
  );
};

export default RoleConfig;
