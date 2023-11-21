import React from 'react'
import './detailEducationTable.css'

const DetailEducationTable = ({detailEducationData}) => {
    if (!detailEducationData) {
        return null;
    }

    return (
        <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Education</th>
                    <td>{detailEducationData.education}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Institution</th>
                    <td>{detailEducationData.institute}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Major</th>
                    <td>{detailEducationData.major}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Thesis</th>
                    <td>{detailEducationData.thesis}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>GPA</th>
                    <td>{detailEducationData.ipk}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Certificate Number</th>
                    <td>{detailEducationData.certificate_number}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Entry Year</th>
                    <td>{detailEducationData.entry_year}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Out Year</th>
                    <td>{detailEducationData.out_year}</td>
                </tr>
                </tbody>
            </table>
        </div>
  )
}

export default DetailEducationTable