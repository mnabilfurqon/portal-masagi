import React, { useState, useEffect } from "react";
import { Button, Form, Select } from "antd";
import SubmitButton from "../../buttons/submitButton/SubmitButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./teamProjectForm.css";

const TeamProjectForm = ({ onFinish, onFinishFailed, buttonText }) => {
  const [form] = Form.useForm();
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState([]);
  const [teamLeader, setTeamLeader] = useState([]);
  const [roleProject, setRoleProject] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProjectName = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://103.82.93.38/api/v1/project/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProjectName(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTeamLeader = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://103.82.93.38/api/v1/employee/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTeamLeader(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://103.82.93.38/api/v1/role_project/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setRoleProject(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getProjectName();
    getTeamLeader();
    getRoleProject();
  }, [token, navigate]);

  return (
    <>
      <Form
        name="team-project"
        form={form}
        className="add-team-project-form"
        labelCol={{
          span: 6,
          className: "add-team-project-label",
        }}
        wrapperCol={{
          className: "add-team-project-input",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Project Name"
          name="project_uuid"
          colon={false}
          rules={[
            {
              required: true,
              message: "Please select project name!",
            },
          ]}
        >
          <Select placeholder="Please select project name">
            {projectName.map((item) => (
              <Select.Option key={item.uuid} value={item.uuid}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Team Leader"
          name="employee_uuid"
          colon={false}
          rules={[
            {
              required: true,
              message: "Please select team leader!",
            },
          ]}
        >
          <Select placeholder="Please select team leader">
            {teamLeader.map((item) => (
              <Select.Option key={item.uuid} value={item.uuid}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Role Project"
          name="role_project_uuid"
          colon={false}
          rules={[
            {
              required: true,
              message: "Please select role project!",
            },
          ]}
        >
          <Select placeholder="Please select role project">
            {roleProject.map((item) => (
              <Select.Option key={item.uuid} value={item.uuid}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="action-button">
            <Link to="/team-project">
              <Button type="text">Cancel</Button>
            </Link>
            <SubmitButton buttonText={buttonText} loading={loading} />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default TeamProjectForm;
