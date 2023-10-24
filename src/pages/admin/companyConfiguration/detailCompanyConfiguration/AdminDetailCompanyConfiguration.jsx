import React from 'react'
import { Link } from "react-router-dom";
import { Button } from 'antd'
import DetailCompanyTable from '../../../../components/common/detailCompanyTable/DetailCompanyTable'
import './adminDetailCompanyConfiguration.css'

const AdminDetailCompanyConfiguration = () => {
  return (
    <div className='container'>
        <DetailCompanyTable />
        <Link to='/company/edit-company'>
        <Button type="primary" className='edit-data-button'>
            Edit Data
        </Button>
        </Link>
    </div>
  )
}

export default AdminDetailCompanyConfiguration