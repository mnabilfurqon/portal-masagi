import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "antd";
import { AiOutlineFileSearch } from "react-icons/ai";
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import "./tableProjectReport.css";

const TableProjectReport = (props) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { searchValue, filterValue, countValue } = props;
  const [projectReportData, setProjectReportData] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateFormat = "DD/MM/YYYY";
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: countValue,
      showTotal: (total, range) => (
        <div className="total-data">
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

  const getStatusData = async () => {
    try {
      const response = await axios.get(
        "http://103.82.93.38/api/v1/project_status/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setStatusFilter(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectReportData = async () => {
    try {
      var page;
      setLoading(true);
      if (tableParams.pagination.total < countValue) {
        page = 1;
      } else {
        page = tableParams.pagination.current;
      }
      const response = await axios.get("http://103.82.93.38/api/v1/project/", {
        params: {
          page: page,
          per_page: countValue,
          search: searchValue,
          status_uuid: statusParams,
        },
        headers: {
          Authorization: token,
        },
      });
      setProjectReportData(response.data.items);
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

  const radioDataStatusRaw = statusFilter.map((item) => {
    return {
      key: item.uuid,
      label: item.name,
      type: "status",
    };
  });

  const isStatus = radioDataStatusRaw.some(
    (item) => item.key === filterValue
  );
  const statusParams = isStatus ? filterValue : null;

  const data = projectReportData.map((item) => {
    return {
      key: item.uuid,
      client: item.client.name,
      project: item.name,
      start_date: dayjs(item.start_date).format(dateFormat),
      due_date: dayjs(item.due_date).format(dateFormat),
      status: item.status.name,
    };
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getProjectReportData();
    getStatusData();
  }, [token, navigate, params, searchValue, filterValue, countValue]);

  const title = [
    {
      key: "client",
      title: "Client",
      dataIndex: "client",
      ellipsis: true,
    },
    {
      key: "project",
      title: "Project Name",
      dataIndex: "project",
      ellipsis: true,
    },
    {
      key: "start_date",
      title: "Start Date",
      dataIndex: "start_date",
      ellipsis: true,
    },
    {
      key: "due_date",
      title: "Due Date",
      dataIndex: "due_date",
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
    },
    {
      key: "action",
      title: "Action",
      ellipsis: true,
      render: (record) => (
        <Button
          className="detail-button-project-report"
          type="primary"
          onClick={() => handleDetailClick(record)}
          size="small"
          ghost
        >
          <AiOutlineFileSearch className="detail-icon-project-report" />
        </Button>
      ),
    },
  ];

  const handleDetailClick = (record) => {
    const value = record.key;
    navigate(`/project-report/detail-project/${value}`);
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
      setProjectReportData([]);
    }
  };

  return (
    <>
      <div className="project-report-table">
        <p className="table-title">All Project</p>
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
};

export default TableProjectReport;
