import React from "react";
import dayjs from "dayjs";
import { Button, Form, Input, DatePicker, Select } from "antd";
import SubmitButton from "../../buttons/submitButton/SubmitButton";
import "./teamMemberForm.css";
import { Link } from "react-router-dom";

const TeamMemberForm = ({
  onFinish,
  onFinishFailed,
  buttonText,
  projectData,
  teamMember,
  roleProject
}) => {
  const [form] = Form.useForm();

  if (!projectData) {
    return null;
  }

  // Address Input
  const { TextArea } = Input;

  // Date Picker
  const dateFormatList = "DD/MM/YYYY";
  const startDateFormatted = dayjs(projectData.project[0].start_date).format(
    dateFormatList
  );
  const dueDateFormatted = dayjs(projectData.project[0].due_date).format(
    dateFormatList
  );

  return (
    <>
      <Form
        name="team-member"
        form={form}
        className="add-team-member-form"
        labelCol={{
          span: 6,
          className: "add-team-member-label",
        }}
        wrapperCol={{
          className: "add-team-member-input",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Client" name="client" colon={false}>
          <Input
            disabled
            placeholder={projectData.project[0].client.name}
            className="input-button"
          />
        </Form.Item>

        <Form.Item label="Project Name" name="name" colon={false}>
          <Input
            disabled
            placeholder={projectData.project[0].name}
            className="input-button"
          />
        </Form.Item>

        <Form.Item label="Description" name="description" colon={false}>
          <TextArea
            disabled
            rows={4}
            className="input-description"
            placeholder={projectData.project[0].description}
          />
        </Form.Item>

        <Form.Item label="Start Date" name="start_date" colon={false}>
          <DatePicker
            disabled
            placeholder={startDateFormatted}
            format={dateFormatList}
            className="date-picker"
          />
        </Form.Item>

        <Form.Item label="Due Date" name="due_date" colon={false}>
          <DatePicker
            disabled
            placeholder={dueDateFormatted}
            format={dateFormatList}
            className="date-picker"
          />
        </Form.Item>

        <Form.Item label="Team Leader" name="team_members" colon={false}>
          <Input
            disabled
            placeholder={projectData.team_members[0].employee.name}
            className="input-button"
          />
        </Form.Item>

        <Form.Item
          label="Team Member"
          name="employee_uuid"
          colon={false}
          rules={[
            {
              required: true,
              message: "Please select team member!",
            },
          ]}
        >
          <Select placeholder="Please select team member">
            {teamMember.map((item) => (
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
            <SubmitButton buttonText={buttonText} />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default TeamMemberForm;
