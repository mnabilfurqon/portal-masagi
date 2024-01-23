import React, {useState, useEffect} from 'react'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import './taskTable.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import dayjs from 'dayjs'

const TaskTable = (props) => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {searchValue, filterValue, sortValue, countValue, columns, urlApi} = props;
  const dateFormat = 'DD/MM/YYYY';

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

    const getTaskData = async () => {
      try {
        var page;
        setLoading(true);
        if (tableParams.pagination.total < countValue) {
          page = 1;
        } else {
          page = tableParams.pagination.current;
        }

        const response = await axios.get(urlApi, {
          params: {
            page: page,
            per_page: countValue,
            search: searchValue,
            project_uuid: filterValue[0],
            desc: sortValue === 'zToATask' ? true : false,
            sort_by: 'name',
          },
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "69420",
          },
        });

        setTaskData(response.data.items);

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
    };

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
      getTaskData();
    }, [token, navigate, params, countValue, searchValue, sortValue, filterValue]);

  const data = taskData.map(item => {
    return {
      key: item.uuid,
      project: item.project.name,
      client: item.project.client.name,
      task: item.name,
      deadline: dayjs(item.deadline).format(dateFormat),
      assignTo: item.asign_to_employee.name,
      createdBy: item.created_by_employee.name,
      status: item.status.name,
    }
  })

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
            setTaskData([]);
        }
    };

    return (
        <div>
            <Table 
                columns={columns}
                dataSource={data}
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