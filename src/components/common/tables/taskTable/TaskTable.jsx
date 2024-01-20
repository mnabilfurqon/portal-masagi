import React, {useState, useEffect} from 'react'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import './taskTable.css'
import Cookies from 'js-cookie'

const TaskTable = (props) => {
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
            project: 'Web Development Project',
            client: 'PT. ABC',
            task: 'Create Register Page',
            deadline: '01/12/2023',
            assignTo: 'John Doe',
            createdBy: 'Samuel Jackson',
            status: 'in progress',
        },
        {
            key: '2',
            project: 'Web Development Project',
            client: 'PT. ABC',
            task: 'Create Login Page',
            deadline: '07/12/2023',
            assignTo: 'John Doe',
            createdBy: 'Samuel Jackson',
            status: 'done',
        },
        {
            key: '3',
            project: 'Web Development Project',
            client: 'PT. ABC',
            task: 'Create Home Page',
            deadline: '14/12/2023',
            assignTo: 'John Doe',
            createdBy: 'Samuel Jackson',
            status: 'review',
        },
        {
            key: '4',
            project: 'Web Development Project',
            client: 'PT. ABC',
            task: 'Create About Page',
            deadline: '21/12/2023',
            assignTo: 'John Doe',
            createdBy: 'Samuel Jackson',
            status: 'cancel',
        },
        {
            key: '5',
            project: 'Web Development Project',
            client: 'PT. ABC',
            task: 'Create Contact Page',
            deadline: '28/12/2023',
            assignTo: 'John Doe',
            createdBy: 'Samuel Jackson',
            status: 'open',
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

export default TaskTable