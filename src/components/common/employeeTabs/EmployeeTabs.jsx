import React, {useState} from 'react';
import { Tabs, Button, Form, Input, DatePicker, Radio } from 'antd';
import { Link } from 'react-router-dom';
import AddButton from '../addButton/AddButton';
import './employeeTabs.css';
import EducationTable from '../educationTable/EducationTable';
import DetailEducationTable from '../detailEducationTable/DetailEducationTable';
import EducationForm from '../educationForm/EducationForm';
import SuccessAddDataModal from '../successModal/SuccessAddDataModal';
import FailedAddDataModal from '../failedModal/FailedAddDataModal';
import EmployeeEditForm from '../employeeEditForm/EmployeeEditForm';
import FamilyTable from '../familyTable/FamilyTable';
import DetailFamilyTable from '../detailFamilyTable/DetailFamilyTable';
import FamilyForm from '../familyForm/FamilyForm';

const { TabPane } = Tabs;

const EmployeeTabs = () => {

    // handler education data tabs
    const [activeEducationTab, setActiveEducationTab] = useState('education-data');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

    const handleEducationAddButtonClick = () => {
        setActiveEducationTab('education-add-form');
    }

    const handleEducationDetailButtonClick = () => {
        setActiveEducationTab('education-detail');
    }

    const handleEducationBackButtonClick = () => {
        setActiveEducationTab('education-data');
    }

    const handleEducationEditButtonClick = () => {
        setActiveEducationTab('education-edit-form');
    }

    const handleEducationCancleAddFormButtonClick = () => {
        setActiveEducationTab('education-data');
    }

    const handleEducationCancleEditFormButtonClick = () => {
        setActiveEducationTab('education-detail');
    }

    const handleEducationSuccessAddForm = () => {
        setIsSuccessModalVisible(true);
    }

    const handleEducationFailedAddForm = () => {
        setIsFailedModalVisible(true);
    }

    const handleEducationSuccessEditForm = () => {
        setIsSuccessModalVisible(true);
    }

    const handleEducationFailedEditForm = () => {
        setIsFailedModalVisible(true);
    }

    const handleEducationSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    const handleEducationFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };
    // end of handler education data tabs

    // handler family data tabs
    const [activeFamilyTab, setActiveFamilyTab] = useState('family-data');

    const handleFamilyAddButtonClick = () => {
        setActiveFamilyTab('family-add-form');
    }

    const handleFamilyDetailButtonClick = () => {
        setActiveFamilyTab('family-detail');
    }

    const handleFamilyBackButtonClick = () => {
        setActiveFamilyTab('family-data');
    }

    const handleFamilyEditButtonClick = () => {
        setActiveFamilyTab('family-edit-form');
    }

    const handleFamilyCancleAddFormButtonClick = () => {
        setActiveFamilyTab('family-data');
    }

    const handleFamilyCancleEditFormButtonClick = () => {
        setActiveFamilyTab('family-detail');
    }

    const handleFamilySuccessAddForm = () => {
        setIsSuccessModalVisible(true);
    }

    const handleFamilyFailedAddForm = () => {
        setIsFailedModalVisible(true);
    }

    const handleFamilySuccessEditForm = () => {
        setIsSuccessModalVisible(true);
    }

    const handleFamilyFailedEditForm = () => {
        setIsFailedModalVisible(true);
    }

    const handleFamilySuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    const handleFamilyFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };
    // end of handler family data tabs
    
    const onChange = (key) => {
        console.log(key);
    };

    return (
        <Tabs defaultActiveKey="employeeData" onChange={onChange}>
            <TabPane tab="Employee Data" key="employeeData"> <br />
                <EmployeeEditForm />
            </TabPane>
            <TabPane tab="Education Data" key="educationData">
                <div>
                    {activeEducationTab === 'education-data' && (
                        <div className='education-data'>
                            <div className='right-buttons-education'>
                                <AddButton buttonText="Add Education" handleClick={handleEducationAddButtonClick}/>
                            </div>
                            <EducationTable onDetailClick={handleEducationDetailButtonClick}/>
                        </div>       
                    )}
                    
                    {activeEducationTab === 'education-detail' && (
                        <div className='education-detail'>
                            <DetailEducationTable />
                            <div className='education-detail-button'>
                                <Button type="text" onClick={handleEducationBackButtonClick}>
                                Back
                                </Button>
                                <Button type="primary" className='edit-education-button' onClick={handleEducationEditButtonClick}>
                                Edit Data
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeEducationTab === 'education-add-form' && (
                        <div className='education-add-form'>
                            <EducationForm
                            onCancleEditFormButton={handleEducationCancleAddFormButtonClick}
                            onFinish={handleEducationSuccessAddForm}
                            onFinishFailed={handleEducationFailedAddForm}/>

                            <SuccessAddDataModal
                            visible={isSuccessModalVisible}
                            onClose={handleEducationSuccessModalClose}
                            textParagraph="Data upload successful!"
                            />

                            <FailedAddDataModal
                            visible={isFailedModalVisible}
                            onClose={handleEducationFailedModalClose}
                            />
                        </div>
                    )} 
                    
                    {activeEducationTab === 'education-edit-form' && (
                        <div className='education-edit-form'>
                            <EducationForm
                            onCancleEditFormButton={handleEducationCancleEditFormButtonClick}
                            onFinish={handleEducationSuccessEditForm}
                            onFinishFailed={handleEducationFailedEditForm}/>

                            <SuccessAddDataModal
                            visible={isSuccessModalVisible}
                            onClose={handleEducationSuccessModalClose}
                            textParagraph="Data upload successful!"
                            />

                            <FailedAddDataModal
                            visible={isFailedModalVisible}
                            onClose={handleEducationFailedModalClose}
                            />
                        </div>
                    )}    
                </div>
            </TabPane>
            <TabPane tab="Family Data" key="familyData">
            <div>
                    {activeFamilyTab === 'family-data' && (
                        <div className='family-data'>
                            <div className='right-buttons-family'>
                                <AddButton buttonText="Add Family" handleClick={handleFamilyAddButtonClick}/>
                            </div>
                            <FamilyTable onDetailClick={handleFamilyDetailButtonClick}/>
                        </div>       
                    )}
                    
                    {activeFamilyTab === 'family-detail' && (
                        <div className='family-detail'>
                            <DetailFamilyTable />
                            <div className='family-detail-button'>
                                <Button type="text" onClick={handleFamilyBackButtonClick}>
                                Back
                                </Button>
                                <Button type="primary" className='edit-family-button' onClick={handleFamilyEditButtonClick}>
                                Edit Data
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeFamilyTab === 'family-add-form' && (
                        <div className='family-add-form'>
                            <FamilyForm
                            onCancleEditFormButton={handleFamilyCancleAddFormButtonClick}
                            onFinish={handleFamilySuccessAddForm}
                            onFinishFailed={handleFamilyFailedAddForm}/>

                            <SuccessAddDataModal
                            visible={isSuccessModalVisible}
                            onClose={handleFamilySuccessModalClose}
                            textParagraph="Data upload successful!"
                            />

                            <FailedAddDataModal
                            visible={isFailedModalVisible}
                            onClose={handleFamilyFailedModalClose}
                            />
                        </div>
                    )} 
                    
                    {activeFamilyTab === 'family-edit-form' && (
                        <div className='family-edit-form'>
                            <FamilyForm
                            onCancleEditFormButton={handleFamilyCancleEditFormButtonClick}
                            onFinish={handleFamilySuccessEditForm}
                            onFinishFailed={handleFamilyFailedEditForm}/>

                            <SuccessAddDataModal
                            visible={isSuccessModalVisible}
                            onClose={handleFamilySuccessModalClose}
                            textParagraph="Data upload successful!"
                            />

                            <FailedAddDataModal
                            visible={isFailedModalVisible}
                            onClose={handleFamilyFailedModalClose}
                            />
                        </div>
                    )}    
                </div>
            </TabPane>
        </Tabs>
    );
};

export default EmployeeTabs;