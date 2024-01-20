import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button } from 'antd';
import DetailPermitTable from './DetailPermitTable';
import "./detailPermitEmployee.css"

const DetailPermitData = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [permitData, setPermitData] = useState();
  const [loading, setLoading] = useState(false);

  const getPermitData = async () => {
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
      setPermitData(response.data);
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
    getPermitData();
  }, [token, navigate]);

  return (
    <>
      <DetailPermitTable data={permitData} loading={loading} />
      <div className="button-container">
        <Button className="back-button-detail" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </>
  );
}

export default DetailPermitData;
