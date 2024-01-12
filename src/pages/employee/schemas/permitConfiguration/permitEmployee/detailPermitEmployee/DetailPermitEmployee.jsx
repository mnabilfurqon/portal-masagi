import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./detailPermitEmployee.css"

const DetailPermitEmployee = ({detailPermitData}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="table-container-detail">
        <table className="table-content-detail">
          <tbody>
            <tr>
              <th>Type Permit</th>
              <td>{detailPermitData.type_permit}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Reason</th>
              <td>{detailPermitData.reason}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Permit Date</th>
              <td>{detailPermitData.permit_date}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>End Permit Date</th>
              <td>{detailPermitData.end_permit_date}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>HR</th>
              <td>{detailPermitData.hr}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status by HR</th>
              <td>{detailPermitData.status_by_hr}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Team Leader</th>
              <td>{detailPermitData.team_leader}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status by Team Leader</th>
              <td>{detailPermitData.status_by_team_leader}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{detailPermitData.status}</td>
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

export default DetailPermitEmployee;