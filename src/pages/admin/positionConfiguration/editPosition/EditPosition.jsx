import React, { useState } from 'react';
import "./editPosition.css"
import { Button, Modal, Form, Input, } from 'antd';
import { BiEdit } from "react-icons/bi"

const EditPosition = () => {
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
        title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Edit Position</h2>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="none" loading={loading} onClick={handleOk} className="update-button">
            Save
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
          <Form.Item label="Name">
            <Input placeholder="Name" />
          </Form.Item>
          {/* <Form.Item>
            <Button key="submit" type="submit" loading={loading} onClick={handleOk} className="update-button">
            Save
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  )
}

export default EditPosition