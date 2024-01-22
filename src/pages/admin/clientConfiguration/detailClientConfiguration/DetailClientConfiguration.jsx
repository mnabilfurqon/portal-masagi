import React, {useEffect, useState} from 'react'
import { Button, Spin } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import DetailClientTable from '@common/tables/detailClientTable/DetailClientTable'

const DetailClientConfiguration = () => {
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
        navigate("/login");
        }
        // getSelectedCompanyData();
    }, [token, navigate]);

    // handle edit company data bring uuid to edit company page
    const handleEditClientData = () => {
        navigate(`/client/edit-client/${uuid}`);
    }

    //detail client data dummy
    const detailClientData = {
        client_name: 'PT ABC',
        contact_person: '08128768612',
        contact_person_name: 'Samuel Eto\'o',
        email: 'abc@gmail.com',
        phone_number: '081234567890',
        address: 'Jl. ABC',
    }

  return (
    <Spin spinning={loading} size='large' tip="Get Selected Data...">
      <div className='container'>
            <DetailClientTable detailClientData={detailClientData} />
            <Button type="primary" className='edit-data-button' onClick={handleEditClientData}>
                Edit Data
            </Button>
      </div>
    </Spin>
  )
}

export default DetailClientConfiguration