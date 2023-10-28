import "./roleConfig.css";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import RoleConfigTable from "./tableRole/RoleConfigTable";
import { Button, Input, Modal } from "antd";
import { useState } from "react";

const RoleConfig = ({searchValue, sortValue}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

const addRoleTitle = <div className="add-role-title">Add Role</div>;

  const successTitle = (
    <div className="success-title">
      <AiOutlineCheckCircle size={80} className="success-icon" />
      <p className="success-header">Role added</p>
    </div>
  );

  const failedTitle = (
    <div className="failed-title">
      <AiOutlineCloseCircle size={70} className="failed-icon" />
      <p className="failed-header">Failed</p>
    </div>
  );

  const handleAddRole = () => {
    const operationSucceeded = false;

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
        footer={null}
      >
        <div className="modal-container">
          <p>Role</p>
          <Input placeholder="Employee" className="input-role"/>
          <Button
            key="addRole"
            className="add-role-button"
            onClick={handleAddRole}
          >
            Add Role
          </Button>
        </div>
      </Modal>

      <Modal
        title={successTitle}
        centered
        visible={successModalOpen}
        onCancel={() => setSuccessModalOpen(false)}
        footer={null}
      >
        <div className="modal-success">
          <p>Thanks for adding a new role</p>
          <Button
            key="viewRole"
            className="view-role-button"
            onClick={handleViewRole}
          >
            View Role
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
        <div className="modal-failed">
          <p>Something went wrong!</p>
          <Button
            key="backRole"
            className="back-role-button"
            onClick={handleBackRole}
          >
            Back
          </Button>
        </div>
      </Modal>
  </div>
      <div className="role-table-container">
        <RoleConfigTable searchValue={searchValue} sortValue={sortValue} />
      </div>
    </>
  );
};

export default RoleConfig;
