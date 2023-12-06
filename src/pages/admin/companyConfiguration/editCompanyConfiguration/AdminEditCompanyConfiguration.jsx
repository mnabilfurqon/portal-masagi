import React, {useState, useEffect} from 'react';
import SuccessAddDataModal from '@common/successModal/SuccessAddDataModal';
import FailedAddDataModal from '@common/failedModal/FailedAddDataModal';
import FormTemplate from '@common/formTemplate/FormTemplate';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Spin } from 'antd';

const AdminEditCompanyConfiguration = () => {
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [editCompanyData, setEditCompanyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState("");

    const getSelectedCompanyData = async () => {
        try {
            setLoading(true);
            setTip("Get Company Data...");
            const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/company/${uuid}`, {
                headers: {
                  "Authorization": token,
                },
            });
            setEditCompanyData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setTip("");
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
            setLoading(true);
            setTip("Save Data...");
            values.date_founded = dayjs(values.date_founded, "DD/MM/YYYY").format("YYYY-MM-DD");
            const response = await axios.put(`https://attendance-1-r8738834.deta.app/api/v1/company/${uuid}`, values, {
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
        <Spin spinning={loading} size='large' tip={tip}>
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
        </Spin>
        </>
    )
}

export default AdminEditCompanyConfiguration;