// import { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { LogoMasagi } from "../../assets";
import axios from "axios";
import "./loginPage.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const [form] = Form.useForm();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios
      .post("http://127.0.0.1:5000/api/v1/auth/login", values)
      .then((res) => {
        console.log(res.data);
        Cookies.set("token", res.data.token)
        navigate("../dashboard")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("../dashboard")
    }
  }, [token, navigate]);

  return (
    <>
      <div id="background-color">
        <div className="form-container">
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
                  message: "username is required",
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
                  message: "password is required",
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
            <Form.Item shouldUpdate>
              {() => (
                <Button className="button-login" htmlType="submit">
                  Masuk
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
