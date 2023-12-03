import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TABLE_DATA } from "./constans";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./tablePermitEmployee.css";

const TablePermitEmployee = (props) => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const {searchValue, filterValue, sortValue, countValue, columns} = props;
  const [loading, setLoading] = useState(false);
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
      const response = await axios.get('', {
        params: {
          page: page,
          per_page: countValue,
          search: searchValue,
          desc: sortValue === 'latest' ? true : false,
        },
        headers: {
          Authorization: token,
        },
      });
      // setPermitData(response.data.items);
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

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // getPermitData();
  }, [token, navigate]);

  const title = [
    {
      key: "typePermit",
      title: "Type Permit",
      dataIndex: "typePermit",
    },
    {
      key: "reason",
      title: "Reason",
      dataIndex: "reason",
    },
    {
      key: "permitDate",
      title: "Permit Date",
      dataIndex: "permitDate",
    },
    {
      key: "endPermitDate",
      title: "End Permit Date",
      dataIndex: "endPermitDate",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
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
    // const value = record.key;
    navigate(`/permit/detail`);
  };

  const handleTableChange = (pagination, sorter) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
        pageSize: countValue,
      },
      ...sorter,
    });

    setParams({
      page: pagination.current,
      per_page: pagination.pageSize,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setRoleData([]);
    }
  };

  return (
    <>
      <Table
        className="table-permit-empolyee"
        columns={title}
        dataSource={TABLE_DATA}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={loading}
        scroll={{ x: true, y: 650 }}
      />
    </>
  );
};

export default TablePermitEmployee;