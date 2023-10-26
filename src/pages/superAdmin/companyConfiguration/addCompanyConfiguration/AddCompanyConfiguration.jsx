import React, {useState} from 'react';
import SuccessAddDataModal from '../../../../components/common/successModal/SuccessAddDataModal';
import FailedAddDataModal from '../../../../components/common/failedModal/FailedAddDataModal';
import FormTemplate from '../../../../components/common/formTemplate/FormTemplate';

const AddCompanyConfiguration = () => {

    // Modal Handler
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

    const onFinish = () => {
        setIsSuccessModalVisible(true);
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