import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./detailOvertimeEmployee.css"

const DetailOvertimeEmployee = ({detailOvertimeData}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="table-container-detail">
        <table className="table-content-detail">
          <tbody>
            <tr>
              <th>Reason</th>
              <td>{detailOvertimeData.reason}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{detailOvertimeData.date}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Start Overtime</th>
              <td>{detailOvertimeData.start_overtime}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>End Overtime</th>
              <td>{detailOvertimeData.end_overtime}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{detailOvertimeData.duration}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>HR</th>
              <td>{detailOvertimeData.hr}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status by HR</th>
              <td>{detailOvertimeData.status_by_hr}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Team Leader</th>
              <td>{detailOvertimeData.team_leader}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status by Team Leader</th>
              <td>{detailOvertimeData.status_by_team_leader}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{detailOvertimeData.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <Button className="back-button-detail" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </>
  );
};

export default DetailOvertimeEmployee;