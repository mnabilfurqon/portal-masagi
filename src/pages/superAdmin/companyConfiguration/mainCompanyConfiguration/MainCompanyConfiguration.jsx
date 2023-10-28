import React from 'react'
import "./mainCompanyConfiguration.css"
import AddButton from '../../../../components/common/addButton/AddButton'
import CompanyTable from '../../../../components/common/companyTable/CompanyTable'
import { Link } from 'react-router-dom'

const MainCompanyConfiguration = ({searchValue, filterValue}) => {

  return (
    <div className='main-company-configuration'>
      <div className='right-buttons'>
        <Link to='/company/add-company'>
        <AddButton buttonText="Add Company"/>
        </Link>
      </div>
      <div className='company-table-container'>
        <CompanyTable searchValue={searchValue} filterValue={filterValue}/>
      </div>
    </div>
  )
}

export default MainCompanyConfiguration