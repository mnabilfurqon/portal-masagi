import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Flex } from 'antd'
import PermitRequestDetailTable from '@common/tables/permitRequestDetailTable/PermitRequestDetailTable'
import DialogModal from '@common/modals/dialogModal/DialogModal'
import RespondLeftModal from '@common/modals/respondLeftModal/RespondLeftModal'

const LeaveDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state || {};
    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [respondApproveModalVisible, setRespondApproveModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [respondRejectModalVisible, setRespondRejectModalVisible] = useState(false);

    const handleApproveModalOpen = () => {
        setApproveModalVisible(true)
    };
    
    const handleApproveModalNo = () => {
        setApproveModalVisible(false);
    };
    
    const handleApproveModalYes = () => {
        setApproveModalVisible(false);
        setRespondApproveModalVisible(true);
    };
    
    const handleRespondApproveModal = () => {
        setRespondApproveModalVisible(false);
        navigate('/leave-request');
    };
    
    const handleRejectModalOpen = () => {
        setRejectModalVisible(true);
    };
    
    const handleRejectModalYes = () => {
        setRejectModalVisible(false);
        setRespondRejectModalVisible(true);
    };
    
    const handleRejectModalNo = () => {
        setRejectModalVisible(false);
    };
    
    const handleRespondRejectModal = () => {
        setRespondRejectModalVisible(false);
        navigate('/leave-request');
    };
    
    const propsApproveDialogModal = {
        visible: approveModalVisible,
        handleYes: handleApproveModalYes,
        handleNo: handleApproveModalNo,
        textNoOption: "CANCEL",
        textYesOption: "APPROVE",
        dialogTitle: "Attention",
        dialogText: "Are you sure approve this Leave request?",
    };
    
    const propsApproveRespondModal = {
        visible: respondApproveModalVisible,
        handleOk: handleRespondApproveModal,
        textButton: "OK",
        dialogTitle: "Approved",
        dialogText: "Leave request is approved!",
    };
    
    const propsRejectDialogModal = {
        visible: rejectModalVisible,
        handleYes: handleRejectModalYes,
        handleNo: handleRejectModalNo,
        textNoOption: "CANCEL",
        textYesOption: "REJECT",
        dialogTitle: "Attention",
        dialogText: "Are you sure reject this Leave request?",
    };
    
    const propsRejectRespondModal = {
        visible: respondRejectModalVisible,
        handleOk: handleRespondRejectModal,
        textButton: "OK",
        dialogTitle: "Rejected",
        dialogText: "Leave request is rejected!",
    };

  return (
    <>
        <PermitRequestDetailTable data={data} />
        <Flex justify='flex-end' gap={20} >
        <Button type="primary" className='approve-permit-button' onClick={handleApproveModalOpen}>
            Approve
        </Button>
        <Button type="primary" className='reject-permit-button' onClick={handleRejectModalOpen}>
            Reject
        </Button>
        </Flex>

        <DialogModal {...propsApproveDialogModal} />
        <RespondLeftModal {...propsApproveRespondModal} />
        <DialogModal {...propsRejectDialogModal} />
        <RespondLeftModal {...propsRejectRespondModal} />
    </>
  )
}

export default LeaveDetail