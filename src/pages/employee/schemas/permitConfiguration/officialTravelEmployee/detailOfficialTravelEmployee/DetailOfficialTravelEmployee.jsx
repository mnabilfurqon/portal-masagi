import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./detailOfficialTravelEmployee.css";

const DetailOfficialTravelEmployee = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="table-container-detail">
        <table className="table-content-detail">
          <tbody>
            <tr>
              <th>Agenda</th>
              <td>Perjalanan Dinas Dalam Kota</td>
              {/* <td>{detailCompanyData.company_name}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Destination</th>
              <td>Bandung Jawa Barat Indonesia</td>
              {/* <td>{detailCompanyData.address}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Permit Date</th>
              <td>31/10/2023</td>
              {/* <td>{detailCompanyData.phone_number}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>End Permit Date</th>
              <td>03/11/2023</td>
              {/* <td>{detailCompanyData.date_founded}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>HR</th>
              <td>Megawati</td>
              {/* <td>{detailCompanyData.email_address}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Team Leader</th>
              <td>Joanna</td>
              {/* <td>{detailCompanyData.website}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Status</th>
              <td>Pending</td>
              {/* <td>{detailCompanyData.is_active ? 'Active' : 'Not Active'}</td> */}
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
