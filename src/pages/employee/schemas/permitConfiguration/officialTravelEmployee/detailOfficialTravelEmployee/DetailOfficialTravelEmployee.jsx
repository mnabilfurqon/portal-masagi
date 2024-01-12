import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./detailOfficialTravelEmployee.css";

const DetailOfficialTravelEmployee = ({detailOfficialTravelData}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="table-container-detail">
        <table className="table-content-detail">
          <tbody>
            <tr>
              <th>Agenda</th>
              <td>{detailOfficialTravelData.agenda}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Destination</th>
              <td>{detailOfficialTravelData.destination}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Permit Date</th>
              <td>{detailOfficialTravelData.permit_date}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>End Permit Date</th>
              <td>{detailOfficialTravelData.end_permit_date}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>HR</th>
              <td>{detailOfficialTravelData.hr}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status by HR</th>
              <td>{detailOfficialTravelData.status_by_hr}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Team Leader</th>
              <td>{detailOfficialTravelData.team_leader}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status by Team Leader</th>
              <td>{detailOfficialTravelData.status_by_team_leader}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{detailOfficialTravelData.status}</td>
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

export default DetailOfficialTravelEmployee;