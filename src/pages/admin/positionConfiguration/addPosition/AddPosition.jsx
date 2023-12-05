import React, { useState } from 'react'
import "./addPosition.css"
import { Button, Modal, Form, Input, } from 'antd'
import { AiOutlinePlus } from "react-icons/ai"
import AddButton from '@common/addButton/AddButton'


const AddPosition = () => {
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
    <AddButton handleClick={showModal} buttonText="Add Position" />

    <Modal
        centered
        open={open}
        title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Add Position</h2>}
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
                <Input placeholder="Enter Position Name" />
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

export default AddPosition