import React, {useState} from 'react'
import './permitRequestTable.css'
import { Table } from 'antd'
import { useLocation } from 'react-router-dom'

const PermitRequestTable = (props) => {
    const {searchValue, filterValue, sortValue, countValue, columns} = props;
    const location = useLocation();

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

    const dataOfficialTravel = [
        {
            key: '1',
            employee_name: 'John Brown',
            agenda: 'Perjalanan Dinas Dalam Kota',
            destination: 'Bandung',
            permit_date: '2021-08-01',
            end_permit_date: '2021-08-02',
            hr: 'Samuel',
            status_by_hr: 'approved',
            team_leader: 'Jackson',
            status_by_team_leader: 'pending',
            status: 'pending'
        },
        {
            key: '2',
            employee_name: 'Jim Green',
            agenda: 'Perjalanan Dinas Luar Kota',
            destination: 'Jakarta',
            permit_date: '2021-08-02',
            end_permit_date: '2021-08-03',
            hr: 'Jacky',
            status_by_hr: 'approved',
            team_leader: 'Johnson',
            status_by_team_leader: 'approved',
            status: 'approved'
        },
        {
            key: '3',
            employee_name: 'Joe Black',
            agenda: 'Perjalanan Dinas Dalam Kota',
            destination: 'Bandung',
            permit_date: '2021-08-03',
            end_permit_date: '2021-08-04',
            hr: 'Samuel',
            status_by_hr: 'rejected',
            team_leader: 'Jackson',
            status_by_team_leader: 'rejected',
            status: 'rejected'
        }
    ];

    const dataLeave = [
      {
        key: '1',
        employee_name: 'John Brown',
        type_leave: 'Cuti Sakit',
        reason: 'Masa Pemulihan',
        permit_date: '2021-08-01',
        end_permit_date: '2021-08-02',
        status: 'pending',
        hr: 'Samuel',
        status_by_hr: 'approved',
        team_leader: 'Jackson',
        status_by_team_leader: 'pending',
      },
      {
        key: '2',
        employee_name: 'Jim Green',
        type_leave: 'Cuti Sakit',
        reason: 'Masa Pemulihan',
        permit_date: '2021-08-02',
        end_permit_date: '2021-08-03',
        status: 'approved',
        hr: 'Jacky',
        status_by_hr: 'approved',
        team_leader: 'Johnson',
        status_by_team_leader: 'approved',
      },
      {
        key: '3',
        employee_name: 'Joe Black',
        type_leave: 'Cuti Sakit',
        reason: 'Masa Pemulihan',
        permit_date: '2021-08-03',
        end_permit_date: '2021-08-04',
        status: 'rejected',
        hr: 'Samuel',
        status_by_hr: 'rejected',
        team_leader: 'Jackson',
        status_by_team_leader: 'rejected',
      }
    ];

    const dataPermit = [
      {
        key: '1',
        employee_name: 'John Brown',
        type_permit: 'Izin Khusus',
        reason: 'Acara Keagamaan',
        permit_date: '2021-08-01',
        end_permit_date: '2021-08-02',
        status: 'pending',
        hr: 'Samuel',
        status_by_hr: 'approved',
        team_leader: 'Jackson',
        status_by_team_leader: 'pending',
      },
      {
        key: '2',
        employee_name: 'Jim Green',
        type_permit: 'Izin Khusus',
        reason: 'Acara Keagamaan',
        permit_date: '2021-08-02',
        end_permit_date: '2021-08-03',
        status: 'approved',
        hr: 'Jacky',
        status_by_hr: 'approved',
        team_leader: 'Johnson',
        status_by_team_leader: 'approved',
      },
      {
        key: '3',
        employee_name: 'Joe Black',
        type_permit: 'Izin Khusus',
        reason: 'Acara Keagamaan',
        permit_date: '2021-08-03',
        end_permit_date: '2021-08-04',
        status: 'rejected',
        hr: 'Samuel',
        status_by_hr: 'rejected',
        team_leader: 'Jackson',
        status_by_team_leader: 'rejected',
      }
    ];

    const dataOvertime = [
      {
        key: '1',
        employee_name: 'John Brown',
        type_overtime: 'Office Hour',
        reason: 'Menyelesaikan Tugas',
        overtime_date: '2021-08-01',
        start_overtime: '08:00',
        end_overtime: '11:00',
        duration: '3 Hour',
        status: 'pending',
        hr: 'Samuel',
        status_by_hr: 'approved',
        team_leader: 'Jackson',
        status_by_team_leader: 'pending',
      },
      {
        key: '2',
        employee_name: 'Jim Green',
        type_overtime: 'Office Hour',
        reason: 'Menyelesaikan Tugas',
        overtime_date: '2021-08-02',
        start_overtime: '09:00',
        end_overtime: '11:00',
        duration: '2 Hour',
        status: 'approved',
        hr: 'Jacky',
        status_by_hr: 'approved',
        team_leader: 'Johnson',
        status_by_team_leader: 'approved',
      },
      {
        key: '3',
        employee_name: 'Joe Black',
        type_overtime: 'Office Hour',
        reason: 'Menyelesaikan Tugas',
        overtime_date: '2021-08-03',
        start_overtime: '09:00',
        end_overtime: '10:00',
        duration: '1 Hour',
        status: 'rejected',
        hr: 'Samuel',
        status_by_hr: 'rejected',
        team_leader: 'Jackson',
        status_by_team_leader: 'rejected',
      }
    ]

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
        //   setEmployeeData([]);
        }
    };

    return (
        <div>
          {location.pathname === '/official-travel-request' ? 
            <Table 
                columns={columns}
                dataSource={dataOfficialTravel}
                pagination={tableParams.pagination}
                // loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
          : location.pathname === '/leave-request' ?  
            <Table 
                columns={columns}
                dataSource={dataLeave}
                pagination={tableParams.pagination}
                // loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
          : location.pathname === '/permit-request' ?
            <Table 
                columns={columns}
                dataSource={dataPermit}
                pagination={tableParams.pagination}
                // loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
          : location.pathname === '/overtime-request' ?
            <Table 
                columns={columns}
                dataSource={dataOvertime}
                pagination={tableParams.pagination}
                // loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
          : null }
        </div>
    )
}

export default PermitRequestTable