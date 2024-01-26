import React, { useState } from 'react'
import './addPosition.css'
import { Button, Modal, Form, Input } from 'antd'
import AddButton from '@common/buttons/addButton/AddButton'
import SuccessModal from '@common/modals/successModal/SuccessModal'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'


const AddPosition = (props) => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();
  
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Modal Handler
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Success Modal Handle
  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSuccessModalCancel = () => {
    setIsSuccessModalOpen(false);
  };

  const handleValue = (e) => {
    setValue(e.target.value)
  }
    
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
  
  // // Add Position to API
  // const addPosition = async (values) => {
  //   try {
  //     const response = await axios.post("http://103.82.93.38/api/v1/position/", values, {
  //       headers: {
  //         Authorization: token,
  //       }
  //     });
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //       setIsModalOpen(false);
  //       setIsSuccessModalOpen(true);
  //       setValue("");
  //       console.log("New position added!");
  //     }, 3000);
  //   } catch (error) {
  //     console.log(error, values);
  //   }
  // }
  
  return (
  <>
    <AddButton handleClick={props.showModal} buttonText="Add Position" />

    <Modal
        centered
        open={props.isModalOpen}
        title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Add Position</h2>}
        onCancel={props.onCancel}
        footer={<div></div>}
    >
        <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            onFinish={props.onFinish}
            initialValues={{
                layout: formLayout,
            }}
        >
            <Form.Item label="Name" name="name">
                <Input placeholder="Enter Position Name" name="name" value={value} onChange={handleValue}/>
            </Form.Item>
            <Button htmlType='submit' loading={props.loading} className="add-button">
              Save
            </Button>
        </Form>
    </Modal>

    {/* <SuccessModal action="Add" handleOk={handleSuccessModalOk} handleCancel={handleSuccessModalCancel} isModalOpen={isSuccessModalOpen} /> */}
  </>
  )
}

export default AddPosition