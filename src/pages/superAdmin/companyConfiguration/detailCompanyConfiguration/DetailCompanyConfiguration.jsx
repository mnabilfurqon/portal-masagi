import React, {useEffect, useState} from 'react'
import { Button, Spin } from 'antd'
import DetailCompanyTable from '@common/tables/detailCompanyTable/DetailCompanyTable'
import './detailCompanyConfiguration.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const DetailCompanyConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [detailCompanyData, setDetailCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSelectedCompanyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://103.82.93.38/api/v1/company/${uuid}`, {
        headers: {
          "Authorization": token,
        },
      });

      setDetailCompanyData(response.data);
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
    getSelectedCompanyData();
  }, [token, navigate]);

  // handle edit company data bring uuid to edit company page
  const handleEditCompanyData = () => {
    navigate(`/company/edit-company/${uuid}`);
  }

  return (
    <Spin spinning={loading} size='large' tip="Get Selected Data...">
      <div className='container'>
          <DetailCompanyTable detailCompanyData={detailCompanyData} />
            <Button type="primary" className='edit-data-button' onClick={handleEditCompanyData}>
                Edit Data
            </Button>
      </div>
    </Spin>
  )
}

export default DetailCompanyConfiguration