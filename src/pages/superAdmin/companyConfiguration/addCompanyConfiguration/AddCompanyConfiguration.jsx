import React, {useState, useEffect} from 'react';
import SuccessAddDataModal from '@common/successModal/SuccessAddDataModal';
import FailedAddDataModal from '@common/failedModal/FailedAddDataModal';
import FormTemplate from '@common/formTemplate/FormTemplate';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { Spin } from 'antd';

const AddCompanyConfiguration = () => {
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
            values.date_founded = dayjs(values.date_founded, "DD/MM/YYYY").format("YYYY-MM-DD");
            const response = await axios.post("https://attendance-1-r8738834.deta.app/api/v1/company/", values, {
                headers: {
                "Authorization": token,
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
        navigate("/company");
    };

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };

    return (
        <>
        <Spin spinning={loading} size='large' tip="Add Data...">
            <FormTemplate
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            buttonText="Add Data"
            isSuperAdmin={true}/>

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
    )
}

export default AddCompanyConfiguration;