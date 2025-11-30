import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { SlLock } from "react-icons/sl";
import { Button, Card, Form, Input } from "antd";
import { LogoMasagi } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingComponent from "../../components/loadingComponent/LoadingComponent";
import "./loginPage.css";

const LoginPage = () => {
  const [form] = Form.useForm();
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const dummyLogin = async (values) => {
    const { username, password } = values;

    if (username !== "admin" || password !== "12345") {
      throw new Error("Invalid credentials");
    }

    return {
      token: "DUMMY_TOKEN_123456789",
    };
  };

  const dummyProtected = async () => {
    return {
      user: {
        uuid: "USER-UUID-001",
        username: "admin",
        role: {
          uuid: "1",
          name: "superadmin",
        },
        company: {
          uuid: "COMPANY-UUID-001",
        },
        employee: {
          uuid: "EMPLOYEE-UUID-001",
          name: "Super Admin",
        },
      },
    };
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const loginResponse = await dummyLogin(values);
      Cookies.set("token", loginResponse.token);

      const protectedResponse = await dummyProtected();
      Cookies.set("user_uuid", protectedResponse.user.uuid);
      Cookies.set("role_uuid", protectedResponse.user.role.uuid);
      Cookies.set(
        "role_name",
        encodeURIComponent(protectedResponse.user.role.name)
      );
      Cookies.set("username", protectedResponse.user.username);
      Cookies.set("company_uuid", protectedResponse.user.company.uuid);
      Cookies.set("employee_name", protectedResponse.user.employee.name);
      Cookies.set("employee_uuid", protectedResponse.user.employee.uuid);
    } catch (error) {
      setLoginError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      if (
        Cookies.get("role_name") === "superadmin" ||
        Cookies.get("role_name") === "admin"
      )
        navigate("/dashboard");
      else navigate("/attendance");
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
                prefix={<AiOutlineUser />}
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
                prefix={<SlLock />}
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
