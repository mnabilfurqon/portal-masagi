import React from 'react'
import "./CompanyConfiguration.css"
import AddButton from '../../components/common/addButton/AddButton'
import CompanyTable from './CompanyTable'

const CompanyConfiguration = () => {

  return (
    <>
        <div className='right-buttons'>
          <AddButton buttonText="Add Company"/>
        </div>
      <div className='company-table-container'>
        <CompanyTable/>
      </div>
    </>
  )
}

export default CompanyConfiguration