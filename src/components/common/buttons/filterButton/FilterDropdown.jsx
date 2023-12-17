import { Button, Dropdown } from 'antd'
import React from 'react'
import { MdFilterList } from "react-icons/md"

const FilterDropdown = ({items, text, className}) => {
  return (
    <>
        <Dropdown 
            menu={{
                items
            }}
            placement='bottom'
            className={className}
        >
            <Button icon={<MdFilterList />}>
                {text}
            </Button>
        </Dropdown>
    </>
  )
}

export default FilterDropdown