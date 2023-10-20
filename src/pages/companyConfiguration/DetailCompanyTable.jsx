import React from 'react'
import './detailCompanyTable.css'
import { Button } from 'antd'

const DetailCompanyTable = () => {
  return (
    <div className='container'>
        <table className='table-container'>
            <table className='table-content'>
                <tr>
                    <th>Company Name</th>
                    <td>Mitra Solusi Aktual Integrasi</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>Point Lab Co-working Space Graha POS Lantai 2 Blok C Jalan Banda No.30 Citarum Wetan Kota Bandung Jawa Barat Indonesia</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td>022-12345678</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Date Founded</th>
                    <td>05/10/2021</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>helpdesk@masagi.co.id</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Website</th>
                    <td>https://masagi.co.id/</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Contact Person</th>
                    <td>081234567890</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Contact Name</th>
                    <td>Suci Sukmawati</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>Active</td>
                </tr>
            </table>
        </table>
        <Button type="primary" className='edit-data-button'>
            Edit Data
        </Button>
    </div>
  )
}

export default DetailCompanyTable