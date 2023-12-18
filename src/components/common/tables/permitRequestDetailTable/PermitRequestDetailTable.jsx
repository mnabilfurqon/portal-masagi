import React from 'react'
import './permitRequestDetailTable.css'
import { useLocation } from 'react-router-dom'

const PermitRequestDetailTable = ({data}) => {
    const location = useLocation();
    if (location.pathname === '/official-travel-request/detail') {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{data.employee_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Agenda</th>
                    <td>{data.agenda}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Destination</th>
                    <td>{data.destination}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Permit Date</th>
                    <td>{data.permit_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Permit Date</th>
                    <td>{data.end_permit_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{data.hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by HR</th>
                    <td>{data.status_by_hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{data.team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by Team Leader</th>
                    <td>{data.status_by_team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{data.status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </div>
        )
    } else if (location.pathname === '/leave-request/detail') {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{data.employee_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Leave</th>
                    <td>{data.type_leave}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Reason</th>
                    <td>{data.reason}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Permit Date</th>
                    <td>{data.permit_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Permit Date</th>
                    <td>{data.end_permit_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{data.hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by HR</th>
                    <td>{data.status_by_hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{data.team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by Team Leader</th>
                    <td>{data.status_by_team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{data.status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </div>
        )
    } else if (location.pathname === '/overtime-request/detail') {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{data.employee_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Overtime</th>
                    <td>{data.type_overtime}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Reason</th>
                    <td>{data.reason}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Overtime Date</th>
                    <td>{data.overtime_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Start Overtime</th>
                    <td>{data.start_overtime}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Overtime</th>
                    <td>{data.end_overtime}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Duration</th>
                    <td>{data.duration}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{data.hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by HR</th>
                    <td>{data.status_by_hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{data.team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by Team Leader</th>
                    <td>{data.status_by_team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{data.status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </div>
        )
    } else if (location.pathname === '/permit-request/detail') {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{data.employee_name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Overtime</th>
                    <td>{data.type_permit}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Reason</th>
                    <td>{data.reason}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Permit Date</th>
                    <td>{data.permit_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Permit Date</th>
                    <td>{data.end_permit_date}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{data.hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by HR</th>
                    <td>{data.status_by_hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{data.team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by Team Leader</th>
                    <td>{data.status_by_team_leader}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{data.status}</td>
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
        return null
    }
}

export default PermitRequestDetailTable