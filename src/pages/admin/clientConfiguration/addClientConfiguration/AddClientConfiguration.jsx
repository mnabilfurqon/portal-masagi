import React, { useState, useEffect } from "react";
import SuccessAddDataModal from "@common/modals/successModal/SuccessAddDataModal";
import FailedAddDataModal from "@common/modals/failedModal/FailedAddDataModal";
import ClientForm from "@common/forms/clientForm/ClientForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Spin } from "antd";
import axios from "axios";

const AddClientConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Modal Handler
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://103.82.93.38/api/v1/client/", values, {
        headers: {
          Authorization: token,
        },
      });
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    setIsFailedModalVisible(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    navigate("/client");
  };

  const handleFailedModalClose = () => {
    setIsFailedModalVisible(false);
  };

  return (
    <>
      <Spin spinning={loading} size="large" tip="Add Data...">
        <ClientForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          buttonText="Add Data"
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

export default AddClientConfiguration;
