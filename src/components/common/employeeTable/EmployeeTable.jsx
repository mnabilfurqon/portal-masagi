import React, {useState, useEffect} from 'react';
import { Table, Button, Space } from 'antd';
import './employeeTable.css'
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({searchValue, filterValue, sortValue, countValue}) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDetailClick = (record) => {
    const value = record.key;
    navigate(`/employee/detail-employee/${value}`);
  }

  const handleAddUserClick = (record) => {
    const value = record.key;
    navigate(`/user/add-user/${value}`);
    // navigate(`/user/add-user`);
  }

  // Handlre value filter button
  const filterArray = Array.isArray(filterValue) ? filterValue : [];
  const encodedFilterValue = filterArray.map(value => encodeURIComponent(value)).join(',');
  // End of handler value filter button

  // handle search value for status
  if (searchValue === 'active') {
    searchValue = 1;
  } else if (searchValue === 'not active') {
    searchValue = 0;
  }
  // end of handle search value for status

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

  const getEmployeeData = async () => {
    try {
      var page;
      setLoading(true);
      if (tableParams.pagination.total < countValue) {
        page = 1;
      } else {
        page = tableParams.pagination.current;
      }
      // const response = await axios.get("https://attendance-1-r8738834.deta.app/api/v1/employee/", {
      const response = await axios.get("http://127.0.0.1:5000/api/v1/employee/", {
        params: {
          page: page,
          per_page: countValue,
          search: searchValue,
          search_by: encodedFilterValue? encodedFilterValue : 'name',
          desc: sortValue === 'latestJoinDate' || sortValue === 'zToAEmployee' ? true : false,
          sort_by: sortValue === 'latestJoinDate' || sortValue === 'oldestJoinDate' ? 'created_date' : 'name',
        },
        headers: {
          "Authorization": token,
        },
      });
      setEmployeeData(response.data.items);
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
    getEmployeeData();
  }, [token, navigate, params, countValue, searchValue, sortValue, filterValue]);

    const columns = [
        {
          title: 'Employee Name',
          dataIndex: 'employee_name',
          key: 'employee_name',
        },
        {
          title: 'NIP',
          dataIndex: 'nip',
          key: 'nip',
        },
        {
          title: 'Join Date',
          dataIndex: 'join_date',
          key: 'join_date',
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: (text) => {
            if (text === 'active') {
              return (
                <Button className="active-button" type="primary" size="small" value="active" ghost>
                active
                </Button>
              );
            } else {
              return (
                <Button className="not-active-button" type="primary" size="small" value="notActive" ghost>
                not active
                </Button>
              );
            }
          },
        },
        {
          title: 'Action',
          key: 'action',
            render: (record) => (
                <Space size="small">
                    <Button className="action-button" type="primary" size="small" onClick={() => {handleDetailClick(record)}} ghost>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                    <Button className="action-button" type="primary" size="small" onClick={() => handleAddUserClick(record)} ghost>
                        <BsPersonAdd className="action-icon" />
                    </Button>
                </Space>
            ),
        },
    ];

    const data = employeeData.map(item => {
      return {
        key: item.uuid,
        created_date: item.created_date,
        updated_date: item.updated_date,
        nik: item.nik,
        employee_name: item.name,
        birth_date: item.birth_date,
        place_of_birth: item.place_of_birth,
        nationality: item.nationality,
        religion: item.religion,
        email: item.email,
        office_email: item.office_email,
        phone_number: item.phone_number,
        gender: item.gender,
        salary: item.salary,
        residence_address: item.address_1,
        id_card_address: item.address_2,
        blood_type: item.blood_type,
        number_of_child: item.number_of_child,
        marital_status: item.marital_status,
        registery_number: item.registery_number,
        no_bpjs_tk: item.no_bpjs_tk,
        no_bpjs_kes: item.no_bpjs_kes,
        npwp: item.npwp,
        join_date: item.join_date,
        emergency_contact_name: item.emergency_contact_name,
        emergency_contact_number: item.emergency_contact_number,
        separation_date: item.separation_date,
        status: item.is_active ? 'active' : 'notActive',
        bank_name: item.bank_name,
        account_bank_number: item.account_bank_number,
        account_holder_name: item.account_holder_name,
        position_id: item.position_id,
        division_id: item.division_id,
        company_id: item.company_id,
        nip: item.nip,
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
        setEmployeeData([]);
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
    )
}

export default EmployeeTable;