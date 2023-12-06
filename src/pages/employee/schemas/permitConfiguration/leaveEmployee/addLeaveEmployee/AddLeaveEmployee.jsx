import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./addLeaveEmployee.css";

const AddLeaveEmployee = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dateFormatList = "YYYY-MM-DD";
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const addLeave = async (values) => {
    try {
      setLoading(true);
      values.permit_date = dayjs(values.permit_date, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      await axios.post("", values, {
        headers: {
          Authorization: token,
        },
      });
      setSuccessModalOpen(true);
    } catch (error) {
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const successTitle = (
    <div className="success-title-leave">
      <AiOutlineCheckCircle size={80} className="success-logo-leave" />
      <p className="success-text-leave">Success</p>
    </div>
  );

  const failedTitle = (
    <div className="failed-title-leave">
      <AiOutlineCloseCircle size={70} className="failed-logo-leave" />
      <p className="failed-text-leave">Failed</p>
    </div>
  );

  const handleBackAdd = () => {
    setErrorModalOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      <Form
        form={form}
        className="add-leave-form"
        labelCol={{
          className: "add-leave-label",
          xs: { span: 15 },
          sm: { span: 10 },
          md: { span: 6 },
          lg: { span: 4 },
          xl: { span: 3 },
          xxl: { span: 2 },
        }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        initialValues={{
          permit_date: dayjs("1970-01-01", dateFormatList),
        }}
      >
        <Form.Item
          label="Type Leave"
          name="typeLeave"
          rules={[
            { required: true, message: "Please choose your type leave!" },
          ]}
        >
          <Select placeholder="Choose Type Leave" className="type-leave-select">
            <Select.Option value="cuti-sakit">Cuti Sakit</Select.Option>
            <Select.Option value="cuti-hari-besar-keagamaan">
              Cuti Hari Besar Keagamaan
            </Select.Option>
            <Select.Option value="cuti-hari-libur-nasional">
              Cuti Hari Libur Nasional
            </Select.Option>
            <Select.Option value="cuti-hamil">Cuti Hamil</Select.Option>
            <Select.Option value="cuti-haji">Cuti Haji</Select.Option>
            <Select.Option value="cuti-umrah">Cuti Umrah</Select.Option>
            <Select.Option value="cuti-menikah">Cuti Menikah</Select.Option>
            <Select.Option value="cuti-kedukaan">Cuti Kedukaan</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Reason"
          name="reason"
          rules={[{ required: true, message: "Please input your reason!" }]}
        >
          <TextArea
            rows={4}
            placeholder="Enter Reason"
            className="reason-input"
          />
        </Form.Item>
        <Form.Item
          label="Permit Date"
          name="permit-date"
          rules={[
            { required: true, message: "Please input your permit date!" },
          ]}
        >
          <DatePicker placeholder="YYYY/MM/DD" className="permit-input" />
        </Form.Item>
        <Form.Item
          label="End Permit Date"
          name="end-permit-date"
          rules={[
            {
              required: true,
              message: "Please input your end permit date!",
            },
          ]}
        >
          <DatePicker placeholder="YYYY/MM/DD" className="end-permit-input" />
        </Form.Item>
        <Form.Item label="HR" name="hr">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Team Leader" name="team-leader">
          <Input disabled />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="link"
            className="cancel-button-leave"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            className="request-button-leave"
            htmlType="submit"
            onClick={addLeave}
            loading={loading}
          >
            Request
          </Button>
        </div>
      </Form>

      <Modal
        title={successTitle}
        centered
        visible={successModalOpen}
        onCancel={() => setSuccessModalOpen(false)}
        footer={null}
      >
        <div className="modal-content-leave">
          <p className="success-caption-leave">Leave has been requested</p>
          <Button
            key="addLeave"
            className="save-add-button"
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
        <div className="modal-content-leave">
          <p className="failed-caption-leave">Something went wrong!</p>
          <Button
            key="backLeave"
            className="back-add-button"
            onClick={handleBackAdd}
          >
            Back
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default AddLeaveEmployee;
