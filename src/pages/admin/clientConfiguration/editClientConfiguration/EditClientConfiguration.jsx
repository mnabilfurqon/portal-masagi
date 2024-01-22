import React, {useState, useEffect} from 'react';
import SuccessAddDataModal from '@common/modals/successModal/SuccessAddDataModal';
import FailedAddDataModal from '@common/modals/failedModal/FailedAddDataModal';
import ClientForm from '@common/forms/clientForm/ClientForm';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Spin } from 'antd';

const EditClientConfiguration = () => {
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
        console.log(values);
        setIsSuccessModalVisible(true);
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

    //edit client data dummy
    const editClientData = {
        client_name: 'PT ABC',
        contact_person: '08128768612',
        contact_person_name: 'Samuel Eto\'o',
        email: 'abc@gmail.com',
        phone_number: '081234567890',
        address: 'Jl. ABC',
    }

    return (
        <>
        <Spin spinning={loading} size='large' tip="Add Data...">
            <ClientForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            editClientData={editClientData}
            buttonText="Edit Data"/>

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

export default EditClientConfiguration;