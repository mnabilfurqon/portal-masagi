import React from 'react'
import { Button } from 'antd'
import './permitRequestDetailTable.css'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import axios from 'axios'
import Cookies from 'js-cookie'

const PermitRequestDetailTable = ({data}) => {
    const location = useLocation();
    const token = Cookies.get('token');

    if (!data) {
        return null;
    }

    const getFileUrl = (filePath) => {
        const baseUrl = 'http://103.82.93.38/api/v1/';
        return baseUrl + filePath;
    }

    const downloadFile = () => {
        const fileUrl = getFileUrl(data.additional_file.files[0]);
    
        axios({
          url: fileUrl,
          method: 'GET',
          responseType: 'blob',
          headers: {
            'Authorization': token,
          },
        })
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'AdditionalFile.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch(error => console.error('Error downloading file:', error));
    };

    let status = "Pending";

    if (data.approved_by_hr === true || data.approved_by_hr == 'Approved') {
        data.approved_by_hr = 'Approved'
    } else if (data.approved_by_hr === false && data.reject_by !== null && data.reject_by.name === data.hr_employee.name || data.approved_by_team_lead === 'Rejected') {
        data.approved_by_hr = 'Rejected'
    } else {
        data.approved_by_hr = 'Pending'
    }

    if (data.approved_by_team_lead === true || data.approved_by_team_lead == 'Approved') {
        data.approved_by_team_lead = 'Approved'
    } else if (data.approved_by_team_lead === false && data.reject_by !== null && data.reject_by.name === data.team_lead_employee.name || data.approved_by_team_lead === 'Rejected') {
        data.approved_by_team_lead = 'Rejected'
    } else {
        data.approved_by_team_lead = 'Pending'
    }

    if (data.approved_by_hr === 'Approved' && data.approved_by_team_lead === 'Approved') {
        status = 'Approved'
    } else if (data.approved_by_hr === 'Rejected' || data.approved_by_team_lead === 'Rejected') {
        status = 'Rejected'
    } 

    // change permit date from 2024-01-11T03:02:19 to DD/MM/YYYY
    const formattedPermitDate = dayjs(data.date_permit).format('DD/MM/YYYY')
    const formattedEndDatePermit = dayjs(data.end_date_permit).format('DD/MM/YYYY')

    if (location.pathname.includes('/official-travel-request/detail')) {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{data.attendance.employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Agenda</th>
                    <td>{data.type.name}</td>
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
                    <td>{formattedPermitDate}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Permit Date</th>
                    <td>{formattedEndDatePermit}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{data.hr_employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by HR</th>
                    <td>{data.approved_by_hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{data.team_lead_employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by Team Leader</th>
                    <td>{data.approved_by_team_lead}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </div>
        )
    } else if (location.pathname.includes('/leave-request/detail')) {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{data.attendance.employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Leave</th>
                    <td>{data.type.name}</td>
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
                    <td>{formattedPermitDate}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Permit Date</th>
                    <td>{formattedEndDatePermit}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{data.hr_employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by HR</th>
                    <td>{data.approved_by_hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{data.team_lead_employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by Team Leader</th>
                    <td>{data.approved_by_team_lead}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </div>
        )
    } else if (location.pathname.includes('/overtime-request/detail')) {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{data.attendance.employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Overtime</th>
                    <td>{data.type.name}</td>
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
                    <td>{formattedPermitDate}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Start Overtime</th>
                    <td>{data.start_overtime_time}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Overtime</th>
                    <td>{data.end_overtime_time}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Duration</th>
                    <td>{data.hours_overtime}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{data.hr_employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by HR</th>
                    <td>{data.approved_by_hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{data.team_lead_employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by Team Leader</th>
                    <td>{data.approved_by_team_lead}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                </tbody>
            </table>
            </div>
        )
    } else if (location.pathname.includes('/permit-request/detail')) {
        return (
            <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Employee Name</th>
                    <td>{data.attendance.employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Overtime</th>
                    <td>{data.type.name}</td>
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
                    <td>{formattedPermitDate}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>End Permit Date</th>
                    <td>{formattedEndDatePermit}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>HR</th>
                    <td>{data.hr_employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by HR</th>
                    <td>{data.approved_by_hr}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Team Leader</th>
                    <td>{data.team_lead_employee.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status by Team Leader</th>
                    <td>{data.approved_by_team_lead}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Additional File</th>
                    <td>
                        {(() => {
                            if (data.additional_file) {
                                return (
                                <Button type="primary" onClick={downloadFile}>
                                    Download File
                                </Button>
                                );
                            } else {
                                return <span>No additional file available</span>;
                            }
                        })()}
                    </td>
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