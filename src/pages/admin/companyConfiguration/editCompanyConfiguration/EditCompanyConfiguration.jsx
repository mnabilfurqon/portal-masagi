import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuccessAddDataModal from "@common/modals/successModal/SuccessAddDataModal";
import FailedAddDataModal from "@common/modals/failedModal/FailedAddDataModal";
import FormTemplate from "@common/forms/formTemplate/FormTemplate";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { Spin } from "antd";
import { dummyCompanies } from "@common/dummy/DummyCompany";

const EditCompanyConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [editCompanyData, setEditCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tip, setTip] = useState("");

  const getSelectedCompanyData = async () => {
    try {
      setLoading(true);
      setTip("Get Selected Data...");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      // find company from dummy
      const result = dummyCompanies.find((item) => item.uuid === uuid);

      if (result) {
        setEditCompanyData(result);
      } else {
        console.log("Company not found in dummy data");
      }
    } catch (error) {
      console.log("Dummy error:", error);
    } finally {
      setLoading(false);
      setTip("");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getSelectedCompanyData();
  }, [token, navigate]);

  // Modal Handler
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

  const onFinish = async (values) => {
    values.date_founded = dayjs(values.date_founded).format("YYYY-MM-DD");

    try {
      setLoading(true);
      setTip("Save Data...");

      // simulate update delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // update dummy data (in-memory)
      const index = dummyCompanies.findIndex((item) => item.uuid === uuid);
      if (index !== -1) {
        dummyCompanies[index] = {
          ...dummyCompanies[index],
          ...values,
          updated_date: dayjs().format("YYYY-MM-DD"),
        };
      }

      setIsSuccessModalVisible(true);
    } catch (error) {
      console.log("Dummy error:", error);
      setIsFailedModalVisible(true);
    } finally {
      setLoading(false);
      setTip("");
    }
  };

  const onFinishFailed = () => {
    setIsFailedModalVisible(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    navigate("/company");
  };

  const handleFailedModalClose = () => {
    setIsFailedModalVisible(false);
  };

  return (
    <>
      <Spin spinning={loading} size="large" tip={tip}>
        <FormTemplate
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          buttonText="Save Data"
          editCompanyData={editCompanyData}
          isSuperAdmin={true}
        />

        <SuccessAddDataModal
          visible={isSuccessModalVisible}
          onClose={handleSuccessModalClose}
          textParagraph="Data change successful!"
        />

        <FailedAddDataModal
          visible={isFailedModalVisible}
          onClose={handleFailedModalClose}
        />
      </Spin>
    </>
  );
};

export default EditCompanyConfiguration;
