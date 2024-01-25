import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import "./positionConfiguration.css"
import { IoIosSearch } from "react-icons/io";
import { MdOutlineDelete } from 'react-icons/md'
import { Table, Space, Row, Col, Input, Button, } from "antd"
import { DeleteConfirmationDialog } from '@common/deleteConfirmation/DeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import EditPosition from './editPosition/EditPosition'
import AddPosition from './addPosition/AddPosition'
import SuccessModal from '@common/modals/successModal/SuccessModal'
import FailedModal from '@common/modals/failedModal/FailedModal'
import SearchBox from '@common/SearchBox/SearchBox'
import CountButton from '@common/buttons/countButton/CountButton'
import SortButton from '@common/buttons/sortButton/SortButton'
import DeleteModal from '@common/modals/deleteModal/DeleteModal';

const PositionConfiguration = () => { // {searchValue, sortValue, countValue}
  // Declaration 
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [positionData, setPositionData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [uuid, setUuid] = useState();
  const [editValue, setEditValue] = useState();

  const [value, setValue] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSuccessUpdateModalOpen, setIsSuccessUpdateModalOpen] = useState(false);
  const [isSuccessDeleteModalOpen, setIsSuccessDeleteModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  

  // API GET Position Data
  const getPositionData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://103.82.93.38/api/v1/position/', {
        headers: {
          Authorization: token,
        }
      });
      setPositionData(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getPositionData();
  }, [token, navigate, isSuccessModalOpen, isSuccessUpdateModalOpen, isSuccessDeleteModalOpen]);

  // Table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '85%',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="small">
          <EditPosition 
          uuid={(record)} 
          isModalOpen={openEditModal}
          onClick={() => handelOpenEditModal(record)}
          onCancel={onCancelEditModal}
          loading={loading}
          onFinish={updatePosition}
          value={editValue}
          onChangeValue={(e) => setEditValue(e.target.value)}
          />

          <DeleteConfirmationDialog 
          onClick={() => handelOpenDeleteModal(record)} 
          isModalOpen={openDeleteModal} 
          onOk={deletePosition} 
          onCancel={onCancelDeleteModal} 
          loading={loading}
          data="position"/>
        </Space>
      ),
    },
  ];

  const data = positionData.map(item => {
    return {
      key: item.uuid,
      name: item.name,
    }
  });

  // Handle Modal
  const onClick = (record) => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Handel onChange Input
  const handleValue = (e) => {
    setValue(e.target.value)
  }

  // Success Modal Handle
  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSuccessModalCancel = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSuccessUpdateModalOk = () => {
    setIsSuccessUpdateModalOpen(false);
  };

  const handleSuccessUpdateModalCancel = () => {
    setIsSuccessUpdateModalOpen(false);
  };

  const handleSuccessDeleteModalOk = () => {
    setIsSuccessDeleteModalOpen(false);
  };

  const handleSuccessDeleteModalCancel = () => {
    setIsSuccessDeleteModalOpen(false);
  };

  // Failed Modal Handle
  const handleFailedModalOk = () => {
    setIsFailedModalOpen(false);
  };

  const handleFailedModalCancel = () => {
    setIsFailedModalOpen(false);
  };

  // Count Handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };

  // Sort Handler
  const [sortValue, setSortValue] = useState("");

  const handleSort = (value) => {
    setSortValue(value);
  };

  const itemsSort = [
    {
      key: 'aToZ',
      label: 'A-Z Name'
    },
    {
      key: 'zToA',
      label: 'Z-A Name'
    },
  ];

  // Sort data berdasarkan sortValue
  const sortedData = [...data].sort((a, b) => {
    if (sortValue === 'aToZ') {
      return a.name.localeCompare(b.name);
    } else if (sortValue === 'zToA') {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  // Add Position to API
  const addPosition = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("http://103.82.93.38/api/v1/position/", values, {
        headers: {
          Authorization: token,
        }
      });
      setTimeout(() => {
        setLoading(false);
        setOpenAddModal(false);
        setIsSuccessModalOpen(true);
        console.log("New position added!");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setIsFailedModalOpen(true);
      console.log("Galat", error, "Values", values);
    }
  }

  const onCancelAddModal = () => {
    setOpenAddModal(false);
  };

  // PUT API to Update Position
  const updatePosition = async (values) => {
    try {
      // console.log("uuid", uuid, "name", editValue );
      const response = await axios.put(`http://103.82.93.38/api/v1/position/${uuid}`, 
        {
          name: editValue,
        }, 
        {
          headers: { Authorization: token },
        }
      );
      setLoading(true); 
      setTimeout(() => {
        setLoading(false);
        setOpenEditModal(false);
        setIsSuccessUpdateModalOpen(true);
        // setEditValue("");
        console.log("Position updated!");
      }, 3000);
    } catch (error) {
      console.log(error);
      setOpenEditModal(false);
      setIsFailedModalOpen(true);
    }
  }

  const handelOpenEditModal = (record) => {
    const uuid = record.key
    const name = record.name
    setUuid(uuid);
    setEditValue(name);  
    setOpenEditModal(true);
    // console.log(uuid, editValue);
  }

  const onCancelEditModal = () => {
    setOpenEditModal(false);
  };

  // DELETE API to Delete Position
  const deletePosition = async() => {
    try {
      // console.log(uuid, editValue);
      const response = await axios.delete(`http://103.82.93.38/api/v1/position/${uuid}`, { headers: { Authorization: token } });
      // console.log(response);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpenDeleteModal(false);
        setIsSuccessDeleteModalOpen(true);
        console.log("Position deleted!");
      }, 3000);
    } catch (error) {
      console.log(error);
      setOpenDeleteModal(false);
      setIsFailedModalOpen(true);
    }
  }

  const handelOpenDeleteModal = (record) => {
    const uuid = record.key
    const name = record.name
    setUuid(uuid);
    setEditValue(name);  
    setOpenDeleteModal(true);
    // console.log(uuid, editValue);
  }

  const onCancelDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
    <Row gutter={[10, 10]} justify="space-between">
      <Row gutter={[10, 10]} justify="start">
        <Col>
          {/* <SearchBox /> */}
          <Input 
          className='search-box'
          placeholder='Search' 
          prefix={<IoIosSearch />} 
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          allowClear
          />
        </Col>
        <Col>
          <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
        </Col>
        <Col>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
      </Row>
      
      <Row justify="end">
          <AddPosition
          showModal={() => setOpenAddModal(true)}
          isModalOpen={openAddModal}
          onCancel={onCancelAddModal}
          onFinish={addPosition}
          loading={loading}
          />
      </Row>
    </Row>
    <br />

    <div>
      <Table 
      columns={columns} 
      dataSource={sortedData} 
      loading={loading}
      pagination={{
        pageSize: countValue,
      }} 
      />
    </div>

    {/* Modal Success and Failed for Update */}
    <SuccessModal action="Add" handleOk={handleSuccessModalOk} handleCancel={handleSuccessModalCancel} isModalOpen={isSuccessModalOpen} />
    <SuccessModal action="Update" handleOk={handleSuccessUpdateModalOk} handleCancel={handleSuccessUpdateModalCancel} isModalOpen={isSuccessUpdateModalOpen} />
    <SuccessModal action="Delete" handleOk={handleSuccessDeleteModalOk} handleCancel={handleSuccessDeleteModalCancel} isModalOpen={isSuccessDeleteModalOpen} />
    <FailedModal handleOk={handleFailedModalOk} handleCancel={handleFailedModalCancel} isModalOpen={isFailedModalOpen}/>
  </>
  )
}

export default PositionConfiguration
