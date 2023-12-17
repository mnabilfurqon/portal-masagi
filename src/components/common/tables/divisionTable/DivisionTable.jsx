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
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState({
    pagination : {
      current: 1,
      pageSize: countValue,
      showTotal: (total, range) => (
        <div className='total-data'>
          {range[0]}-{range[1]} of {total} items
        </div>
      ),
      showLessItems: true,
    },
  });

  const [params, setParams] = useState({
    page: tableParams.pagination.current,
    per_page: tableParams.pagination.pageSize,
  });

  // API GET Division Data
  const getDivisionData = async () => {
    try {
      var page;
      setLoading(true);
      if (tableParams.pagination.total < countValue) {
        page = 1;
      } else {
        page = tableParams.pagination.current;
      }
      const response = await axios.get('https://attendance-1-r8738834.deta.app/api/v1/division/', {
        params: {
          page: page,
          per_page: countValue,
          search: searchValue,
          search_by: 'name',
          desc: sortValue === 'zToADivision' ? 'true' : 'false',
          sort_by: 'name',
        },
        headers: {
          Authorization: token,
        }
      });
      setDivisionData(response.data.items);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data._meta.total_items,
          pageSize: countValue,
        },
      });
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
    getDivisionData();
  }, [token, navigate, params, countValue, searchValue, sortValue, isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

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

    const handleTableChange = (pagination, filters, sorter) => {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          current: pagination.current,
          pageSize: countValue,
        },
        filters,
        ...sorter,
      });
  
      setParams({
        page: pagination.current,
        per_page: pagination.pageSize,
        search: searchValue,
      });
  
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setDivisionData([]);
      }
    };

    return (
      <>
        <Table 
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            rowClassName="custom-row"  
            onChange={handleTableChange}
            scroll={{ x: true, y: 650 }}
        />
      </>
    )
}

export default DivisionTable;