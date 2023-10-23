import React from 'react'
import { Button } from 'antd'
import DetailCompanyTable from '../../../../components/common/detailCompanyTable/DetailCompanyTable'
import './detailCompanyConfiguration.css'
import { Link } from 'react-router-dom'

const DetailCompanyConfiguration = () => {
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

export default DetailCompanyConfiguration