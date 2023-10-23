import React from 'react'
import { Button } from 'antd'
import DetailCompanyTable from '../../../../components/common/detailCompanyTable/DetailCompanyTable'
import './detailCompanyConfiguration.css'

const DetailCompanyConfiguration = () => {
  return (
    <div className='container'>
        <DetailCompanyTable />
        <Button type="primary" className='edit-data-button'>
            Edit Data
        </Button>
    </div>
  )
}

export default DetailCompanyConfiguration