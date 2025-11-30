import { useEffect, useState } from "react";
import { Button, Col, Flex, Input, Modal, Row, Tree, Alert } from "antd";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./roleConfigDetail.css";
import { dummyRoles } from "../../../../components/common/dummy/DummyRoles";
import { dummyPermissions } from "../../../../components/common/dummy/DummyPermissions";

const RoleConfigDetail = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [loading, setLoading] = useState(false);
  const [detailRole, setDetailRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [resource, setResource] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [rolePermission, setRolePermission] = useState([]);
  const [notify, setNotify] = useState(false);

  const getSelectedRole = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 400));

      const roleFound = dummyRoles.find((item) => item.uuid === uuid);

      if (!roleFound) {
        console.log("Role not found in dummy");
        return;
      }

      setDetailRole(roleFound);

      setResource(dummyPermissions);

      const currentPerms = roleFound.permission.map(
        (item) => item.permission.uuid
      );

      setCheckedKeys(currentPerms);
      setRolePermission(currentPerms);
    } catch (err) {
      console.log("Dummy role error:", err);
    } finally {
      setLoading(false);
    }
  };

  const putSelectedRole = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 400));

      const index = dummyRoles.findIndex((r) => r.uuid === uuid);
      if (index !== -1) {
        dummyRoles[index].name = roleName;
        dummyRoles[index].updated_date = new Date().toISOString();
      }

      setSuccessModalOpen(true);
    } catch (err) {
      console.log("Dummy update error:", err);
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const addPermissionRole = async (permissions) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 400));

      const index = dummyRoles.findIndex((r) => r.uuid === uuid);

      if (index !== -1) {
        permissions.forEach((p) => {
          dummyRoles[index].permission.push({
            permission: { uuid: p, name: p },
          });
        });
      }

      setNotify(true);
      getSelectedRole();
    } catch (err) {
      console.log("Dummy error:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setNotify(false), 2000);
    }
  };

  const deletePermissionRole = async (permissions) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 400));

      const index = dummyRoles.findIndex((r) => r.uuid === uuid);

      if (index !== -1) {
        dummyRoles[index].permission = dummyRoles[index].permission.filter(
          (item) => !permissions.includes(item.permission.uuid)
        );
      }

      setNotify(true);
      getSelectedRole();
    } catch (err) {
      console.log("Dummy error:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setNotify(false), 2000);
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

  const getDifferece = (arr1, arr2) => {
    const result = arr1.filter((item) => {
      return !arr2.includes(item);
    });
    return result;
  };

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
  const onCheck = (key, info) => {
    const value = info.checkedNodesPositions.filter((item) => {
      if (item.pos.length > 4) return item;
    });
    setCheckedKeys([...value.map((item) => item.node.uuid)]);
  };

  const handleUpdatePermission = async () => {
    const newPermission = getDifferece(checkedKeys, rolePermission);
    const deletePermission = getDifferece(rolePermission, checkedKeys);
    if (newPermission.length > 0) {
      await addPermissionRole(newPermission);
    }
    if (deletePermission.length > 0) {
      await deletePermissionRole(deletePermission);
    }
  };

  return (
    <>
      <Row
        gutter={[16, 8]}
        style={{
          position: "relative",
        }}
      >
        {notify && (
          <Alert
            message="Permission Updated"
            type="success"
            style={{
              textAlign: "center",
              left: "50%",
              position: "absolute",
              width: "24rem",
              zIndex: 100,
              transform: "translate(-50%, 0)",
            }}
          />
        )}
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

      <Flex
        justify="space-between"
        align="end"
        style={{
          padding: "5px",
        }}
      >
        <p className="permission-title">Permissions</p>
        <Button
          className="button-input"
          style={{
            width: "150px",
          }}
          onClick={handleUpdatePermission}
        >
          Update Permission
        </Button>
      </Flex>
      <Tree
        fieldNames={{
          title: "name",
          key: "uuid",
          children: "permission",
        }}
        className="permission-data"
        checkable
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={resource}
      />
    </>
  );
};

export default RoleConfigDetail;
