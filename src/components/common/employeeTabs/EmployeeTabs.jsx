import React, {useState} from 'react';
import { Tabs, Button } from 'antd';
import { Link } from 'react-router-dom';
import AddButton from '../addButton/AddButton';
import './employeeTabs.css';
import EducationTable from '../educationTable/EducationTable';
import DetailEducationTable from '../detailEducationTable/DetailEducationTable';
import EducationForm from '../educationForm/EducationForm';
import SuccessAddDataModal from '../successModal/SuccessAddDataModal';
import FailedAddDataModal from '../failedModal/FailedAddDataModal';

const { TabPane } = Tabs;

const EmployeeTabs = () => {

    // handler education data tabs
    const [activeEducationTab, setActiveEducationTab] = useState('education-data');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

    const handleAddButtonClick = () => {
        setActiveEducationTab('education-add-form');
    }

    const handleDetailButtonClick = () => {
        setActiveEducationTab('education-detail');
    }

    const handleBackButtonClick = () => {
        setActiveEducationTab('education-data');
    }

    const handleEditButtonClick = () => {
        setActiveEducationTab('education-edit-form');
    }

    const handleCancleAddFormButtonClick = () => {
        setActiveEducationTab('education-data');
    }

    const handleCancleEditFormButtonClick = () => {
        setActiveEducationTab('education-detail');
    }

    const handleSuccessAddForm = () => {
        setIsSuccessModalVisible(true);
    }

    const handleFailedAddForm = () => {
        setIsFailedModalVisible(true);
    }

    const handleSuccessEditForm = () => {
        setIsSuccessModalVisible(true);
    }

    const handleFailedEditForm = () => {
        setIsFailedModalVisible(true);
    }

    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    const handleFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };
    // end of handler education data tabs
    
    const onChange = (key) => {
        console.log(key);
    };

    return (
        <Tabs defaultActiveKey="employeeData" onChange={onChange}>
            <TabPane tab="Employee Data" key="employeeData">
                Content of Tab Employee Data
            </TabPane>
            <TabPane tab="Education Data" key="educationData">
                <div>
                    {activeEducationTab === 'education-data' && (
                        <div className='education-data'>
                            <div className='right-buttons-education'>
                                <AddButton buttonText="Add Education" handleClick={handleAddButtonClick}/>
                            </div>
                            <EducationTable onDetailClick={handleDetailButtonClick}/>
                        </div>       
                    )}
                    
                    {activeEducationTab === 'education-detail' && (
                        <div className='education-detail'>
                            <DetailEducationTable />
                            <div className='education-detail-button'>
                                <Button type="text" onClick={handleBackButtonClick}>
                                Back
                                </Button>
                                <Button type="primary" className='edit-education-button' onClick={handleEditButtonClick}>
                                Edit Data
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeEducationTab === 'education-add-form' && (
                        <div className='education-add-form'>
                            <EducationForm
                            onCancleEditFormButton={handleCancleAddFormButtonClick}
                            onFinish={handleSuccessAddForm}
                            onFinishFailed={handleFailedAddForm}/>

                            <SuccessAddDataModal
                            visible={isSuccessModalVisible}
                            onClose={handleSuccessModalClose}
                            textParagraph="Data upload successful!"
                            />

                            <FailedAddDataModal
                            visible={isFailedModalVisible}
                            onClose={handleFailedModalClose}
                            />
                        </div>
                    )} 
                    
                    {activeEducationTab === 'education-edit-form' && (
                        <div className='education-edit-form'>
                            <EducationForm
                            onCancleEditFormButton={handleCancleEditFormButtonClick}
                            onFinish={handleSuccessEditForm}
                            onFinishFailed={handleFailedEditForm}/>

                            <SuccessAddDataModal
                            visible={isSuccessModalVisible}
                            onClose={handleSuccessModalClose}
                            textParagraph="Data upload successful!"
                            />

                            <FailedAddDataModal
                            visible={isFailedModalVisible}
                            onClose={handleFailedModalClose}
                            />
                        </div>
                    )}    
                </div>
            </TabPane>
            <TabPane tab="Family Data" key="familyData">
                Content of Tab Family Data
            </TabPane>
        </Tabs>
    );
};

export default EmployeeTabs;