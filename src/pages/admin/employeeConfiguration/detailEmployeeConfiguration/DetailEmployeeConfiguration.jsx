import React from 'react'
import "./detailEmployeeConfiguration.css"
import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import EmployeeTabs from '../../../../components/common/employeeTabs/EmployeeTabs';

const DetailEmployeeConfiguration = () => {
  return (
    <div>
        <div className='profile-container'>
            <Avatar size={128} icon={<UserOutlined />} />
            <div className='profile-info'>
                <h2 className='profile-name'>John Doe</h2>
                <p className='profile-role'>Manager IT</p>
            </div>
        </div>
        <Divider className='profile-divider'/>
        <div className='profile-tabs'>
            <EmployeeTabs />
        </div>
    </div>
  )
}

export default DetailEmployeeConfiguration