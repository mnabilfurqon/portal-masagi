import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import "./positionConfiguration.css"
import { AiOutlineSearch } from 'react-icons/ai';
// import { SearchOutlined } from '@ant-design/icons'
import { Table, Space, Button, Row, Col, Input} from "antd"
import { DeleteConfirmationDialog } from '@common/deleteConfirmation/DeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import EditPosition from './editPosition/EditPosition'
import AddPosition from './addPosition/AddPosition'
import SuccessModal from '@common/modals/successModal/SuccessModal'
import FailedModal from '@common/modals/failedModal/FailedModal'
import SearchBox from '@common/SearchBox/SearchBox'
import CountButton from '@common/buttons/countButton/CountButton'
import SortButton from '@common/buttons/sortButton/SortButton'

const PositionConfiguration = () => { // {searchValue, sortValue, countValue}
  // Declaration 
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [positionData, setPositionData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [value, setValue] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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
  }, [token, navigate, isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

  // Table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '88%',
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
          <EditPosition uuid={(record)} />
          <DeleteConfirmationDialog uuid={(record.key)} data="Position"/>
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

  // Failed Modal Handle
  const handleFailedModalOk = () => {
    setIsFailedModalOpen(false);
  };

  const handleFailedModalCancel = () => {
    setIsFailedModalOpen(false);
  };

  // // Filter data berdasarkan searchValue
  // const filteredData = data.filter(item =>
  //   item.name.toLowerCase().includes(searchValue.toLowerCase())
  // );

  // // Sort data berdasarkan sortValue
  // const sortedData = [...filteredData].sort((a, b) => {
  //   if (sortValue === 'aToZ') {
  //     return a.name.localeCompare(b.name);
  //   } else if (sortValue === 'zToA') {
  //     return b.name.localeCompare(a.name);
  //   } else {
  //     return 0;
  //   }
  // });

  // const paginationConfig = {
  //   pageSize: countValue, // Jumlah item per halaman berdasarkan countValue
  //   showTotal: (total, range) => (
  //     <span style={{ color: '#556172' }}>
  //       Page {Math.ceil(range[0] / paginationConfig.pageSize)} of {Math.ceil(total / paginationConfig.pageSize)}
  //     </span>
  //   ),
  //   showLessItems: true,
  // };

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

  return (
    <>
    <Row justify="space-between">
      <Row gutter="10" justify="start">
        <Col>
          {/* <SearchBox /> */}
          <Input 
          className='search-box'
          placeholder='Search' 
          prefix={<AiOutlineSearch/>} 
          onSearch={(value)=>{ 
            setSearchText(value)
          }}
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
          <AddPosition />
      </Row>
    </Row>
    <br />

    <div>
      <Table 
      columns={columns} 
      // dataSource={data} 
      loading={loading}
      dataSource={sortedData} 
      pagination={{
        pageSize: countValue,
      }} 
      />
    </div>

    {/* Modal Success and Failed for Update */}
    <SuccessModal action="Add" handleOk={handleSuccessModalOk} handleCancel={handleSuccessModalCancel} isModalOpen={isSuccessModalOpen} />
    <FailedModal handleOk={handleFailedModalOk} handleCancel={handleFailedModalCancel} isModalOpen={isFailedModalOpen}/>
  </>
  )
}

export default PositionConfiguration
