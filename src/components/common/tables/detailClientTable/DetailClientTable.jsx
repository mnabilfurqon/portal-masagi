import React from 'react'
import './detailClientTable.css'

const DetailClientTable = ({detailClientData}) => {
    if (!detailClientData) {
        return null;
    }

    return (
        <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Client Name</th>
                    <td>{detailClientData.client_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Contact Person</th>
                    <td>{detailClientData.contact_person}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Contact Person Name</th>
                    <td>{detailClientData.contact_person_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{detailClientData.email}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td>{detailClientData.phone_number}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>{detailClientData.address}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Contact Person</th>
                    <td>{detailClientData.contact_person}</td>
                </tr>
                </tbody>
            </table>
        </div>
  )
}

export default DetailClientTable