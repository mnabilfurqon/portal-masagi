import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DetailClientTable from "@common/tables/detailClientTable/DetailClientTable";
import axios from "axios";

const DetailClientConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [detailClientData, setDetailClientData] = useState();
  const [loading, setLoading] = useState(false);

  const getDetailClientData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://103.82.93.38/api/v1/client/${uuid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setDetailClientData(response.data);
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
    getDetailClientData();
  }, [token, navigate]);

  // handle edit company data bring uuid to edit company page
  const handleEditClientData = () => {
    navigate(`/client/edit-client/${uuid}`);
  };

  return (
    <Spin spinning={loading} size="large" tip="Get Selected Data...">
      <div className="container">
        <DetailClientTable detailClientData={detailClientData} />
        <Button
          type="primary"
          className="edit-data-button"
          onClick={handleEditClientData}
        >
          Edit Data
        </Button>
      </div>
    </Spin>
  );
};

export default DetailClientConfiguration;
