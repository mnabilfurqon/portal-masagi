import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import "./addOvertimeEmployee.css";

const AddOvertimeEmployee = () => {
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

  const addOvertime = async (values) => {
    try {
      setLoading(true);
      values.start_overtime_time = values.start_overtime_time.format(
        "HH:mm"
      );
      values.end_overtime_time = values.end_overtime_time.format(
        "HH:mm"
      );
      values.hours_overtime = values.hours_overtime.format(
        "HH:mm"
      );
      values.date_permit = dayjs(values.date_permit, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      const data = excludeObject(values, ["team_leader", "hr"]);
      const form = new FormData();
      form.append("type_permit_uuid", data.type_permit_uuid);
      form.append("start_overtime_time", data.start_overtime_time);
      form.append("end_overtime_time", data.end_overtime_time);
      form.append("hours_overtime", data.hours_overtime);
      form.append('end_date_permit', data.date_permit)
      form.append("reason", data.reason);
      form.append("date_permit", data.date_permit);
      form.append("end_date_permit", data.end_date_permit);
      await axios.post("http://103.82.93.38/api/v1/permit/", form, {
        headers: {
          Authorization: token,
        },
      });
      setSuccessModalOpen(true);
    } catch (error) {
      setErrorModalOpen(true);
      console.log(error)
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

  const filterArray = typePermit.slice(11, 12);

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
    getTypePermit();
    getSelectedLeave()
  }, [token, navigate]);

  const disabledDate = (current) => {
    const today = dayjs().startOf("day");
    return current && (current < today || current > today.endOf("day"));
  };

  const successTitle = (
    <div className="success-title-overtime">
      <AiOutlineCheckCircle size={80} className="success-logo-overtime" />
      <p className="success-text-overtime">Success</p>
    </div>
  );

  const failedTitle = (
    <div className="failed-title-overtime">
      <AiOutlineCloseCircle size={70} className="failed-logo-overtime" />
      <p className="failed-text-overtime">Failed</p>
    </div>
  );

  return (
    <>
      <Form
        form={form}
        className="add-overtime-form"
        labelCol={{
          className: "add-overtime-label",
          xs: { span: 15 },
          sm: { span: 10 },
          md: { span: 6 },
          lg: { span: 4 },
          xl: { span: 3 },
          xxl: { span: 2 },
        }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        onFinish={addOvertime}
      >
        <Form.Item
          label="Type Overtime"
          name="type_permit_uuid"
          rules={[
            { required: true, message: "Please choose type overtime!" },
          ]}
        >
          <Select
            placeholder="Choose Type Overtime"
            className="type-overtime-select"
          >
            {filterArray.map((item) => (
              <Select.Option key={item.uuid} value={item.uuid}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Overtime Date"
          name="date_permit"
          rules={[
            { required: true, message: "Please input overtime date!" },
          ]}
        >
          <DatePicker
            placeholder="DD/MM/YYYY"
            className="overtime-input"
            format={dateFormatList}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label="Start Overtime"
          name="start_overtime_time"
          rules={[{ required: true, message: "Please input start overtime!" }]}
        >
          <TimePicker
            className="start-overtime-input"
            placeholder="00:00"
            format={"HH:mm"}
          />
        </Form.Item>
        <Form.Item
          label="End Overtime"
          name="end_overtime_time"
          rules={[
            {
              required: true,
              message: "Please input end overtime!",
            },
          ]}
        >
          <TimePicker
            className="end-overtime-input"
            placeholder="00:00"
          />
        </Form.Item>
        <Form.Item
          label="Duration"
          name="hours_overtime"
          rules={[
            {
              required: true,
              message: "Please input duration!",
            },
          ]}
        >
          <TimePicker
            className="duration-input"
            // format="HH:mm:ss"
            placeholder="00:00:00"
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
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
        <Form.Item label="HR" name="hr">
          <Input placeholder={employeeData?.hr_employee.name} disabled />
        </Form.Item>
        <Form.Item label="Team Leader" name="team_leader">
          <Input placeholder={employeeData?.team_lead_employee.name} disabled />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="link"
            className="cancel-button-overtime"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            className="request-button-overtime"
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
        <div className="modal-content-overtime">
          <p className="success-caption-overtime">
            overtime has been requested
          </p>
          <Button
            key="addOvertime"
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
        <div className="modal-content-overtime">
          <p className="failed-caption-overtime">Something went wrong!</p>
          <Button
            key="backOvertime"
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
export default AddOvertimeEmployee;
