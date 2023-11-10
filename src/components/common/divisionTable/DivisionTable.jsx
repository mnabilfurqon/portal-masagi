import React, {useState, useEffect} from 'react';
import { Table, Button, Space } from 'antd';
import './divisionTable.css'
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const DivisionTable = ({isDeleteButtonClicked, isEditButtonClicked, searchValue, sortValue, countValue, isAddModalOpen, isEditModalOpen, isDeleteModalOpen}) => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [divisionData, setDivisionData] = useState([]);

  // API GET Division Data
  const getDivisionData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/division/', {
        headers: {
          Authorization: token,
        }
      });
      setDivisionData(response.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getDivisionData();
  }, [token, navigate, isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

    const columns = [
        {
          title: 'Division',
          dataIndex: 'division',
          key: 'division',
        },
        {
          title: <div className="action-title">Action</div>,
          key: 'action',
            render: (record) => (
              <div className="action-container">
                <Space size="medium">
                    <Button className="action-button" type="primary" size="small" onClick={() => isEditButtonClicked(record)} ghost>
                        <BiEdit className="action-icon-edit" />
                    </Button>
                    <Button className="action-button" type="primary" size="small" onClick={() => isDeleteButtonClicked(record)} ghost>
                        <MdOutlineDelete className="action-icon-delete" />
                    </Button>
                </Space>
              </div>
            ),
        },
    ];
      
    const data = divisionData.map(item => {
      return {
        key: item.uuid,
        division: item.name,
        createdDate: item.created_date,
        updatedDate: item.updated_date,
      }
    });

    // Filter data berdasarkan searchValue
    const filteredData = data.filter(item =>
      item.division.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Sort data berdasarkan sortValue
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortValue === 'aToZ') {
        return a.division.localeCompare(b.division);
      } else if (sortValue === 'zToA') {
        return b.division.localeCompare(a.division);
      } else {
        return 0;
      }
    });

    const paginationConfig = {
        pageSize: countValue, // Jumlah item per halaman
        showTotal: (total, range) => (
            <span style={{ color: '#556172' }}>
                Page {Math.ceil(range[0] / paginationConfig.pageSize)} of {Math.ceil(total / paginationConfig.pageSize)}
            </span>
        ),
        showLessItems: true,
    };

    return (
      <>
        <Table 
            columns={columns}
            dataSource={sortedData}
            pagination={paginationConfig}
            rowClassName="custom-row"  
        />
      </>
    )
}

export default DivisionTable;