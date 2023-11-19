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

  const handleDetailClick = (record) => {
    const value = record.key;
    navigate(`/employee/detail-employee/${value}`);
  }

  const getEmployeeData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/v1/employee/", {
        headers: {
          "Authorization": token,
        },
      });
      setEmployeeData(response.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getEmployeeData();
  }, [token, navigate]);

    const columns = [
        {
          title: 'Employee Name',
          dataIndex: 'employee_name',
          key: 'employee_name',
          width: 400,
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
                  <Link to='/user/add-user'>
                    <Button className="action-button" type="primary" size="small" ghost>
                        <BsPersonAdd className="action-icon" />
                    </Button>
                  </Link>
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
        // nip: item.nip,
        // roleId: item.role_id,
      }
    });

    // Filter data berdasarkan searchValue
    const filteredData = data.filter(item =>
      item.employee_name.toLowerCase().includes(searchValue.toLowerCase()) &&
      // conditional rendering if else untuk filterValue
      (filterValue === 'active' ? item.status === 'active' : filterValue === 'notActive' ? item.status === 'notActive' : true)
    );

    // Sort data berdasarkan sortValue
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortValue === 'aToZ') {
        return a.employee_name.localeCompare(b.employee_name);
      } else if (sortValue === 'zToA') {
        return b.employee_name.localeCompare(a.employee_name);
      } else if (sortValue === 'latest') {
        return new Date(b.join_date) - new Date(a.join_date);
      } else if (sortValue === 'oldest') {
        return new Date(a.join_date) - new Date(b.join_date);
      } else {
        return 0;
      }
    });

    const paginationConfig = {
        pageSize: countValue, // Jumlah item per halaman
        showTotal: (total, range) => (
            <span style={{ color: '#556172' }}>
                Page {Math.ceil(range[0] / paginationConfig.pageSize)} of {Math.ceil(total / paginationConfig.pageSize)}
            </span>
        ),
        showLessItems: true,
    };

    return (
      <>
        <Table 
            columns={columns}
            dataSource={sortedData}
            pagination={paginationConfig}
            rowClassName="custom-row"  
        />
      </>
    )
}

export default EmployeeTable;