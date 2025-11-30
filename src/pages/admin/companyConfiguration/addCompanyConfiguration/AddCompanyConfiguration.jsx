import React, { useState, useEffect } from "react";
import SuccessAddDataModal from "@common/modals/successModal/SuccessAddDataModal";
import FailedAddDataModal from "@common/modals/failedModal/FailedAddDataModal";
import FormTemplate from "@common/forms/formTemplate/FormTemplate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { Spin } from "antd";
import { dummyCompanies } from "@common/dummy/DummyCompany";
import { v4 as uuidv4 } from "uuid";

const AddCompanyConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      values.date_founded = dayjs(values.date_founded, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

      await new Promise((resolve) => setTimeout(resolve, 500));

      const newCompany = {
        uuid: uuidv4(),
        company_name: values.company_name,
        address: values.address,
        phone_number: values.phone_number,
        date_founded: values.date_founded,
        email_address: values.email_address,
        website: values.website,
        contact_person: values.contact_person,
        contact_name: values.contact_name,
        is_active: true,
        created_date: dayjs().format("YYYY-MM-DD"),
        updated_date: dayjs().format("YYYY-MM-DD"),
      };

      dummyCompanies.push(newCompany);

      setIsSuccessModalVisible(true);
    } catch (error) {
      console.log("Dummy error:", error);
      setIsFailedModalVisible(true);
    } finally {
      setLoading(false);
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
      <Spin spinning={loading} size="large" tip="Add Data...">
        <FormTemplate
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          buttonText="Add Data"
          isSuperAdmin={true}
        />

        <SuccessAddDataModal
          visible={isSuccessModalVisible}
          onClose={handleSuccessModalClose}
          textParagraph="Data upload successful!"
        />

        <FailedAddDataModal
          visible={isFailedModalVisible}
          onClose={handleFailedModalClose}
        />
      </Spin>
    </>
  );
};

export default AddCompanyConfiguration;
