import React, {useState, useEffect} from 'react';
import { Table, Button, Space } from 'antd';
import './familyTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const FamilyTable = ({onDetailClick}) => {
  const [familyData, setFamilyData] = useState([]);
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

  // API GET Family Data
  const getFamilyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/family/employee/${uuid}`, {
        headers: {
          Authorization: token,
        }
      });
      setFamilyData(response.data.items);
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
    getFamilyData();
  }, [token, navigate]);

    const columns = [
        {
          title: 'Full Name',
          dataIndex: 'full_name',
          key: 'full_name',
        },
        {
          title: 'NIK',
          dataIndex: 'nik',
          key: 'nik',
        },
        {
          title: 'Relation',
          dataIndex: 'relation',
          key: 'relation',
        },
        {
          title: 'Job',
          key: 'job',
          dataIndex: 'job',
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
      
    const data = familyData.map(item => {
        return {
            key: item.family_members.uuid,
            full_name: item.family_members.full_name,
            nik: item.family_members.nik,
            birth_date: item.family_members.birth_date,
            birth_place: item.family_members.birth_place,
            address: item.family_members.address,
            relation: item.family_members.relation,
            job: item.family_members.job,
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
        setFamilyData([]);
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

export default FamilyTable;