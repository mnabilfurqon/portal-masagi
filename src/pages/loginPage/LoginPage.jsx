import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { LogoMasagi } from "../../assets";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./loginPage.css";
import LoadingComponent from "../../components/loadingComponent/LoadingComponent";

const LoginPage = () => {
  const [form] = Form.useForm();
  const token = Cookies.get("token");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const loginResponse = await axios.post(
        "https://attendance-1-r8738834.deta.app/api/v1/auth/login",
        values
      );
      Cookies.set("token", loginResponse.data.token);

      const protectedResponse = await axios.get(
        "https://attendance-1-r8738834.deta.app/api/v1/auth/protected",
        {
          headers: {
            Authorization: loginResponse.data.token,
          },
        }
      );
      Cookies.set("role_uuid", protectedResponse.data.user.role.uuid);
      Cookies.set("username", protectedResponse.data.user.username);
      Cookies.set("company_uuid", protectedResponse.data.user.company.uuid);

      navigate("../dashboard");
    } catch (error) {
      setLoginError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("../dashboard");
    }
  }, [token, navigate]);

  return (
    <>
      <div id="background-color">
        <Card className="form-container">
          <img className="logo-masagi" src={LogoMasagi} alt="Logo Masagi" />
          <Form
            form={form}
            name="vertical-login"
            layout="vertical"
            onFinish={onFinish}
          >
            <div className="judul-input">Username</div>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Username is required",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter username"
                className="custom-input"
              />
            </Form.Item>
            <div className="judul-input">Password</div>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Enter password"
                className="custom-input"
              />
            </Form.Item>
            {loginError && <div className="error-message">{loginError}</div>}
            <Form.Item>
              <Button className="button-login" htmlType="submit">
              {loading ? <LoadingComponent /> : "Login"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
