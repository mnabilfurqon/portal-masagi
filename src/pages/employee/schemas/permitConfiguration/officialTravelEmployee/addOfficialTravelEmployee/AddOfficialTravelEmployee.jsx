import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./addOfficialTravelEmployee.css";

const AddOfficialTravelEmployee = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dateFormatList = "DD/MM/YYYY";

  const addOfficialTravel = async (values) => {
    try {
      setLoading(true);
      values.official_travel_date = dayjs(
        values.official_travel_date,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
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

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const successTitle = (
    <div className="success-title-official-travel">
      <AiOutlineCheckCircle
        size={80}
        className="success-logo-official-travel"
      />
      <p className="success-text-official-travel">Success</p>
    </div>
  );

  const failedTitle = (
    <div className="failed-title-official-travel">
      <AiOutlineCloseCircle size={70} className="failed-logo-official-travel" />
      <p className="failed-text-official-travel">Failed</p>
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
        className="add-official-travel-form"
        labelCol={{
          className: "add-official-travel-label",
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
          permit_date: dayjs("01/01/1970", dateFormatList),
        }}
      >
        <Form.Item
          label="Agenda"
          name="agenda"
          rules={[{ required: true, message: "Please input your agenda!" }]}
        >
          <Input placeholder="Enter Agenda" className="agenda-input" />
        </Form.Item>
        <Form.Item
          label="Destination"
          name="destination"
          rules={[
            { required: true, message: "Please input your destination!" },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Enter Destination"
            className="destination-input"
          />
        </Form.Item>
        <Form.Item
          label="Permit Date"
          name="permit-date"
          rules={[
            { required: true, message: "Please input your permit date!" },
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
          name="end-permit-date"
          rules={[
            {
              required: true,
              message: "Please input your end permit date!",
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
        <Form.Item label="HR" name="hr">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Team Leader" name="team-leader">
          <Input disabled />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="link"
            className="cancel-button-official-travel"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            className="request-button-official-travel"
            htmlType="submit"
            onClick={addOfficialTravel}
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
        <div className="modal-content-official-travel">
          <p className="success-caption-official-travel">
            Official Travel has been requested
          </p>
          <Button
            key="addOfficialTravel"
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
        <div className="modal-content-official-travel">
          <p className="failed-caption-official-travel">
            Something went wrong!
          </p>
          <Button
            key="backOfficialTravel"
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
export default AddOfficialTravelEmployee;
