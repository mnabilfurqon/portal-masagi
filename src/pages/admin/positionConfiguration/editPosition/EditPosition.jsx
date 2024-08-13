import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Form, Input, } from 'antd';
import { BiEdit } from "react-icons/bi";
import "./editPosition.css";
import SuccessModal from '@common/modals/successModal/SuccessModal';
import FailedModal from '@common/modals/failedModal/FailedModal';

const EditPosition = (props) => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [loading, setLoading] = useState(false);

  const [uuid, setUuid] = useState("");
  const [value, setValue] = useState("");

  const [open, setOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  // Handle Modal
  const showModal = () => {
    const key = props.uuid.key;
    setValue(props.uuid.name);

    // console.log(key, value);
    setUuid(key);
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

  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // PUT API to Update Position
  const updatePosition = async () => {
    try {
      // console.log(value);
      const response = await axios.put(`http://103.82.93.38/api/v1/position/${uuid}`, {
          name: value,
        }, {
          headers: { Authorization: token },
        }
      );
      setLoading(true); 
      setTimeout(() => {
        setOpen(false);
        setLoading(false);
        setIsSuccessModalOpen(true);
        console.log("Position updated!");
      }, 3000);
    } catch (error) {
      console.log(error);
      setOpen(false);
      setIsFailedModalOpen(true);
    }
  }

  // Handel onChange Input
  const handleValue = (e) => {
    setValue(e.target.value)
  }

  // Success Modal Handle
  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSuccessModalCancel = () => {
    setIsSuccessModalOpen(false);
  };


  // Failed Modal Handle
  const handleFailedModalOk = () => {
    setIsFailedModalOpen(false);
  };

  const handleFailedModalCancel = () => {
    setIsFailedModalOpen(false);
  };
  
  // Form Layout
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
      {/* Modal Edit */}
      <Button type="none" style={{margin:0, padding:0}} onClick={props.onClick}>
        <BiEdit className="edit-icon" size="25" />
      </Button>

      <Modal
        centered
        open={props.isModalOpen}
        title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Edit Position</h2>}
        onFinish={props.onFinish}
        // onOk={handleOk}
        onCancel={props.onCancel}
        footer={<div></div>}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={props.form}
          initialValues={{
            layout: formLayout,
            // name: props.value,
          }}
        >
          <Form.Item label="Name" name="name">
            <Input placeholder="Input Position Name" value={props.value} onChange={props.onChangeValue}/>
          </Form.Item>

          <Button htmlType="submit" type="none" loading={props.loading} className="add-button" onClick={props.onFinish}>
            Save
          </Button>
        </Form>
      </Modal>

      {/* Modal Success and Failed */}
      <SuccessModal action="Update" handleOk={handleSuccessModalOk} handleCancel={handleSuccessModalCancel} isModalOpen={isSuccessModalOpen} />
      <FailedModal handleOk={handleFailedModalOk} handleCancel={handleFailedModalCancel} isModalOpen={isFailedModalOpen} />
    </>
  )
}

export default EditPosition