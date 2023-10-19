import React from 'react'
import "./CompanyConfiguration.css"
import SearchBox from '../../components/common/SearchBox/SearchBox'
import FilterButton from '../../components/common/FilterButton/FilterButton'
import SortButton from '../../components/common/SortButton/SortButton'
import CountButton from '../../components/common/countButton/CountButton'
import AddButton from '../../components/common/addButton/AddButton'
import CompanyTable from './CompanyTable'

const CompanyConfiguration = () => {

  return (
    <>
      <div className="buttons-container">
        <div className='left-buttons'>
          <SearchBox className='search-box'/>
          <FilterButton className='filter-button'/>
          <SortButton className='sort-button'/>
          <CountButton className='count-button'/>
        </div>
        <div className='right-buttons'>
          <AddButton buttonText="Add Company"/>
        </div>
      </div>
      <div className='company-table-container'>
        <CompanyTable/>
      </div>
    </>
  )
}

export default CompanyConfiguration