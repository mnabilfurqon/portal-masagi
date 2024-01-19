import React from "react";
import dayjs from "dayjs";
import "./detailOvertimeEmployee.css"

const DetailOvertimeTable = ({data}) => {
  if (!data) {
    return null;
  }

  let status = "Pending";

  if (data.approved_by_hr === true) {
    data.approved_by_hr = "Approved";
  } else if (
    data.approved_by_hr === false &&
    data.reject_by !== null &&
    data.reject_by.name === data.hr_employee.name
  ) {
    data.approved_by_hr = "Rejected";
  } else {
    data.approved_by_hr = "Pending";
  }

  if (data.approved_by_team_lead === true) {
    data.approved_by_team_lead = "Approved";
  } else if (
    data.approved_by_team_lead === false &&
    data.reject_by !== null &&
    data.reject_by.name === data.team_lead_employee.name
  ) {
    data.approved_by_team_lead = "Rejected";
  } else {
    data.approved_by_team_lead = "Pending";
  }

  if (
    data.approved_by_hr === "Approved" &&
    data.approved_by_team_lead === "Approved"
  ) {
    status = "Approved";
  } else if (
    data.approved_by_hr === "Rejected" ||
    data.approved_by_team_lead === "Rejected"
  ) {
    status = "Rejected";
  }

  const formattedPermitDate = dayjs(data.date_permit).format("DD/MM/YYYY");

  return (
    <>
      <div className="table-container-detail">
        <table className="table-content-detail">
          <tbody>
            <tr>
              <th>Reason</th>
              <td>{data.type.name}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Date</th>
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DetailOvertimeTable;