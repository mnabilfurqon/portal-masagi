import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import DetailCompanyTable from "@common/tables/detailCompanyTable/DetailCompanyTable";
import "./detailCompanyConfiguration.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { dummyCompanies } from "@common/dummy/DummyCompanies";

const DetailCompanyConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [detailCompanyData, setDetailCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSelectedCompanyData = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 400));

      const result = dummyCompanies.find((item) => item.uuid === uuid);

      if (result) {
        setDetailCompanyData(result);
      } else {
        console.log("Company not found");
      }
    } catch (error) {
      console.log("Dummy error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getSelectedCompanyData();
  }, [token, navigate]);

  const handleEditCompanyData = () => {
    navigate(`/company/edit-company/${uuid}`);
  };

  return (
    <Spin spinning={loading} size="large" tip="Get Selected Data...">
      <div className="container">
        <DetailCompanyTable detailCompanyData={detailCompanyData} />
        <Button
          type="primary"
          className="edit-data-button"
          onClick={handleEditCompanyData}
        >
          Edit Data
        </Button>
      </div>
    </Spin>
  );
};

export default DetailCompanyConfiguration;
