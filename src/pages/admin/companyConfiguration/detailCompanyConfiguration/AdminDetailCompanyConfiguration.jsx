import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button, Spin } from 'antd'
import DetailCompanyTable from '@common/tables/detailCompanyTable/DetailCompanyTable'
import './adminDetailCompanyConfiguration.css'
import axios from 'axios'
import Cookies from 'js-cookie';

const AdminDetailCompanyConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [companyProfile, setCompanyProfile] = useState([]);
  const [uuid, setUuid] = useState('');
  const [loading, setLoading] = useState(false);

  const getCompanyProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://103.82.93.38/api/v1/company/profile", {
        headers: {
          Authorization: token,
        },
      });
      setCompanyProfile(response.data);
      setUuid(response.data.uuid);
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
    getCompanyProfile();
  }, [token, navigate]);

  const handleEditCompanyData = () => {
    navigate(`/company/edit-company/${uuid}`);
  }

  return (
    <Spin spinning={loading} size='large' tip="Get Company Data...">
      <div className='container'>
          <DetailCompanyTable detailCompanyData={companyProfile} />
          <Button type="primary" className='edit-data-button' onClick={handleEditCompanyData}>
              Edit Data
          </Button>
      </div>
    </Spin>
  )
}

export default AdminDetailCompanyConfiguration