import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Table } from 'antd';
import { AiOutlineFileSearch } from "react-icons/ai";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from 'dayjs'
import "./tableTaskReport.css"

const TableTaskReport = (props) => {
  // let urlApi;
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const {searchValue, filterValue, countValue} = props;
  // const roleName = decodeURIComponent(Cookies.get('role_name'));
  const [taskReportData, setTaskReportData] = useState([])
  const [loading, setLoading] = useState(false);
  const dateFormat = 'DD/MM/YYYY';
  const [tableParams, setTableParams] = useState({
    pagination: {
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

  // if (roleName !== 'Head of Division') {
  //   urlApi = 'http://103.82.93.38/api/v1/task/employee'
  // } else {
  //   urlApi = 'http://103.82.93.38/api/v1/task/'
  // }

  const getTaskReportData = async () => {
    try {
      var page;
      setLoading(true);
      if (tableParams.pagination.total < countValue) {
        page = 1;
      } else {
        page = tableParams.pagination.current;
      }
      const response = await axios.get("http://103.82.93.38/api/v1/task/", {
        params: {
          page: page,
          per_page: countValue,
          search: searchValue,
        },
        headers: {
          Authorization: token,
        },
      });
      setTaskReportData(response.data.items);
      console.log(response.data.items)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data[0]._meta.total_items,
          pageSize: countValue,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const data = taskReportData.map(item => {
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

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getTaskReportData();
  }, [token, navigate, params, searchValue, filterValue, countValue]);

  const title = [
    {
      key: "project",
      title: "Project",
      dataIndex: "project",
      ellipsis: true,
    },
    {
      key: "client",
      title: "Client",
      dataIndex: "client",
      ellipsis: true,
    },
    {
      key: "task",
      title: "Task",
      dataIndex: "task",
      ellipsis: true,
    },
    {
      key: "deadline",
      title: "Deadline",
      dataIndex: "deadline",
      ellipsis: true,
    },
    {
      key: "assignTo",
      title: "Assign To",
      dataIndex: "assignTo",
      ellipsis: true,
    },
    {
      key: "createdBy",
      title: "Created By",
      dataIndex: "createdBy",
      ellipsis: true,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      ellipsis: true,
      render: (text) => {
        if (text === "in-progress") {
          return (
            <Button
              className="in-progress-buttons"
              type="primary"
              size="small"
              value="in-progress"
              ghost
            >
              in-progress
            </Button>
          );
        } else if (text === "done") {
          return (
            <Button
              className="done-buttons"
              type="primary"
              size="small"
              value="done"
              ghost
            >
              done
            </Button>
          );
        } else if (text === "review") {
          return (
            <Button
              className="review-buttons"
              type="primary"
              size="small"
              value="review"
              ghost
            >
              review
            </Button>
          );
        } else if (text === "cancel") {
          return (
            <Button
              className="cancel-buttons"
              type="primary"
              size="small"
              value="cancel"
              ghost
            >
              cancel
            </Button>
          );
        } else {
          return (
            <Button
              className="open-buttons"
              type="primary"
              size="small"
              value="open"
              ghost
            >
              open
            </Button>
          );
        }
      },
      filters: [
        {
          text: 'In-Progress',
          value: 'in-progress',
        },
        {
          text: 'Done',
          value: 'done',
        },
        {
          text: 'Review',
          value: 'review',
        },
        {
          text: 'Cancel',
          value: 'cancel',
        },
        {
          text: 'Open',
          value: 'open',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      key: "action",
      title: "Action",
      ellipsis: true,
      render: (record) => (
        <Button
          className="detail-button-task-report"
          type="primary"
          onClick={() => handleDetailClick(record)}
          size="small"
          ghost
        >
          <AiOutlineFileSearch className="detail-icon-task-report" />
        </Button>
      ),
    },
  ];

  const handleDetailClick = record => {
    const value = record.key;
    navigate(`/task-report/detail-task/${value}`);
  };

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
      setTaskReportData([]);
    }
  };

  return (
    <>
    <div className="task-report-table">
      <p className='table-title'>All Task</p>
      <Table
        columns={title}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={loading}
        scroll={{ x: true, y: 650 }}
      />
    </div>
    </>
  );
}

export default TableTaskReport;
