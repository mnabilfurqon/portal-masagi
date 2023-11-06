import React, {useState, useEffect} from 'react';
import SuccessAddDataModal from '../../../../components/common/successModal/SuccessAddDataModal';
import FailedAddDataModal from '../../../../components/common/failedModal/FailedAddDataModal';
import FormTemplate from '../../../../components/common/formTemplate/FormTemplate';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const AdminEditCompanyConfiguration = () => {
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
        if (values.is_active === 'Active') {
            values.is_active = true;
        } else {
            values.is_active = false;
        }
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
        buttonText="Save"
        editCompanyData={editCompanyData}
        isSuperAdmin={false}/>

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

export default AdminEditCompanyConfiguration;