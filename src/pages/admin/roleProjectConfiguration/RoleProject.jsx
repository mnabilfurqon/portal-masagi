import React, { useState, useEffect, } from 'react'
import { BiEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { PiWarningCircleBold } from "react-icons/pi"
import { Row, Col, Table, Input, Button, Flex, Modal, Form, Space } from 'antd'
import AddButton from '@common/buttons/addButton/AddButton'
import SortButton from '@common/buttons/sortButton/SortButton'
import CountButton from '@common/buttons/countButton/CountButton'
import SuccessModal from '@common/modals/successModal/SuccessModal'
import FailedModal from '@common/modals/failedModal/FailedModal'
import Cookies from 'js-cookie'
import axios from 'axios'

const RoleProject = () => {
  // Declaration
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [editValue, setEditValue] = useState('');
  const [uuid, setUuid] = useState();
  const [loading, setLoading] = useState();
  const [formLayout, setFormLayout] = useState('vertical');
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [RoleProjects, setRoleProjects] = useState();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessAddModal, setOpenSuccessAddModal] = useState(false);
  const [openSuccessEditModal, setOpenSuccessEditModal] = useState(false);
  const [openSuccessDeleteModal, setOpenSuccessDeleteModal] = useState(false);
  const [openFailedModal, setOpenFailedModal] = useState(false);

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
      
  const customizeRequiredMark = (label, { required }) => (
    <>
      {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
      {label}
    </>
  );
      
  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getRoleProject();
  }, [token, navigate, openSuccessAddModal, openSuccessEditModal, openSuccessDeleteModal]);

  // Get Role Project
  const getRoleProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://103.82.93.38/api/v1/role_project/`, {
        headers: {
          Authorization: token,
        }
      });
      setLoading(false);
      setRoleProjects(response.data.items);
      // console.log("Role Projects", RoleProjects);
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  }

  const data = RoleProjects?.map(item => {
    return {
      key: item.uuid,
      name: item.name,
    }
  });

  // Search Handler
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
  }

  // Sort Handler
  const [sortValue, setSortValue] = useState("");

  const handleSort = (value) => {
    setSortValue(value);
  };

  const itemsSort = [
    {
      key: 'aToZ',
      label: 'A-Z Role Project'
    },
    {
      key: 'zToA',
      label: 'Z-A Role Project'
    },
  ];

  const sortedData = data?.sort((a, b) => {
    if (sortValue === 'aToZ') {
      return a.name.localeCompare(b.name);
    } else if (sortValue === 'zToA') {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  // Count Handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };

  // Edit Button Handler
  const handleEditClick = (record) => {
    // console.log(record);
    const uuid = record.key;
    const name = record.name;

    formEdit.setFieldsValue({name: name})
    setUuid(uuid);
    setEditValue(name);
    setOpenEditModal(true);
  }

  // Delete Button Handler
  const handleDeleteClick = (record) => {
    const uuid = record.key;
    setUuid(uuid);
    setOpenDeleteModal(true);
    // console.log(uuid);
  }

  // Table
  const columns = [
    {
      title: 'Role Project',
      dataIndex: 'name',
      key: 'name',
      width: "85%",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button type="none" style={{margin:0, padding:0}} onClick={() => handleEditClick(record)}>
            <BiEdit className="edit-icon" size="25" />
          </Button>
          <Button type="none" style={{margin:0, padding:0}} onClick={() => handleDeleteClick(record)}>
            <MdOutlineDelete className="icon-delete" size="25" />
          </Button>
        </Space>
      ),
    },
  ];

  // Modal Handler
  const onOkAddModal = () => {
    setOpenAddModal(false)
  }

  const onCancelAddModal = () => {
    setOpenAddModal(false)
  }

  const onOkSuccessAddModal = () => {
    setOpenSuccessAddModal(false)
    form.setFieldsValue( {name: ""} )
  }

  const onCancelSuccessAddModal = () => {
    setOpenSuccessAddModal(false)
  }

  const onOkEditModal = () => {
    setOpenEditModal(false)
  }

  const onCancelEditModal = () => {
    setOpenEditModal(false)
  }

  const onOkSuccessEditModal = () => {
    setOpenSuccessEditModal(false)
  }

  const onCancelSuccessEditModal = () => {
    setOpenSuccessEditModal(false)
  }

  const onOkDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const onCancelDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const onOkSuccessDeleteModal = () => {
    setOpenSuccessDeleteModal(false)
  }

  const onCancelSuccessDeleteModal = () => {
    setOpenSuccessDeleteModal(false)
  }

  const onOkFailedModal = () => {
    setOpenFailedModal(false)
  }

  const onCancelFailedModal = () => {
    setOpenFailedModal(false)
  }
  
  // Post Role Project
  const addRoleProject = async (values) => {
    try {
      setLoading(true);
    //   console.log("Values", values);
      const response = await axios.post("http://103.82.93.38/api/v1/role_project/", values, {
        headers: {
          Authorization: token,
        }
      });
      setTimeout(() => {
        setLoading(false);
        setOpenAddModal(false);
        setOpenSuccessAddModal(true);
        // setValue("");
        console.log("New role project added!");
      }, 3000);
    } catch (error) {
      // setValue("");
      setLoading(false);
      setOpenAddModal(false);
      setOpenFailedModal(true);
      console.log("Error", error, "Values", values);
    }
  }

  const failedAddRoleProject = (error, values) => {
    console.log(error, values);
    setOpenFailedModal(true)
  }

  // Put Role Project
  const editRoleProject = async (values) => {
    try {
      setLoading(true);
      // console.log("Values", values);
      const response = await axios.put(`http://103.82.93.38/api/v1/role_project/${uuid}`, values, {
        headers: {
          Authorization: token,
        }
      });
      setTimeout(() => {
        setLoading(false);
        setOpenEditModal(false);
        setOpenSuccessEditModal(true);
        // setValue("");
        console.log("Role project updates!");
      }, 3000);
    } catch (error) {
      // setValue("");
      setLoading(false);
      setOpenEditModal(false);
      setOpenFailedModal(true);
      console.log("Error", error, "Values", values);
    }
  }

  const failedEditRoleProject = (error, values) => {
    console.log(error, values);
    setOpenFailedModal(true)
  }

   // Delete Role Project
   const deleteRoleProject = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://103.82.93.38/api/v1/role_project/${uuid}`, {
        headers: {
          Authorization: token,
        }
      });
      setTimeout(() => {
        setLoading(false);
        setOpenDeleteModal(false);
        setOpenSuccessDeleteModal(true);
        // setValue("");
        console.log("Role project deleted!");
      }, 3000);
    } catch (error) {
      // setValue("");
      setLoading(false);
      setOpenDeleteModal(false);
      setOpenFailedModal(true);
      console.log("Error", error);
    }
  }

  return (
    <>
      <Row gutter={[5, 10]} justify="space-between">
        <Col lg={8} md={16} sm={16} xs={24}>
          <Input 
          className='search-box'
          prefix={<AiOutlineSearch/>} 
          placeholder='Search' 
          // onSearch={handleSearch}
          onChange={onChangeSearch}
          allowClear
          />
          {/* <SearchBox /> */}
        </Col>
        <Col lg={3} md={8} sm={8} xs={12}>
          <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
        </Col>
        <Col lg={3} md={8} sm={8} xs={12}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col lg={8} md={16} sm={16} xs={24}>
          {/* Add Role Project Modal */}
          <AddButton handleClick={() => setOpenAddModal(true)} buttonText="Add Role Project" />
        </Col>
      </Row>
      <br />

      <Table 
      columns={columns} 
      pagination={{ pageSize: countValue, }} 
      dataSource={sortedData} 
      loading={loading}
      scroll={{ x: 200, }}
      />

      {/* Add Role Project */}
      <Modal
      centered
      open={openAddModal}
      title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Add Role Project</h2>}
      onCancel={onCancelAddModal}
      footer={<div></div>}
      >
        <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        onFinish={addRoleProject}
        onFinishFailed={failedAddRoleProject}
        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
        initialValues={{
          // layout: formLayout,
        }}
        >
          <Form.Item label="Role Project" name="name" rules={[ { required: true, message: "Please input your role project name!" }, ]}>
            <Input
            placeholder="Enter your role project name"
            name="name"
            />
          </Form.Item>
          <Button htmlType='submit' loading={loading} className="add-button">
            Add Role Project
          </Button>
        </Form>
      </Modal>

      {/* Edit Role Project */}
      <Modal
      centered
      open={openEditModal}
      title={<h2 style={{color:"#1E2F66", fontWeight:600, }}>Edit Role Project</h2>}
      onCancel={onCancelEditModal}
      footer={<div></div>}
      >
        <Form
        {...formItemLayout}
        layout={formLayout}
        form={formEdit}
        onFinish={editRoleProject}
        onFinishFailed={failedEditRoleProject}
        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
        initialValues={{
          // name: editValue,
        }}
        >
          <Form.Item label="Role Project" name="name" rules={[ { required: true, message: "Please input your role project name!" }, ]}>
            <Input
            placeholder="Enter your role project name"
            name="name"
            />
          </Form.Item>
          <Button htmlType='submit' loading={loading} className="add-button">
            Save
          </Button>
        </Form>
      </Modal>

      {/* Delete Role Project */}
      <Modal
        centered={true}
        open={openDeleteModal}
        onOk={onOkDeleteModal}
        onCancel={onCancelDeleteModal}
        footer={
          <div>
            <Button type="text" onClick={() => setOpenDeleteModal(false)}>CANCEL</Button>
            <Button className="delete-button" type="danger" onClick={deleteRoleProject} loading={loading}>DELETE</Button>
          </div>
        }
      >
        <div className="dialog">
          <PiWarningCircleBold className="icon-warning" size="70"/>
          <h1>Attention</h1>
          <p>Are you sure delete this role project?</p>
        </div>
      </Modal>

      {/* Success and Failed Modals */}
      <SuccessModal 
      action="Add role project" 
      isModalOpen={openSuccessAddModal} 
      handleOk={onOkSuccessAddModal} 
      handleCancel={onCancelSuccessAddModal} 
      />

      <SuccessModal 
      action="Edit role project" 
      isModalOpen={openSuccessEditModal} 
      handleOk={onOkSuccessEditModal} 
      handleCancel={onCancelSuccessEditModal} 
      />

      <SuccessModal 
      action="Delete role project" 
      isModalOpen={openSuccessDeleteModal} 
      handleOk={onOkSuccessDeleteModal} 
      handleCancel={onCancelSuccessDeleteModal} 
      />

      <FailedModal 
      isModalOpen={openFailedModal}
      handleOk={onOkFailedModal}
      handleCancel={onCancelFailedModal}
      />
    </>
  )
}

export default RoleProject