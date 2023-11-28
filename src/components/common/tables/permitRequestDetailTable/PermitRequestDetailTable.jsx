import React from 'react'
import './permitRequestDetailTable.css'

const PermitRequestDetailTable = ({officialTravelRequestDetail}) => {
    if (officialTravelRequestDetail) {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{officialTravelRequestDetail.employee_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Agenda</th>
                    <td>{officialTravelRequestDetail.agenda}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Destination</th>
                    <td>{officialTravelRequestDetail.destination}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Permit Date</th>
                    <td>{officialTravelRequestDetail.permit_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Permit Date</th>
                    <td>{officialTravelRequestDetail.end_permit_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{officialTravelRequestDetail.hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{officialTravelRequestDetail.team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{officialTravelRequestDetail.status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </div>
        )
    } else {
        return <p>Detail Official Travel</p>
    }
}

export default PermitRequestDetailTable