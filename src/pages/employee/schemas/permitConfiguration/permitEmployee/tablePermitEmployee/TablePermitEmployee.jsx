import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import "./tablePermitEmployee.css";

const TablePermitEmployee = (props) => {
  let typePermit
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const location = useLocation()
  const {searchValue, filterValue, sortValue, countValue} = props;
  const [permitData, setPermitData] = useState([])
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  }
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

  const getPermitData = async () => {
    try {
      var page;
      setLoading(true);
      if (tableParams.pagination.total < countValue) {
        page = 1;
      } else {
        page = tableParams.pagination.current;
      }
      const response = await axios.get('http://103.82.93.38/api/v1/permit/', {
        params: {
          page: page,
          per_page: countValue,
          search: searchValue,
          filter: filterValue,
          type_permit: typePermit,
          desc: sortValue === 'latestEndPermitDate' ? true : false,
          sort_by: sortValue === 'latestEndPermitDate' || sortValue === 'oldestEndPermitDate' ? 'end_date_permit' : null,
          status: filterValue[0]
        },
        headers: {
          Authorization: token,
        },
      });
      setPermitData(response.data[0].items);
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

  if (location.pathname === '/leave') {
    typePermit = "cuti"
  } else if (location.pathname === '/permit') {
    typePermit = "izin"
  } else if (location.pathname === '/overtime') {
    typePermit = "lembur"
  } else if (location.pathname === '/official-travel') {
    typePermit = "dinas"
  }

  const dataPermitRaw = permitData
    .map(item => {
      let status;
      let statusByHr;
      let statusByTeamLeader;

      if (item.approved_by_hr === true && item.approved_by_team_lead === true) {
        status = 'approved';
      } else if (item.approved_by_hr === 'rejected' || item.approved_by_team_lead === 'rejected') {
        status = 'rejected';
      } else {
        status = 'pending';
      }

      if (item.approved_by_hr === true) {
        statusByHr = 'approved';
      } else if (item.approved_by_hr === false) {
        statusByHr = 'rejected';
      } else {
        statusByHr = 'pending';
      }

      if (item.approved_by_team_lead === true) {
        statusByTeamLeader = 'approved';
      } else if (item.approved_by_team_lead === false) {
        statusByTeamLeader = 'rejected';
      } else {
        statusByTeamLeader = 'pending';
      }

      return {
        key: item.uuid,
        employee_name: item.attendance.employee.name,
        type_permit: item.type.name,
        reason: item.reason,
        permit_date: formatDate(item.date_permit),
        end_permit_date: formatDate(item.end_date_permit),
        status: status,
        hr: item.hr_employee,
        status_by_hr: statusByHr,
        team_leader: item.team_lead_employee,
        status_by_team_leader: statusByTeamLeader,
      }
    });

    const dataPermit = dataPermitRaw.filter(item => {
      const isStatusMatch = filterValue.includes('approved') || filterValue.includes('rejected') || filterValue.includes('pending')
      ? filterValue.includes(item.status)
      : true

      return isStatusMatch;
    });

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getPermitData();
  }, [token, navigate, params, searchValue, filterValue, sortValue, countValue]);

  const title = [
    {
      key: "type_permit",
      title: "Type Permit",
      dataIndex: "type_permit",
      ellipsis: true,
    },
    {
      key: "reason",
      title: "Reason",
      dataIndex: "reason",
      ellipsis: true,
    },
    {
      key: "permit_date",
      title: "Permit Date",
      dataIndex: "permit_date",
      ellipsis: true,
    },
    {
      key: "end_permit_date",
      title: "End Permit Date",
      dataIndex: "end_permit_date",
      ellipsis: true,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      ellipsis: true,
      render: (text) => {
        if (text === "pending") {
          return (
            <Button
              className="pending-button"
              type="primary"
              size="small"
              value="pending"
              ghost
            >
              pending
            </Button>
          );
        } else if (text === "approved") {
          return (
            <Button
              className="approved-button"
              type="primary"
              size="small"
              value="approved"
              ghost
            >
              approved
            </Button>
          );
        } else {
          return (
            <Button
              className="rejected-button"
              type="primary"
              size="small"
              value="rejected"
              ghost
            >
              rejected
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
          className="detail-button-permit-employee"
          type="primary"
          onClick={() => handleDetailClick(record)}
          size="small"
          ghost
        >
          <AiOutlineFileSearch className="detail-icon-permit-employee" />
        </Button>
      ),
    },
  ];

  const handleDetailClick = record => {
    const value = record.key;
    navigate(`/permit/detail/${value}`);
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
      setPermitData([]);
    }
  };

  return (
    <>
      <Table
        className="table-permit-empolyee"
        columns={title}
        dataSource={dataPermit}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={loading}
        scroll={{ x: true, y: 650 }}
      />
    </>
  );
};

export default TablePermitEmployee;