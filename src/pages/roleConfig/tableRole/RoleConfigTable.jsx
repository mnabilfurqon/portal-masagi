import React from "react";
import { Table } from "antd";
import { Button } from "antd";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import "./roleConfigTable.css"

const RoleConfigTable = () => {
  const colums = [
    {
      key: "roleName",
      title: "Role Name",
      dataIndex: "roleName"
    },
    {
      key: "action",
      title: "Action",
      render: () => (
        <>
            <Button className="action-button" type="primary" size="small" ghost>
                <AiOutlineFileSearch className="action-icon" />
            </Button>
            <Button className="action-button" type="primary" size="small" ghost>
                <BiTrash className="action-icon" />
            </Button>
        </>
    ),
    }
  ]
  
  const data = [
    {
      key: 1,
      roleName: "Super Admin",
    },
    {
      key: 2,
      roleName: "Admin",
    }
  ]

  return (
    <>
      <Table columns={colums} dataSource={data} rowClassName="custom-row" />
    </>
  );
};

export default RoleConfigTable;
