import React, {useState, useEffect} from 'react'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import moment from "moment";
import axios from 'axios'

const TeamProjectTable = (props) => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [projectTeamData, setProjectTeamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {searchValue, sortValue, countValue, columns, isSuccessDeleteModalOpen} = props;
  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  }

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

    const getProjectTeamData = async () => {
      try {
        var page;
        setLoading(true);
        if (tableParams.pagination.total < countValue) {
          page = 1;
        } else {
          page = tableParams.pagination.current;
        }
        const response = await axios.get("http://103.82.93.38/api/v1/team_project/", {
          params: {
            page: page,
            per_page: countValue,
            search: searchValue,
            desc: sortValue === 'latestJoinDate' || sortValue === 'zToAProjectName' ? true : false,
            sort_by: sortValue === 'latestJoinDate' || sortValue === 'oldestJoinDate' ? 'created_date' : null,
          },
          headers: {
            "Authorization": token,
          },
        });
        setProjectTeamData(response.data.items);
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
        navigate("/login");
      }
      getProjectTeamData();
    }, [token, navigate, params, countValue, searchValue, sortValue, isSuccessDeleteModalOpen]);

    const data = projectTeamData.map(item => {
      const project = item.project && item.project[0];
      const teamLeader = item.team_members.find(member => member.isleader === true);

      return {
        key: item.uuid,
        project_name: project ? project.name : '',
        team_leader: teamLeader ? teamLeader.employee.name : '',
        start_date: formatDate(project ? project.start_date : ''),
        due_date: formatDate(project ? project.due_date : '')
      }
    });

    const sortedData = [...data].sort((a, b) => {
      if (sortValue === 'aToZ') {
        return a.name.localeCompare(b.name);
      } else if (sortValue === 'zToA') {
        return b.name.localeCompare(a.name);
      } else {
        return 0;
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
          setProjectTeamData([]);
        }
    };

    return (
        <div>
            <Table 
                columns={columns}
                dataSource={sortedData}
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