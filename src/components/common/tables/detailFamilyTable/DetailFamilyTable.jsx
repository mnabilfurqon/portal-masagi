import React from 'react'
import dayjs from 'dayjs';
import './detailFamilyTable.css'

const DetailFamilyTable = ({detailFamilyData}) => {
    if (!detailFamilyData) {
        return null;
    }

    // Pengecekan apakah birth_date belum diformat
    if (detailFamilyData.birth_date && !/^\d{2}\/\d{2}\/\d{4}$/.test(detailFamilyData.birth_date)) {
        detailFamilyData.birth_date = dayjs(detailFamilyData.birth_date).format('DD/MM/YYYY');
    }

    return (
        <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Full Name</th>
                    <td>{detailFamilyData.full_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>NIK</th>
                    <td>{detailFamilyData.nik}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Birth Date</th>
                    <td>{detailFamilyData.birth_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Birth Place</th>
                    <td>{detailFamilyData.birth_place}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>{detailFamilyData.address}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Relation</th>
                    <td>{detailFamilyData.relation}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Job</th>
                    <td>{detailFamilyData.job}</td>
                </tr>
                </tbody>
            </table>
        </div>
  )
}

export default DetailFamilyTable