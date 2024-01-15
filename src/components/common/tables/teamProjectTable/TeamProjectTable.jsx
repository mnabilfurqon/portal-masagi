import React, {useState, useEffect} from 'react'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const TeamProjectTable = (props) => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {searchValue, filterValue, sortValue, countValue, columns} = props;

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

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    //   getPermitData();
    }, [token, navigate, params, countValue, searchValue, sortValue, filterValue]);

    const dataDummy = [
        {
            key: '1',
            project_name: 'Mobile Development Project',
            team_leader: 'Samuel Eto\'o',
            start_date: '10/11/2024',
            due_date: '10/12/2024'
        },
        {
            key: '2',
            project_name: 'Mobile Development Project',
            team_leader: 'Samuel Eto\'o',
            start_date: '10/11/2024',
            due_date: '10/12/2024'
        },
        {
            key: '3',
            project_name: 'Mobile Development Project',
            team_leader: 'Samuel Eto\'o',
            start_date: '10/11/2024',
            due_date: '10/12/2024'
        }
    ];

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
        //   setPermitData([]);
        }
    };

    return (
        <div>
            <Table 
                columns={columns}
                dataSource={dataDummy}
                pagination={tableParams.pagination}
                loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default TeamProjectTable