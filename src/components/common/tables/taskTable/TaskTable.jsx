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
  const [projectFilter, setProjectFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const {searchValue, filterValue, sortValue, countValue, columns, urlApi, isSuccessDeleteModalOpen} = props;
  const dateFormat = 'DD/MM/YYYY';

    const getProjectData = async () => {
      try {
          const response = await axios.get(urlApi, {
              headers: {
                  Authorization: token,
              },
          });
          setProjectFilter(response.data.items);
      } catch (error) {
          console.log(error);
      }
    };

    const getStatusData = async () => {
        try {
            const response = await axios.get('http://103.82.93.38/api/v1/task_status/', {
                headers: {
                    Authorization: token,
                },
            });
            setStatusFilter(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    const uniqueProjectNames = new Set();
    const treeDataProject = projectFilter.map(item => {
      const projectName = item.project.name;
      if (!uniqueProjectNames.has(projectName)) {
          uniqueProjectNames.add(projectName);
              return {
                  key: item.project.uuid,
                  title: item.project.name,
              }
      }

      return null;
    }).filter(item => item !== null);

    const treeDataStatus = statusFilter.map(item => {
        return {
            key: item.uuid,
            title: item.name,
        }
    });

    // cek apakah filterValue[0] termasuk di dalam treeDataProject, jika iya maka projectParams = filterValue[0], jika tidak maka projectParams = null
    const isProject = treeDataProject.some(item => item.key === filterValue[0]);
    const projectParams = isProject ? filterValue[0] : null;

    // cek apakah filterValue[0] termasuk di dalam treeDataStatus, jika iya maka statusParams = filterValue[0], jika tidak maka statusParams = null
    const isStatus = treeDataStatus.some(item => item.key === filterValue[0]);
    const statusParams = isStatus ? filterValue[0] : null;

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
            project_uuid: projectParams,
            status_uuid: statusParams,
            desc: sortValue === 'aToZTask' ? false : true,
            sort_by: sortValue === 'zToATask' || sortValue === 'aToZTask' ? 'name' : null,
          },
          headers: {
            Authorization: token,
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
      getProjectData();
      getStatusData();
    }, [token, navigate, params, countValue, searchValue, sortValue, filterValue, isSuccessDeleteModalOpen]);

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