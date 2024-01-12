import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "antd";
import "./detailLeaveEmployee.css";
import DetailLeaveEmployee from "./DetailLeaveEmployee";

const DetailLeaveData = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [leaveData, setLeaveData] = useState();
  const [loading, setLoading] = useState(false);

  const getLeaveDetailData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://103.82.93.38/api/v1/permit/${uuid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLeaveData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getLeaveDetailData();
  }, [token, navigate]);

  return (
    <>
      <DetailLeaveEmployee data={leaveData} loading={loading} />
      <div className="button-container">
        <Button className="back-button-detail" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </>
  );
};

export default DetailLeaveData;
