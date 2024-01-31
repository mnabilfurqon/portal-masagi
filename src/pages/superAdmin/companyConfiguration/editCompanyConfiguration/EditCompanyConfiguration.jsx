import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessAddDataModal from '@common/modals/successModal/SuccessAddDataModal';
import FailedAddDataModal from '@common/modals/failedModal/FailedAddDataModal';
import FormTemplate from '@common/forms/formTemplate/FormTemplate';
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { Spin } from 'antd';

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
            const response = await axios.get(`http://103.82.93.38/api/v1/company/${uuid}`, {
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
        values.date_founded = dayjs(values.date_founded).format("YYYY-MM-DD");
        try {
            setLoading(true);
            setTip("Save Data...");
            await axios.put(`http://103.82.93.38/api/v1/company/${uuid}`, values, {
                headers: {
                "Authorization": token,
                },
            });
            setIsSuccessModalVisible(true);
        } catch (error) {
            console.log(error);
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
        <Spin spinning={loading} size='large' tip={tip}>
            <FormTemplate
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            buttonText="Save Data"
            editCompanyData={editCompanyData}
            isSuperAdmin={true}/>

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
    )
}

export default EditCompanyConfiguration;