import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Form,
  Space,
  Button,
  Row,
  Col,
  Input,
  Modal,
  Select,
  Radio,
} from "antd";
import SuccessModal from "@common/modals/successModal/SuccessModal";
import FailedModal from "@common/modals/failedModal/FailedModal";
import FilterDropdown from "@common/buttons/filterButton/FilterDropdown";
import SortButton from "@common/buttons/sortButton/SortButton";
import CountButton from "@common/buttons/countButton/CountButton";
import Cookies from "js-cookie";
import { dummyUsers } from "@common/dummy/dummyUsers";
import { dummyRoles } from "@common/dummy/dummyRoles";
import "./userConfiguration.css";

const UserConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [uuid, setUuid] = useState();
  const [users, setUsers] = useState(dummyUsers);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failedModalOpen, setFailedModalOpen] = useState(false);
  const [roles, setRoles] = useState(dummyRoles);
  
  useEffect(() => {
    if (!token) navigate("/login");
    loadUsers();
  }, [token, navigate, successModalOpen]);

  const loadUsers = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setUsers(dummyUsers);
    setLoading(false);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.username.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filteredValue: [filterByStatus],
      onFilter: (value, record) =>
        record.status.toLowerCase().includes(value.toLowerCase()),
      render: (record) =>
        record === "active" ? (
          <Button className="active-button" type="primary" size="small" ghost>
            active
          </Button>
        ) : (
          <Button className="not-active-button" type="primary" size="small" ghost>
            not active
          </Button>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="small">
          <Button
            type="none"
            style={{ margin: 0, padding: 0 }}
            onClick={() => handleOpenEditModal(record)}
          >
            <BiEdit className="edit-icon" size="25" />
          </Button>
        </Space>
      ),
    },
  ];

  const data = users.map((item) => ({
    key: item.uuid,
    username: item.username,
    status: item.is_active ? "active" : "not",
    role: item.role.name,
    role_uuid: item.role.uuid,
    company: item.company.company_name,
    company_uuid: item.company.uuid,
  }));

  const handleFilter = (e) => {
    setFilterByStatus(e.key);
  };

  const status = [
    { key: "active", label: "Active" },
    { key: "not", label: "Not Active" },
  ];

  const [sortValue, setSortValue] = useState("");

  const handleSort = (value) => {
    setSortValue(value);
  };

  const itemsSort = [
    { key: "aToZ", label: "A-Z Username" },
    { key: "zToA", label: "Z-A Username" },
  ];

  const sortedData = [...data].sort((a, b) => {
    if (sortValue === "aToZ") return a.username.localeCompare(b.username);
    if (sortValue === "zToA") return b.username.localeCompare(a.username);
    return 0;
  });

  const [countValue, setCountValue] = useState("10");
  const handleCount = (value) => setCountValue(value);

  const handleOpenEditModal = (record) => {
    form.setFieldsValue({
      username: record.username,
      role_uuid: record.role_uuid,
      is_active: record.status === "active",
    });
    setUuid(record.key);
    setIsEditModalOpen(true);
  };

  const updateUser = async (values) => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 400));

      const index = dummyUsers.findIndex((u) => u.uuid === uuid);
      if (index !== -1) {
        dummyUsers[index] = {
          ...dummyUsers[index],
          username: values.username,
          password: values.password || dummyUsers[index].password,
          is_active: values.is_active,
          role: dummyRoles.find((r) => r.uuid === values.role_uuid),
        };
      }

      setIsEditModalOpen(false);
      setSuccessModalOpen(true);
      loadUsers();
    } catch (error) {
      setIsEditModalOpen(false);
      setFailedModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const failedUpdateUser = () => {
    setIsEditModalOpen(false);
    setFailedModalOpen(true);
  };

  return (
    <>
      <Row gutter={[10, 10]} justify="start">
        <Col xs={24} md={10} lg={8}>
          <Input
            className="search-box"
            prefix={<IoIosSearch />}
            placeholder="Search"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>

        <Col xs={8} md={5} lg={4}>
          <FilterDropdown
            items={status}
            text="Filter "
            className="sort-button"
            onClick={handleFilter}
          />
        </Col>

        <Col xs={8} md={5} lg={4}>
          <SortButton
            className="sort-button"
            items={itemsSort}
            onSort={handleSort}
          />
        </Col>

        <Col xs={8} md={4} lg={3}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
      </Row>

      <br />

      <Table
        columns={columns}
        pagination={{ pageSize: countValue }}
        dataSource={sortedData}
        loading={loading}
        scroll={{ x: 300 }}
      />

      <Modal
        centered
        open={isEditModalOpen}
        title={<h2 style={{ color: "#1E2F66", fontWeight: 600 }}>Edit User</h2>}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="editUser"
          onFinish={updateUser}
          onFinishFailed={failedUpdateUser}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item label="Role" name="role_uuid">
            <Select>
              {roles.map((role) => (
                <Select.Option key={role.uuid} value={role.uuid}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="is_active">
            <Radio.Group>
              <Radio value={true}>Active</Radio>
              <Radio value={false}>Not Active</Radio>
            </Radio.Group>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="add-button"
          >
            Update
          </Button>
        </Form>
      </Modal>

      <SuccessModal
        action="Update"
        handleOk={() => setSuccessModalOpen(false)}
        handleCancel={() => setSuccessModalOpen(false)}
        isModalOpen={successModalOpen}
      />

      <FailedModal
        handleOk={() => setFailedModalOpen(false)}
        handleCancel={() => setFailedModalOpen(false)}
        isModalOpen={failedModalOpen}
      />
    </>
  );
};

export default UserConfiguration;
