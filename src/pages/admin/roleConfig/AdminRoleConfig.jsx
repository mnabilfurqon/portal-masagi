import "./adminRoleConfig.css";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import RoleConfigTable from "./tableRole/AdminRoleConfigTable";
import { Button, Input, Modal } from "antd";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminRoleConfigTable from "./tableRole/AdminRoleConfigTable";

const AdminRoleConfig = ({ searchValue, sortValue, countValue }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const addRole = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/role/",
        {
          name: roleName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setModalOpen(false);
      setSuccessModalOpen(true);
      setRoleName("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleActionValue = (e) => {
    setRoleName(e.target.value);
  };

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
    if (roleName.trim() !== "") {
      addRole();
    } else {
      setErrorModalOpen(true);
    }
  };

  const handleViewRole = () => {
    setModalOpen(false);
    setSuccessModalOpen(false);
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
            <Input
              placeholder="Employee"
              className="input-role"
              value={roleName}
              onChange={handleActionValue}
            />
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
        <AdminRoleConfigTable
          searchValue={searchValue}
          sortValue={sortValue}
          countValue={countValue}
          modalOpen={modalOpen}
        />
      </div>
    </>
  );
};

export default AdminRoleConfig;
