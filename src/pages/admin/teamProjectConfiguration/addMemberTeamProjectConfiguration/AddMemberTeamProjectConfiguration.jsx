import React, {useState, useEffect} from 'react';
import SuccessAddDataModal from '@common/modals/successModal/SuccessAddDataModal';
import FailedAddDataModal from '@common/modals/failedModal/FailedAddDataModal';
import TeamMemberForm from '@common/forms/teamMemberForm/TeamMemberForm';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Spin } from 'antd';

const AddMemberTeamProjectConfiguration = () => {
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
        navigate("/team-project");
    };

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };

    return (
        <>
        <Spin spinning={loading} size='large' tip="Add Data...">
            <TeamMemberForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            buttonText="Save"/>

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

export default AddMemberTeamProjectConfiguration;