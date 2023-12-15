import React from 'react'
import './detailCompanyTable.css'

const DetailCompanyTable = ({detailCompanyData}) => {
    if (!detailCompanyData) {
        return null;
    }

    return (
        <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Company Name</th>
                    <td>{detailCompanyData.company_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>{detailCompanyData.address}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td>{detailCompanyData.phone_number}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Date Founded</th>
                    <td>{detailCompanyData.date_founded}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{detailCompanyData.email_address}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Website</th>
                    <td>{detailCompanyData.website}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Contact Person</th>
                    <td>{detailCompanyData.contact_person}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Contact Name</th>
                    <td>{detailCompanyData.contact_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{detailCompanyData.is_active ? 'Active' : 'Not Active'}</td>
                </tr>
                </tbody>
            </table>
        </div>
  )
}

export default DetailCompanyTable