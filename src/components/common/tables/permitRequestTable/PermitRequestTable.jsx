import React, {useState} from 'react'
import './permitRequestTable.css'
import { Table } from 'antd'

const PermitRequestTable = (props) => {
    const {searchValue, filterValue, sortValue, countValue, columns} = props;

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

    const data = [
        {
            key: '1',
            employee_name: 'John Brown',
            agenda: 'Perjalanan Dinas Dalam Kota',
            destination: 'Bandung',
            permit_date: '2021-08-01',
            end_permit_date: '2021-08-02',
            hr: 'Samuel',
            team_leader: 'Jackson',
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
            team_leader: 'Johnson',
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
            team_leader: 'Jackson',
            status: 'rejected'
        }
    ];

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
            <Table 
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
                // loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default PermitRequestTable