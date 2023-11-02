import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessAddDataModal from '../../../../components/common/successModal/SuccessAddDataModal';
import FailedAddDataModal from '../../../../components/common/failedModal/FailedAddDataModal';
import FormTemplate from '../../../../components/common/formTemplate/FormTemplate';
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const EditCompanyConfiguration = () => {
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [editCompanyData, setEditCompanyData] = useState(null);

    const getSelectedCompanyData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/company/${uuid}`, {
                headers: {
                  "Authorization": token,
                },
            });
            setEditCompanyData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

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
        try {
            values.date_founded = dayjs(values.date_founded, "DD/MM/YYYY").format("YYYY-MM-DD");
            const response = await axios.put(`http://127.0.0.1:5000/api/v1/company/${uuid}`, values, {
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
    };

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };

    return (
        <>
        <FormTemplate
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        buttonText="Save Data"
        editCompanyData={editCompanyData}
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

export default EditCompanyConfiguration;