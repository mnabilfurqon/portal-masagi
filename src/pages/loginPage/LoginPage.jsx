// import { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { LogoMasagi } from "../../assets";
import "./loginPage.css";

const LoginPage = () => {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    console.log(values);
  };

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
              prefix={<UserOutlined/>}
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
              prefix={<LockOutlined/>}
              type="password"
              placeholder="Enter password"
              className="custom-input"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                className="button-login"
                type="primary"
                htmlType="submit"
              >
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
