import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button } from 'antd';
import DetailOvertimeTable from './DetailOvertimeTable';
import "./detailOvertimeEmployee.css"

const DetailOvertimeData = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [overtimeData, setOvertimeData] = useState();
  const [loading, setLoading] = useState(false);

  const getOvertimeData = async () => {
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
      setOvertimeData(response.data);
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
    getOvertimeData();
  }, [token, navigate]);

  return (
    <>
      <DetailOvertimeTable data={overtimeData} loading={loading} />
      <div className="button-container">
        <Button className="back-button-detail" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </>
  );
}

export default DetailOvertimeData;
