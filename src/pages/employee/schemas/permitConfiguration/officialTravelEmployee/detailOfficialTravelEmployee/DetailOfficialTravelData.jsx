import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button } from 'antd';
import DetailOfficialTravelTable from './DetailOfficialTravelTable';
import "./detailOfficialTravelEmployee.css";

const DetailOfficialTravelData = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [officialTravelData, setOfficialTravelData] = useState();
  const [loading, setLoading] = useState(false);

  const getOfficialTravelDetailData = async () => {
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
      setOfficialTravelData(response.data);
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
    getOfficialTravelDetailData();
  }, [token, navigate]);

  return (
    <>
      <DetailOfficialTravelTable data={officialTravelData} loading={loading} />
      <div className="button-container">
        <Button className="back-button-detail" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </>
  );
}

export default DetailOfficialTravelData;
