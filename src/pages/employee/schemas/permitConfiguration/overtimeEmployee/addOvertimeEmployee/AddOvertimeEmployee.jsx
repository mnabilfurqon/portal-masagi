import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import moment from "moment";
import "./addOvertimeEmployee.css";

const AddOvertimeEmployee = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dateFormatList = "DD/MM/YYYY";
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(null);

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    calculateDuration(time, endTime);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    calculateDuration(startTime, time);
  };

  const calculateDuration = (start, end) => {
    if (start && end) {
      const duration = moment.duration(end.diff(start));
      const durationString = `${duration.hours()} hours ${duration.minutes()} minutes ${duration.seconds()} seconds`;
      setDuration(durationString);
    }
  };

  const addOvertime = async (values) => {
    try {
      setLoading(true);
      values.overtime_date = dayjs(values.overtime_date, "DD/MM/YYYY").format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      await axios.post("http://103.82.93.38/api/v1/permit/", values, {
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

  const handleBackAdd = () => {
    setErrorModalOpen(false);
    setModalOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
        initialValues={{
          date: dayjs("01/01/1970", dateFormatList),
        }}
      >
        <Form.Item label="Overtime Date" name="setOvertimeDate">
          <DatePicker
            placeholder="DD/MM/YYYY"
            className="overtime-input"
            format={dateFormatList}
            defaultValue={selectedDate}
            onChange={handleDateChange}
            disabled
          />
        </Form.Item>
        <Form.Item
          label="Start Overtime"
          name="startOvertime"
          rules={[{ required: true, message: "Please input start overtime!" }]}
        >
          <TimePicker
            className="start-overtime-input"
            format="HH:mm"
            onChange={handleStartTimeChange}
            placeholder="00:00"
          />
        </Form.Item>
        <Form.Item
          label="End Overtime"
          name="endOvertime"
          rules={[
            {
              required: true,
              message: "Please input end overtime!",
            },
          ]}
        >
          <TimePicker
            className="end-overtime-input"
            format="HH:mm"
            onChange={handleEndTimeChange}
            placeholder="00:00"
          />
        </Form.Item>
        <Form.Item label="Duration" name="duration">
          <div>{duration}</div>
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
          <Input disabled />
        </Form.Item>
        <Form.Item label="Team Leader" name="team-leader">
          <Input disabled />
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
            onClick={addOvertime}
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
            onClick={handleBackAdd}
          >
            Back
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default AddOvertimeEmployee;