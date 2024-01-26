import React, {useState, useEffect} from 'react'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

const ClientTable = (props) => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(false);
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

    const getClientData = async () => {
      try {
        var page;
        setLoading(true);
        if (tableParams.pagination.total < countValue) {
          page = 1;
        } else {
          page = tableParams.pagination.current;
        }
        const response = await axios.get("http://103.82.93.38/api/v1/client/", {
          params: {
            page: page,
            per_page: countValue,
            search: searchValue,
            desc: sortValue === 'zToAClientName' ? true : false,
          },
          headers: {
            "Authorization": token,
          },
        });
        setClientData(response.data.items);
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
      getClientData();
    }, [token, navigate, params, countValue, searchValue, sortValue, filterValue]);

    const data = clientData.map(item => {
      return {
        key: item.uuid,
        client_name: item.name,
        contact_person: item.contact_person,
        contact_person_name: item.contact_person_name,
        email: item.email,
        phone_number: item.phone_number,
        address: item.address,
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
          setClientData([]);
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

export default ClientTable