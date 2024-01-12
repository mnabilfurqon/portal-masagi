import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./addLeaveEmployee.css";

const AddLeaveEmployee = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [employeeData, setEmployeeData] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dateFormatList = "DD/MM/YYYY";

  const addLeave = async (values) => {
    try {
      setLoading(true);
      values.leave_date = dayjs(values.leave_date, "DD/MM/YYYY").format(
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

  const getSelectedLeave = async () => {
    try {
      setLoading(true);
      const response =  await axios.get(`http://103.82.93.38/api/v1/permit/${uuid}`, {
        headers: {
          Authorization: token,
        },
      });
      setEmployeeData(response.data[0].items);
    } catch (error) {
      console.error("Error fetching selected leave:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getSelectedLeave()
  }, [token, navigate]);

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

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
      >
        <Form.Item
          label="Type Leave"
          name="type_leave"
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
          name="permit_date"
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
          name="end_permit_date"
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
          <Input value={employeeData.hr_employee} disabled />
        </Form.Item>
        <Form.Item label="Team Leader" name="team_leader">
          <Input value={employeeData.team_lead_employee} disabled />
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
            onClick={() => setErrorModalOpen(false)}
          >
            Back
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default AddLeaveEmployee;