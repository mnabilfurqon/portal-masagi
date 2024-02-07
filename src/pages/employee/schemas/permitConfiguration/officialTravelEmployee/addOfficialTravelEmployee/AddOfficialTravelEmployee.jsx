import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./addOfficialTravelEmployee.css";

const AddOfficialTravelEmployee = () => {
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

  const addOfficialTravel = async (values) => {
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
      form.append("destination", data.destination);
      form.append("date_permit", data.date_permit);
      form.append("end_date_permit", data.end_date_permit);
      form.append("reason", data.reason);
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

  const filterArray = typePermit.slice(12)

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
        onFinish={addOfficialTravel}
      >
        <Form.Item
          label="Agenda"
          name="type_permit_uuid"
          rules={[{ required: true, message: "Please choose your agenda!" }]}
        >
          <Select placeholder="Choose Agenda" className="agenda-input">
            {filterArray.map((item) => (
              <Select.Option key={item.uuid} value={item.uuid}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
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
        <Form.Item label="HR" name="hr">
          <Input placeholder={employeeData?.hr_employee.name} disabled />
        </Form.Item>
        <Form.Item label="Team Leader" name="team_leader">
          <Input placeholder={employeeData?.team_lead_employee.name} disabled />
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
            onClick={() => setErrorModalOpen(false)}
          >
            Back
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default AddOfficialTravelEmployee;
