import React, { useState, useEffect } from "react";
import { Form, Input, Radio, Select, Flex, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SuccessAddDataModal from "@common/modals/successModal/SuccessAddDataModal";
import FailedAddDataModal from "@common/modals/failedModal/FailedAddDataModal";
import Cookies from "js-cookie";
import axios from "axios";
import "./addUser.css";
import { dummyRoles } from "@common/dummy/dummyRoles";
import { dummyEmployees } from "@common/dummy/dummyEmployees";
import { dummyCompanies } from "@common/dummy/DummyCompanies";
import { dummyUsers } from "@common/dummy/dummyUsers";
import { v4 as uuidv4 } from "uuid";

const AddUser = () => {
  const token = Cookies.get("token");
  const company = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [loading, setLoading] = useState(false);

  const [roles, setRoles] = useState();
  const [employee, setEmployee] = useState();
  const [companies, setCompanies] = useState();

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getRoles();
    getEmployees();
    getCompanies();
  }, [token, navigate]);

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    navigate("/company");
  };

  const handleFailedModalClose = () => {
    setIsFailedModalVisible(false);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 5,
          },
          wrapperCol: {
            span: 15,
          },
        }
      : null;

  const customizeRequiredMark = (label, { required }) => (
    <>
      {required ? (
        <Tag color="error">Required</Tag>
      ) : (
        <Tag color="warning">optional</Tag>
      )}
      {label}
    </>
  );

  const getRoles = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setRoles(dummyRoles);
    setLoading(false);
  };

  const getEmployees = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setEmployee(dummyEmployees);
    setLoading(false);
  };

  const getCompanies = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setCompanies(dummyCompanies);
    setLoading(false);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400));

      const newUser = {
        uuid: uuidv4(),
        username: values.username,
        password: values.password,
        role_uuid: values.role_uuid,
        company_uuid: values.company_uuid,
        is_active: values.is_active,
        created_date: new Date(),
      };

      dummyUsers.push(newUser);
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.log("Dummy error:", error);
      setIsFailedModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (error, values) => {
    setIsFailedModalVisible(true);
    console.log("Failed:", error, values);
  };

  return (
    <>
      <Form
        form={form}
        name="User"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
        layout={formLayout}
        requiredMark={
          requiredMark === "customize" ? customizeRequiredMark : requiredMark
        }
        initialValues={{
          layout: formLayout,
          company_uuid: company.uuid,
        }}
        autoComplete="off"
        onLoadedData={loading}
      >
        <Form.Item
          label="Username"
          name="username"
          colon={false}
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input autoComplete="off" placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          colon={false}
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password autoComplete="off" placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role_uuid"
          colon={false}
          labelAlign="left"
          rules={[
            {
              required: true,
              requiredMark: false,
              message: "Please select your role!",
            },
          ]}
        >
          <Select>
            {roles?.map((role) => (
              <Select.Option
                key={role.uuid}
                value={role.uuid}
                loading={loading}
              >
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="is_active"
          colon={false}
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Please select your status!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Actice</Radio>
            <Radio value={false}>Not Active</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Company"
          labelAlign="left"
          name="company_uuid"
          colon={false}
          disabled
          rules={[
            {
              required: true,
              message: "Please select your company!",
            },
          ]}
        >
          <Select disabled>
            {companies?.map((company) => (
              <Select.Option key={company.uuid} value={company.uuid}>
                {company.company_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Flex justify="end" className="action">
          <Form.Item>
            <Flex gap={10} align="center" justify="end">
              <Link to="/company" style={{ color: "black" }}>
                Cancel
              </Link>
              <Button
                key="submit"
                htmlType="submit"
                type="none"
                className="update-button"
              >
                Save
              </Button>
            </Flex>
          </Form.Item>
        </Flex>
      </Form>

      <SuccessAddDataModal
        visible={isSuccessModalVisible}
        onClose={handleSuccessModalClose}
        textParagraph="Data upload successful!"
      />

      <FailedAddDataModal
        visible={isFailedModalVisible}
        onClose={handleFailedModalClose}
      />
    </>
  );
};

export default AddUser;
