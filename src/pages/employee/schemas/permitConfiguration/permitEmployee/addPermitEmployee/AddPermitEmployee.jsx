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
  const dateFormatList = "DD/MM/YYYY";
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [typePermit, setTypePermit] = useState([]);
  const [employeeData, setEmployeeData] = useState();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileIn, setFileIn] = useState(null);

  const addPermit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      values.date_permit = dayjs(values.date_permit, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      values.end_date_permit = dayjs(values.end_date_permit, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      const data = excludeObject(values, ['team_leader','hr'])
      const form = new FormData();
      form.append("type_permit_uuid", data.type_permit_uuid);
      form.append("reason", data.reason);
      form.append("date_permit", data.date_permit);
      form.append("end_date_permit", data.end_date_permit);
      form.append("additional_file", data.additional_file.file);
      await axios.post("http://103.82.93.38/api/v1/permit/", form, {
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

  const excludeObject = (obj, key) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([k]) => !key.includes(k))
    );
  };

  const getTypePermit = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://103.82.93.38/api/v1/type_permit/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTypePermit(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterArray = typePermit.slice(9,11)

  const getSelectedLeave = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://103.82.93.38/api/v1/employee/get_hr_lead`, {
        headers: {
          Authorization: token,
        },
      });
      setEmployeeData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getTypePermit()
    getSelectedLeave()
  }, [token, navigate]);

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const handleCaptureIn = url => {
    fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], "photo_in.png", { type: "image/png"})
      setFileIn(file)
  })
  }

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
        onFinish={addPermit}
      >
        <Form.Item
          label="Type permit"
          name="type_permit_uuid"
          rules={[
            { required: true, message: "Please choose your type permit!" },
          ]}
        >
          <Select placeholder="Choose Type permit" className="type-permit-select">
            {filterArray.map((item) => (
              <Select.Option key={item.uuid} value={item.uuid}>
                {item.name}
              </Select.Option>
            ))}
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
          name="date_permit"
          rules={[
            { required: true, message: "Please input permit date!" },
          ]}
        >
          <DatePicker
            placeholder="DD/MM/YYYY"
            className="permit-input"
            format={dateFormatList}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label="End Permit Date"
          name="end_date_permit"
          rules={[
            {
              required: true,
              message: "Please input end permit date!",
            },
          ]}
        >
          <DatePicker
            placeholder="DD/MM/YYYY"
            className="end-permit-input"
            format={dateFormatList}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label="Upload File"
          name="additional_file"
          rules={[
            {
              required: true,
              message: "Please choose your file!",
            },
          ]}
        >
          <Upload
            beforeUpload={handleCaptureIn}
            maxCount={1}
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
          <Input placeholder={employeeData?.hr_employee.name} disabled />
        </Form.Item>
        <Form.Item label="Team Leader" name="team_leader">
          <Input placeholder={employeeData?.team_lead_employee.name} disabled />
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
            onClick={() => setErrorModalOpen(false)}
          >
            Back
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default AddPermitEmployee;