import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./detailOvertimeEmployee.css"

const DetailOvertimeEmployee = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="table-container-detail">
        <table className="table-content-detail">
          <tbody>
            <tr>
              <th>Reason</th>
              <td>Menyelesaikan Projek</td>
              {/* <td>{detailCompanyData.company_name}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Date</th>
              <td>01/10/2023</td>
              {/* <td>{detailCompanyData.address}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Start Overtime</th>
              <td>05:00 PM</td>
              {/* <td>{detailCompanyData.phone_number}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>End Overtime</th>
              <td>06:00 PM</td>
              {/* <td>{detailCompanyData.date_founded}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>01:00:00</td>
              {/* <td>{detailCompanyData.email_address}</td> */}
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>HR</th>
              <td>Megawati</td>
              {/* <td>{detailCompanyData.website}</td> */}
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
              <td>Approved</td>
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

export default DetailOvertimeEmployee;