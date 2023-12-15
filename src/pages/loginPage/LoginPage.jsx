import React, { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import { LogoMasagi } from '../../assets';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import './loginPage.css';

const LoginPage = () => {
  const [form] = Form.useForm();
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const onFinish = async values => {
    try {
      setLoading(true);
      const loginResponse = await axios.post(
        'http://103.82.93.38/api/v1/auth/login',
        values
      );
      Cookies.set('token', loginResponse.data.token);

      const protectedResponse = await axios.get(
        'http://103.82.93.38/api/v1/auth/protected',
        {
          headers: {
            Authorization: loginResponse.data.token,
          },
        }
      );
      Cookies.set("role_uuid", protectedResponse.data.user.role.uuid);
      Cookies.set("username", protectedResponse.data.user.username);
      Cookies.set("company_uuid", protectedResponse.data.user.company.uuid);
    } catch (error) {
      setLoginError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      if (Cookies.get("role_uuid") === "8ab999f6-ad6d-48e7-943a-aa400007223f" || Cookies.get("role_uuid") === "4386da8b-fa01-4414-96e9-d1db09de66ff") navigate("../dashboard");
      else navigate("../attendance");
    }
  }, [token, navigate]);

  return (
    <>
      <div id='background-color'>
        <Card className='form-container'>
          <img className='logo-masagi' src={LogoMasagi} alt='Logo Masagi' />
          <Form
            form={form}
            name='vertical-login'
            layout='vertical'
            onFinish={onFinish}>
            <div className='judul-input'>Username</div>
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Username is required',
                },
              ]}>
              <Input
                prefix={<UserOutlined />}
                placeholder='Enter username'
                className='custom-input'
              />
            </Form.Item>
            <div className='judul-input'>Password</div>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Password is required',
                },
              ]}>
              <Input.Password
                prefix={<LockOutlined />}
                type='password'
                placeholder='Enter password'
                className='custom-input'
              />
            </Form.Item>
            {loginError && <div className='error-message'>{loginError}</div>}
            <Form.Item>
              <Button className='button-login' htmlType='submit'>
                {loading ? <LoadingComponent /> : 'Login'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
