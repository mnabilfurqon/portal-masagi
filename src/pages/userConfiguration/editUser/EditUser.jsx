import React, { useState } from 'react';
import "./editUser.css"
import { Button, Modal, Form, Input, Select, Radio } from 'antd';
import { BiEdit } from "react-icons/bi"

const editUser = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;

  return (
    <>
      <Button type="none" style={{margin:0, padding:0}} onClick={showModal}>
        <BiEdit className="edit-icon" size="25" />
      </Button>
      <Modal
        // centered
        open={open}
        title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Edit User</h2>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="none" loading={loading} onClick={handleOk} className="update-button">
            Update
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item label="Password">
            <Input placeholder="Password" value=""/>
          </Form.Item>
          <Form.Item label="Role">
            <Select>
              <Select.Option value="demo">User</Select.Option>
              <Select.Option value="demo">Admin</Select.Option>
              <Select.Option value="demo">Super Admin</Select.Option>
              <Select.Option value="demo">Human Resource</Select.Option>
              <Select.Option value="demo">Finance</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status">
            <Radio.Group>
              <Radio value="1">Actice</Radio>
              <Radio value="0">Not Active</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
export default editUser;