import React, {useEffect, useState} from 'react'
import { Button } from 'antd'
import DetailCompanyTable from '../../../../components/common/detailCompanyTable/DetailCompanyTable'
import './detailCompanyConfiguration.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const DetailCompanyConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [detailCompanyData, setDetailCompanyData] = useState(null);

  const getSelectedCompanyData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/company/${uuid}`, {
        headers: {
          "Authorization": token,
        },
      });

      setDetailCompanyData(response.data);
    } catch (error) {
      console.log(error);
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
    <div className='container'>
        <DetailCompanyTable detailCompanyData={detailCompanyData} />
          <Button type="primary" className='edit-data-button' onClick={handleEditCompanyData}>
              Edit Data
          </Button>
    </div>
  )
}

export default DetailCompanyConfiguration