import React from "react";
import { Table } from "antd";
import { Button } from "antd";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import "./roleConfigTable.css";

const RoleConfigTable = () => {
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
          <Button className="detail-button" type="primary" size="small" ghost>
            <AiOutlineFileSearch className="detail-icon" />
          </Button>
          <Button className="delete-button" type="primary" size="small" ghost>
            <BiTrash className="delete-icon" />
          </Button>
        </div>
      ),
    },
  ];

  const tabel_data = [
    {
      key: 1,
      roleName: "Super Admin",
    },
    {
      key: 2,
      roleName: "Admin",
    },
  ];

  const paginationConfig = {
    pageSize: 10, // Jumlah item per halaman
    showTotal: (total, range) => (
      <span style={{ color: "#556172" }}>
        Page {Math.ceil(range[0] / paginationConfig.pageSize)} of{" "}
        {Math.ceil(total / paginationConfig.pageSize)}
      </span>
    ),
    showLessItems: true,
  };

  return (
    <>
      <Table
        columns={title}
        dataSource={tabel_data}
        pagination={paginationConfig}
      />
    </>
  );
};

export default RoleConfigTable;
