import React, { useEffect, useState } from "react";
import { Button, Col, Input, Modal, Row, Tree } from "antd";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./roleConfigDetail.css";

const RoleConfigDetail = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [loading, setLoading] = useState(false);
  const [detailRole, setDetailRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [resource, setResource] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const getSelectedRole = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://attendance-1-r8738834.deta.app/api/v1/role/${uuid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setDetailRole(response.data.role);
      setResource(response.data.resource)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const putSelectedRole = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://attendance-1-r8738834.deta.app/api/v1/role/${uuid}`,
        {
          name: roleName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsEditing(response.data);
      setSuccessModalOpen(true);
    } catch (error) {
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const addPermissionRole = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://attendance-1-r8738834.deta.app/api/v1/role/permission/add`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const deletePermissionRole = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://attendance-1-r8738834.deta.app/api/v1/role/permission/revoke`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getSelectedRole();
  }, [token, navigate]);

  useEffect(() => {
    if (detailRole) {
      setRoleName(detailRole.name);
    }
  }, [detailRole]);

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

  const handleEditRole = () => {
    setIsEditing(true);
  };

  const handleSaveRole = async () => {
    await putSelectedRole();
    setIsEditing(false);
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
      <Row gutter={[16, 8]}>
        <Col xs={24} md={24} lg={24} xl={24} xxl={24}>
          <p>Role Name</p>
          <div className="input-container">
            <Input
              className="input-role-name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              disabled={!isEditing}
            />
            <Button
              className="button-input"
              onClick={isEditing ? handleSaveRole : handleEditRole}
              loading={loading}
            >
              {isEditing ? "Save" : "Edit Role"}
            </Button>
          </div>
        </Col>
      </Row>

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
            onClick={() => navigate(-1)}
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
        fieldNames={{title:"name",key:"uuid",children:"permission"}}
        className="permission-data"
        checkable
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={resource}
        loadData={loading}
      />
    </>
  );
};

export default RoleConfigDetail;
