import "./roleConfigTable.css";
import { Modal, Table } from "antd";
import { Button } from "antd";
import { AiOutlineCheckCircle, AiOutlineFileSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import axios from "axios";
import Cookies from "js-cookie";
import { dummyRoles } from "../../../../components/common/dummy/DummyRoles"

const RoleConfigTable = (props) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { searchValue, sortValue, countValue, modalOpen } = props;
  const [uuid, setUuid] = useState(null);
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: countValue,
      showTotal: (total, range) => (
        <div className="total-data">
          {range[0]}-{range[1]} of {total} items
        </div>
      ),
      showLessItems: true,
    },
  });
  const [params, setParams] = useState({
    page: tableParams.pagination.current,
    per_page: tableParams.pagination.pageSize,
  });

  const getRoleData = async () => {
    try {
      setLoading(true);

      // Simulate delay API
      await new Promise((resolve) => setTimeout(resolve, 400));

      let data = [...dummyRoles];

      // SEARCH
      if (searchValue) {
        data = data.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      // SORT BY DATE OR NAME
      if (sortValue === "latestJoinDate") {
        data.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        );
      } else if (sortValue === "oldestJoinDate") {
        data.sort(
          (a, b) => new Date(a.created_date) - new Date(b.created_date)
        );
      } else if (sortValue === "aToZRole") {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortValue === "zToARole") {
        data.sort((a, b) => b.name.localeCompare(a.name));
      }

      // PAGINATION
      const totalItems = data.length;
      const startIndex = (tableParams.pagination.current - 1) * countValue;
      const paginatedData = data.slice(startIndex, startIndex + countValue);

      setRoleData(paginatedData);

      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: totalItems,
          pageSize: countValue,
        },
      }));
    } catch (err) {
      console.log("Dummy role error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoleData = async () => {
    try {
      setDeleting(true);

      await new Promise((resolve) => setTimeout(resolve, 400));

      // Remove role from dummyRoles
      const index = dummyRoles.findIndex((item) => item.uuid === uuid);
      if (index !== -1) dummyRoles.splice(index, 1);
    } catch (err) {
      console.log("Dummy delete error:", err);
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setDeleteSuccessModalOpen(true);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getRoleData();
  }, [token, navigate, modalOpen, params, countValue, searchValue, sortValue]);

  const handleDetailClick = (record) => {
    const value = record.key;
    navigate(`/role/detail-role/${value}`);
  };

  const handleDeleteButton = (record) => {
    setDeleteModalOpen(true);
    setUuid(record.key);
  };

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

  const reloadTableData = () => {
    getRoleData();
  };

  const handleCancelButton = () => {
    setDeleteModalOpen(false);
  };

  const title = [
    {
      key: "roleName",
      title: "Role Name",
      dataIndex: "roleName",
    },
    {
      key: "company",
      title: "Company",
      dataIndex: "company",
    },
    {
      key: "action",
      title: <div className="action-title">Action</div>,
      render: (record) => (
        <div className="action-container">
          <Button
            className="detail-button"
            type="primary"
            onClick={() => handleDetailClick(record)}
            size="small"
            ghost
          >
            <AiOutlineFileSearch className="detail-icon" />
          </Button>
          <Button
            className="delete-button"
            type="primary"
            size="small"
            onClick={() => handleDeleteButton(record)}
            ghost
          >
            <BiTrash className="delete-role-icon" />
          </Button>
        </div>
      ),
    },
  ];

  const tabel_data = roleData.map((item) => {
    return {
      key: item.uuid,
      roleName: item.name,
      createdDate: item.created_date,
      updatedDate: item.updated_date,
      // company: item.company ? item.company.company_name : null,
      company: `PT UPI EDU ${Math.floor(Math.random() * 100)}`, // data dummy company
      company_uuid: item.company ? item.company.uuid : null,
    };
  });

  const sortedData = [...tabel_data].sort((a, b) => {
    if (sortValue === "aToZRole") {
      return a.roleName.localeCompare(b.roleName);
    } else if (sortValue === "zToARole") {
      return b.roleName.localeCompare(a.roleName);
    } else {
      return 0;
    }
  });

  const handleTableChange = (pagination, sorter) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
        pageSize: countValue,
      },
      ...sorter,
    });

    setParams({
      page: pagination.current,
      per_page: pagination.pageSize,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setRoleData([]);
    }
  };

  return (
    <>
      <Table
        columns={title}
        dataSource={sortedData}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: true, y: 650 }}
      />
      <Modal
        title={deleteTitle}
        centered
        open={deleteModalOpen}
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
          <Button
            key="deleteButton"
            className="delete-role"
            onClick={deleteRoleData}
            loading={deleting}
          >
            DELETE
          </Button>,
        ]}
      >
        <p className="delete-caption">Are you sure delete this role?</p>
      </Modal>

      <Modal
        title={successTitle}
        centered
        open={deleteSuccessModalOpen}
        onCancel={() => setDeleteSuccessModalOpen(false)}
        footer={null}
      >
        <div className="modal-content">
          <p className="success-caption">Delete successfull!</p>
          <Button
            key="successDeleteRole"
            className="save-button"
            onClick={() => {
              setDeleteSuccessModalOpen(false);
              reloadTableData();
            }}
          >
            Ok
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RoleConfigTable;
