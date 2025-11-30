import "./roleConfig.css";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { Button, Col, Input, Modal, Row } from "antd";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBox from "@common/SearchBox/SearchBox";
import SortButton from "@common/buttons/sortButton/SortButton";
import CountButton from "@common/buttons/countButton/CountButton";
import { sortData } from "./constans";
import RoleConfigTable from "./tableRole/RoleConfigTable";
import { dummyRoles } from "../../../components/common/dummy/DummyRoles";
import { v4 as uuidv4 } from "uuid";

const RoleConfig = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [countValue, setCountValue] = useState("10");

  const addRole = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const newRole = {
        uuid: uuidv4(),
        name: roleName,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
        permission: [],
      };

      dummyRoles.push(newRole);

      setModalOpen(false);
      setSuccessModalOpen(true);
      setRoleName("");
    } catch (err) {
      console.log("Dummy add role error:", err);
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
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
      <AiOutlineCloseCircle size={70} className="failed-role-icon" />
      <p className="failed-role-header">Failed</p>
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

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSort = (value) => {
    setSortValue(value);
  };

  const handleCount = (value) => {
    setCountValue(value);
  };

  return (
    <>
      <Row gutter={[16, 8]}>
        <Col xs={24} md={7} lg={8} xl={6} xxl={6}>
          <SearchBox onSearch={handleSearch} />
        </Col>
        <Col xs={12} md={5} lg={4} xl={4} xxl={3}>
          <SortButton
            className="sort-button"
            onSort={handleSort}
            items={sortData}
          />
        </Col>
        <Col xs={12} md={4} lg={3} xl={2} xxl={2}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col
          xs={24}
          md={8}
          lg={{ span: 5, offset: 4 }}
          xl={{ span: 4, offset: 8 }}
          xxl={{ span: 4, offset: 6 }}
        >
          <Button onClick={() => setModalOpen(true)} className="add-button">
            <AiOutlinePlus />
            Add Role
          </Button>
        </Col>

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
              className="add-role-buttons"
              onClick={handleAddRole}
              loading={loading}
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
      </Row>

      <div className="role-table-container">
        <RoleConfigTable
          searchValue={searchValue}
          sortValue={sortValue}
          countValue={countValue}
          modalOpen={modalOpen}
        />
      </div>
    </>
  );
};

export default RoleConfig;
