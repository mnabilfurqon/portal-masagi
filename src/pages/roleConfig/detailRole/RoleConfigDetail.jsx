import React from "react";
import { Button, Input, Tree } from "antd";
import { treeData } from "./constans";
import "./roleConfigDetail.css";

const RoleConfigDetail = () => {
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
        <Button className="button-right">Tombol</Button>
      </div>
      <p>Permissions</p>
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
