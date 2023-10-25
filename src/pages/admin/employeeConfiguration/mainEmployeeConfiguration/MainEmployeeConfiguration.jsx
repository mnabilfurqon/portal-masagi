import React from 'react'
import "./mainEmployeeConfiguration.css"
import AddButton from '../../../../components/common/addButton/AddButton'
import EmployeeTable from '../../../../components/common/employeeTable/EmployeeTable'
import { Link } from 'react-router-dom'


const MainEmployeeConfiguration = () => {
  return (
    <div className='main-employee-configuration'>
      <div className='right-buttons'>
        <Link to='/employee/add-employee'>
        <AddButton buttonText="Add Employee"/>
        </Link>
      </div>
      <div className='employee-table-container'>
        <EmployeeTable/>
      </div>
    </div>
  )
}

export default MainEmployeeConfiguration