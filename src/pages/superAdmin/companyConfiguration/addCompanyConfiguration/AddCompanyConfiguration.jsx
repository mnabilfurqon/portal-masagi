import React, {useState, useEffect} from 'react';
import SuccessAddDataModal from '../../../../components/common/successModal/SuccessAddDataModal';
import FailedAddDataModal from '../../../../components/common/failedModal/FailedAddDataModal';
import FormTemplate from '../../../../components/common/formTemplate/FormTemplate';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const AddCompanyConfiguration = () => {
    const token = Cookies.get("token");
    const navigate = useNavigate();

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
            values.date_founded = dayjs(values.date_founded, "DD/MM/YYYY").format("YYYY-MM-DD");
            const response = await axios.post("http://127.0.0.1:5000/api/v1/company/", values, {
                headers: {
                "Authorization": token,
                },
            });
            setIsSuccessModalVisible(true);
        } catch (error) {
            console.log(error);
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
        
        </>
    )
}

export default AddCompanyConfiguration;