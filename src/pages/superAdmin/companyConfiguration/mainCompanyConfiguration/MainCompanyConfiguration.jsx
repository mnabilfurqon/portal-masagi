import React from 'react'
import "./mainCompanyConfiguration.css"
import AddButton from '../../../../components/common/addButton/AddButton'
import CompanyTable from '../../../../components/common/companyTable/CompanyTable'

const MainCompanyConfiguration = () => {

  return (
    <div className='main-company-configuration'>
      <div className='right-buttons'>
        <AddButton buttonText="Add Company"/>
      </div>
      <div className='company-table-container'>
        <CompanyTable/>
      </div>
    </div>
  )
}

export default MainCompanyConfiguration