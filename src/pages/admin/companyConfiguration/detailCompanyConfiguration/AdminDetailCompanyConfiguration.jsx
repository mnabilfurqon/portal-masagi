import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'antd'
import DetailCompanyTable from '../../../../components/common/detailCompanyTable/DetailCompanyTable'
import './adminDetailCompanyConfiguration.css'
import axios from 'axios'
import Cookies from 'js-cookie';

const AdminDetailCompanyConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [companyProfile, setCompanyProfile] = useState([]);
  const [uuid, setUuid] = useState('');

  const getCompanyProfile = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/v1/company/profile", {
        headers: {
          Authorization: token,
        },
      });
      setCompanyProfile(response.data);
      setUuid(response.data.uuid);
    } catch (error) {
      console.log(error);
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
    <div className='container'>
        <DetailCompanyTable detailCompanyData={companyProfile} />
        <Button type="primary" className='edit-data-button' onClick={handleEditCompanyData}>
            Edit Data
        </Button>
    </div>
  )
}

export default AdminDetailCompanyConfiguration