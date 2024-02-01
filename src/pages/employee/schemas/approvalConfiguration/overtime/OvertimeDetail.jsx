import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Flex, Spin } from 'antd'
import Cookies from 'js-cookie'
import axios from 'axios'
import PermitRequestDetailTable from '@common/tables/permitRequestDetailTable/PermitRequestDetailTable'
import DialogModal from '@common/modals/dialogModal/DialogModal'
import RespondLeftModal from '@common/modals/respondLeftModal/RespondLeftModal'
import FailedAddDataModal from '@common/modals/failedModal/FailedAddDataModal'

const OvertimeDetail = () => {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const token = Cookies.get('token');
    const employeeUuid = Cookies.get('employee_uuid');
    const [overtimeData, setOvertimeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [respondApproveModalVisible, setRespondApproveModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [respondRejectModalVisible, setRespondRejectModalVisible] = useState(false);
    const [failedAddDataModalVisible, setFailedAddDataModalVisible] = useState(false);
    let notRejectedByMe = false;

    const getOvertimeDetailData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://103.82.93.38/api/v1/permit/${uuid}`, {
              headers: {
                "Authorization": token,
              },
            });
            setOvertimeData(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
        getOvertimeDetailData();
    }, [token, navigate]);

    const handleApproveModalOpen = () => {
        setApproveModalVisible(true)
    };

    const approveOvertimeRequest = async () => {
        try {
            setLoading(true);
            await axios.post(`http://103.82.93.38/api/v1/permit/approve_permit`, 
            { permit_uuid: uuid },
            {
                headers: {
                    "Authorization": token,
                },
            });
            setApproveModalVisible(false);
            setRespondApproveModalVisible(true);
        } catch (error) {
            console.log(error);
            setApproveModalVisible(false);
            setFailedAddDataModalVisible(true);
        } finally {
            setLoading(false);
        }
    };
    
    const handleApproveModalNo = () => {
        setApproveModalVisible(false);
    };
    
    const handleApproveModalYes = () => {
        approveOvertimeRequest();
    };
    
    const handleRespondApproveModal = () => {
        setRespondApproveModalVisible(false);
        navigate('/overtime-request');
    };
    
    const handleRejectModalOpen = () => {
        setRejectModalVisible(true);
    };

    const rejectLeaveRequest = async () => {
        try {
            setLoading(true);
            await axios.post(`http://103.82.93.38/api/v1/permit/reject_permit`, 
            { permit_uuid: uuid },
            {
                headers: {
                    "Authorization": token,
                },
            });
            setRejectModalVisible(false);
            setRespondRejectModalVisible(true);
        } catch (error) {
            console.log(error);
            setRejectModalVisible(false);
            setFailedAddDataModalVisible(true);
        } finally {
            setLoading(false);
        }
    };
    
    const handleRejectModalYes = () => {
        rejectLeaveRequest();
    };
    
    const handleRejectModalNo = () => {
        setRejectModalVisible(false);
    };
    
    const handleRespondRejectModal = () => {
        setRespondRejectModalVisible(false);
        navigate('/overtime-request');
    };

    const handleFailedAddDataModal = () => {
        setFailedAddDataModalVisible(false);
    };
    
    const propsApproveDialogModal = {
        visible: approveModalVisible,
        handleYes: handleApproveModalYes,
        handleNo: handleApproveModalNo,
        textNoOption: "CANCEL",
        textYesOption: "APPROVE",
        dialogTitle: "Attention",
        dialogText: "Are you sure approve this Overtime request?",
    };
    
    const propsApproveRespondModal = {
        visible: respondApproveModalVisible,
        handleOk: handleRespondApproveModal,
        textButton: "OK",
        dialogTitle: "Approved",
        dialogText: "Overtime request is approved!",
    };
    
    const propsRejectDialogModal = {
        visible: rejectModalVisible,
        handleYes: handleRejectModalYes,
        handleNo: handleRejectModalNo,
        textNoOption: "CANCEL",
        textYesOption: "REJECT",
        dialogTitle: "Attention",
        dialogText: "Are you sure reject this Overtime request?",
    };
    
    const propsRejectRespondModal = {
        visible: respondRejectModalVisible,
        handleOk: handleRespondRejectModal,
        textButton: "OK",
        dialogTitle: "Rejected",
        dialogText: "Overtime request is rejected!",
    };

    const propsFailedAddDataModal = {
        visible: failedAddDataModalVisible,
        onClose: handleFailedAddDataModal,
    };

    if (overtimeData && overtimeData.reject_by !== null) {
        if (overtimeData.reject_by.uuid !== employeeUuid) {
            notRejectedByMe = true;
        }
    }

  return (
    <Spin spinning={loading} size='large' tip="Get Selected Data...">
        <PermitRequestDetailTable data={overtimeData} />
        <Flex justify='flex-end' gap={20} >

        {/* for HR */}
        {overtimeData && overtimeData.hr_employee && overtimeData.hr_employee.uuid === employeeUuid && overtimeData.approved_by_hr === false && overtimeData && overtimeData.reject_by === null && (
            <Button type="primary" className='approve-permit-button' onClick={handleApproveModalOpen}>
                Approve
            </Button>
        )}
        
        {overtimeData && overtimeData.hr_employee && overtimeData.hr_employee.uuid === employeeUuid && overtimeData.approved_by_hr === false && overtimeData && overtimeData.reject_by === null && (
            <Button type="primary" className='reject-permit-button' onClick={handleRejectModalOpen}>
                Reject
            </Button>
        )}

        {overtimeData && overtimeData.hr_employee && overtimeData.hr_employee.uuid === employeeUuid && overtimeData.approved_by_hr === "Pending" && overtimeData && overtimeData.reject_by === null && (
            <Button type="primary" className='approve-permit-button' onClick={handleApproveModalOpen}>
                Approve
            </Button>
        )}

        {overtimeData && overtimeData.hr_employee && overtimeData.hr_employee.uuid === employeeUuid && overtimeData.approved_by_hr === "Pending" && overtimeData && overtimeData.reject_by === null && (
            <Button type="primary" className='reject-permit-button' onClick={handleRejectModalOpen}>
                Reject
            </Button>
        )}

        {overtimeData && overtimeData.hr_employee && overtimeData.hr_employee.uuid === employeeUuid && overtimeData.approved_by_hr === false && overtimeData && overtimeData.reject_by !== null && notRejectedByMe && (
            <Button type="primary" className='approve-permit-button' onClick={handleApproveModalOpen}>
                Approve
            </Button>
        )}

        {overtimeData && overtimeData.hr_employee && overtimeData.hr_employee.uuid === employeeUuid && overtimeData.approved_by_hr === false && overtimeData && overtimeData.reject_by !== null && notRejectedByMe && (
            <Button type="primary" className='reject-permit-button' onClick={handleRejectModalOpen}>
                Reject
            </Button>
        )}

        {/* for Team Leader */}
        {overtimeData && overtimeData.team_lead_employee && overtimeData.team_lead_employee.uuid === employeeUuid && overtimeData.approved_by_team_lead === false && overtimeData && overtimeData.reject_by === null && (
            <Button type="primary" className='approve-permit-button' onClick={handleApproveModalOpen}>
                Approve
            </Button>
        )}

        {overtimeData && overtimeData.team_lead_employee && overtimeData.team_lead_employee.uuid === employeeUuid && overtimeData.approved_by_team_lead === false && overtimeData && overtimeData.reject_by === null && (
            <Button type="primary" className='reject-permit-button' onClick={handleRejectModalOpen}>
                Reject
            </Button>
        )}

        {overtimeData && overtimeData.team_lead_employee && overtimeData.team_lead_employee.uuid === employeeUuid && overtimeData.approved_by_team_lead === "Pending" && overtimeData && overtimeData.reject_by === null && (
            <Button type="primary" className='approve-permit-button' onClick={handleApproveModalOpen}>
                Approve
            </Button>
        )}

        {overtimeData && overtimeData.team_lead_employee && overtimeData.team_lead_employee.uuid === employeeUuid && overtimeData.approved_by_team_lead === "Pending" && overtimeData && overtimeData.reject_by === null && (
            <Button type="primary" className='reject-permit-button' onClick={handleRejectModalOpen}>
                Reject
            </Button>
        )}

        {overtimeData && overtimeData.team_lead_employee && overtimeData.team_lead_employee.uuid === employeeUuid && overtimeData.approved_by_team_lead === false && overtimeData && overtimeData.reject_by !== null && notRejectedByMe && (
            <Button type="primary" className='approve-permit-button' onClick={handleApproveModalOpen}>
                Approve
            </Button>
        )}

        {overtimeData && overtimeData.team_lead_employee && overtimeData.team_lead_employee.uuid === employeeUuid && overtimeData.approved_by_team_lead === false && overtimeData && overtimeData.reject_by !== null && notRejectedByMe && (
            <Button type="primary" className='reject-permit-button' onClick={handleRejectModalOpen}>
                Reject
            </Button>
        )}

        </Flex>

        <DialogModal {...propsApproveDialogModal} />
        <RespondLeftModal {...propsApproveRespondModal} />
        <DialogModal {...propsRejectDialogModal} />
        <RespondLeftModal {...propsRejectRespondModal} />
        <FailedAddDataModal {...propsFailedAddDataModal} />
    </Spin>
  )
}

export default OvertimeDetail