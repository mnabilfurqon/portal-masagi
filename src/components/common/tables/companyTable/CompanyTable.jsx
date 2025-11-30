import React, { useEffect, useState } from "react";
import { Table, Button, Flex } from "antd";
import "./companyTable.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { dummyCompanies } from "../../../../components/common/dummy/DummyCompany";

const CompanyTable = ({ searchValue, filterValue, sortValue, countValue }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };

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

  const handleDetailClick = (record) => {
    const value = record.key;
    navigate(`/company/detail-company/${value}`);
  };

  const handleAddUserClick = (record) => {
    const value = record.key;
    navigate(`/company/add-user/${value}`);
  };

  const getCompanyData = async () => {
    try {
      setLoading(true);

      let data = [...dummyCompanies];

      if (searchValue) {
        data = data.filter((item) =>
          item.company_name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (filterValue) {
        data = data.filter((item) => {
          if (filterValue === "active") return item.is_active === true;
          if (filterValue === "notActive") return item.is_active === false;
          return true;
        });
      }

      if (sortValue === "latestJoinDate") {
        data.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        );
      } else if (sortValue === "oldestJoinDate") {
        data.sort(
          (a, b) => new Date(a.created_date) - new Date(b.created_date)
        );
      } else if (sortValue === "aToZCompany") {
        data.sort((a, b) => a.company_name.localeCompare(b.company_name));
      } else if (sortValue === "zToACompany") {
        data.sort((a, b) => b.company_name.localeCompare(a.company_name));
      }

      const totalItems = data.length;
      const startIndex = (tableParams.pagination.current - 1) * countValue;
      const paginatedData = data.slice(startIndex, startIndex + countValue);

      await new Promise((resolve) => setTimeout(resolve, 400));

      setCompanyData(paginatedData);

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalItems,
          pageSize: countValue,
        },
      });
    } catch (error) {
      console.log("Dummy Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getCompanyData();
  }, [
    token,
    navigate,
    params,
    countValue,
    searchValue,
    sortValue,
    filterValue,
  ]);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        if (text === "active") {
          return (
            <Button
              className="active-button"
              type="primary"
              size="small"
              value="active"
              ghost
            >
              active
            </Button>
          );
        } else {
          return (
            <Button
              className="not-active-button"
              type="primary"
              size="small"
              value="notActive"
              ghost
            >
              not active
            </Button>
          );
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Flex gap={10}>
          <Button
            className="action-button-company"
            type="primary"
            size="small"
            ghost
            onClick={() => handleDetailClick(record)}
          >
            <AiOutlineFileSearch className="action-icon" />
          </Button>
          <Button
            className="action-button-company"
            type="primary"
            size="small"
            ghost
            onClick={() => handleAddUserClick(record)}
          >
            <BsPersonAdd className="action-icon" />
          </Button>
        </Flex>
      ),
    },
  ];

  const data = companyData.map((item) => {
    return {
      key: item.uuid,
      companyName: item.company_name,
      address: item.address,
      phoneNumber: item.phone_number,
      dateFounded: formatDate(item.date_founded),
      email: item.email_address,
      website: item.website,
      contactPerson: item.contact_person,
      contactName: item.contact_name,
      status: item.is_active ? "active" : "notActive",
      joinDate: formatDate(item.created_date),
      updatedDate: formatDate(item.updated_date),
    };
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
      setCompanyData([]);
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
  );
};

export default CompanyTable;
