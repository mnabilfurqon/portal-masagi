import React, {useState, useEffect} from 'react';
import SuccessAddDataModal from '@common/modals/successModal/SuccessAddDataModal';
import FailedAddDataModal from '@common/modals/failedModal/FailedAddDataModal';
import TaskForm from '@common/forms/taskForm/TaskForm';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const TaskAdd = () => {
    const token = Cookies.get("token");
    const employeeUuid = Cookies.get("employee_uuid");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    // date format for backend API
    const dateFormatList = 'YYYY-MM-DDTHH:mm:ss';

    const addTask = async (values) => {
        if (values.assign_to === undefined) {
            values.assign_to = employeeUuid;
        }
        values.deadline = dayjs(values.deadline).format(dateFormatList);
        try {
            setLoading(true);
            await axios.post('http://103.82.93.38/api/v1/task/', {
                name: values.task,
                project_uuid: values.project_name,
                asign_to_employee_uuid: values.assign_to,
                deadline: values.deadline,
                description: values.description,
            }, {
                headers: {
                    'Authorization': token,
                }
            });
            setIsSuccessModalVisible(true);
        } catch (error) {
            setIsFailedModalVisible(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!token) {
          navigate("/login");
        } 
    }, [token, navigate]);

    const onFinish = async (values) => {
        addTask(values);
    };

    const onFinishFailed = () => {
        setIsFailedModalVisible(true);
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
        navigate("/task");
    };

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };

    return (
        <>
        <Spin spinning={loading} size='large' tip="Add Data...">
            <TaskForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            buttonText="Add"/>

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

export default TaskAdd;