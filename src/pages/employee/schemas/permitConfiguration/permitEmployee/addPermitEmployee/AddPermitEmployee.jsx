import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { MdDriveFolderUpload } from "react-icons/md";
import "./addPermitEmployee.css";

const AddPermitEmployee = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dateFormatList = "YYYY-MM-DD";
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const addPermit = async (values) => {
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

  const beforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("Only PDF files are allowed!");
    }

    const isSizeAccepted = file.size / 1024 / 1024 <= 5;
    if (!isSizeAccepted) {
      message.error("File must be no more than 5 MB!");
    }

    return isPDF && isSizeAccepted;
  };

  const handleBackAdd = () => {
    setErrorModalOpen(false);
    setModalOpen(false);
  };

  const successTitle = (
    <div className="success-title-permit">
      <AiOutlineCheckCircle size={80} className="success-logo-permit" />
      <p className="success-text-permit">Success</p>
    </div>
  );

  const failedTitle = (
    <div className="failed-title-permit">
      <AiOutlineCloseCircle size={70} className="failed-logo-permit" />
      <p className="failed-text-permit">Failed</p>
    </div>
  );

  return (
    <>
      <Form
        form={form}
        className="add-permit-form"
        labelCol={{
          className: "add-permit-label",
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
          label="Type permit"
          name="typepermit"
          rules={[
            { required: true, message: "Please choose your type permit!" },
          ]}
        >
          <Select
            placeholder="Choose Type permit"
            className="type-permit-select"
          >
            <Select.Option value="izin-tidak-masuk">
              Izin Tidak Masuk
            </Select.Option>
            <Select.Option value="izin-khusus">Izin Khusus</Select.Option>
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
        <Form.Item
          label="Upload File"
          name="upload-file"
          rules={[
            {
              required: true,
              message: "Please choose your file!",
            },
          ]}
        >
          <Upload
            beforeUpload={beforeUpload}
            maxCount={1}
            accept=".pdf"
            progress={{
              strokeColor: {
                "0%": "#629093",
                "100%": "#73B3B7",
              },
              strokeWidth: 3,
              format: (percent) => `${percent} %`,
            }}
          >
            <Button
              className="upload-button-file"
              icon={<MdDriveFolderUpload />}
            >
              Choose File
            </Button>
          </Upload>
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
            className="cancel-button-permit"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            className="request-button-permit"
            htmlType="submit"
            onClick={addPermit}
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
        <div className="modal-content-permit">
          <p className="success-caption-permit">Permit has been requested</p>
          <Button
            key="addPermit"
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
        <div className="modal-content-permit">
          <p className="failed-caption-permit">Something went wrong!</p>
          <Button
            key="backPermit"
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
export default AddPermitEmployee;
