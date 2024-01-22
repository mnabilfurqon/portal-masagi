import React, {useState, useEffect} from 'react';
import { Table, Button, Space } from 'antd';
import './educationTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

const EducationTable = ({onDetailClick}) => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const { uuid } = useParams();

  const [tableParams, setTableParams] = useState({
    pagination : {
      current: 1,
      pageSize: 5,
      showTotal: (total, range) => (
        <div className='total-data'>
          {range[0]}-{range[1]} of {total} items
        </div>
      ),
      showLessItems: true,
    },
  });

  // API GET Education Data
  const getEducationData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://103.82.93.38/api/v1/education/employee/${uuid}`, {
        headers: {
          Authorization: token,
        }
      });
      setEducationData(response.data.items);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          pageSize: 5,
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
      navigate("/login");
    }
    getEducationData();
  }, [token, navigate]);

    const columns = [
        {
          title: 'Education',
          dataIndex: 'education',
          key: 'education',
        },
        {
          title: 'Institution',
          dataIndex: 'institute',
          key: 'institute',
        },
        {
          title: 'Entry Year',
          dataIndex: 'entry_year',
          key: 'entry_year',
          defaultSortOrder: 'descend',
          sorter: (a, b) => new Date(a.entry_year) - new Date(b.entry_year),
        },
        {
          title: 'Out Year',
          key: 'out_year',
          dataIndex: 'out_year',
        },
        {
          title: 'Action',
          key: 'action',
            render: (record) => (
                <Space size="small">
                    <Button className="action-button" type="primary" size="small" ghost onClick={() => onDetailClick(record)}>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                </Space>
            ),
        },
    ];
      
    const data = educationData.map(item => {
      return {
        key: item.education_items.uuid,
        education: item.education_items.education,
        institute: item.education_items.institute,
        major: item.education_items.major,
        thesis: item.education_items.thesis,
        ipk: item.education_items.ipk,
        certificate_number: item.education_items.certificate_number,
        entry_year: dayjs(item.education_items.entry_year).format('YYYY'),
        out_year: dayjs(item.education_items.out_year).format('YYYY'),
      }
    });

    const handleTableChange = (pagination, filters, sorter) => {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          current: pagination.current,
          pageSize: 5,
        },
        filters,
        ...sorter,
      });
  
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setEducationData([]);
      }
    };

    return (
      <>
        <Table 
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            rowClassName="custom-row"  
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: true, y: 650 }}
        />
      </>
    )
}

export default EducationTable;