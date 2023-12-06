import React, {useEffect, useState} from 'react';
import { Tabs, Button, Avatar, Divider, Row, Col, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
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
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import LoadingComponent from '../../loadingComponent/LoadingComponent';

const { TabPane } = Tabs;

const EmployeeTabs = () => {

    const { uuid } = useParams();
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const [selectedEmployeeData, setSelectedEmployeeData] = useState([]);
    const [selectedEmployeeLoading, setSelectedEmployeeLoading] = useState(false);

    const [selectedEducationData, setSelectedEducationData] = useState([]);
    const [addEducationLoading, setAddEducationLoading] = useState(false);
    const [editEducationLoading, setEditEducationLoading] = useState(false);

    const [selectedFamilyData, setSelectedFamilyData] = useState([]);
    const [addFamilyLoading, setAddFamilyLoading] = useState(false);
    const [editFamilyLoading, setEditFamilyLoading] = useState(false);

    // hanlder employee data tabs
    const editEmployeeData = async (values) => {
        try {
            setSelectedEmployeeLoading(true);
            values.birth_date = dayjs(values.birth_date, "YYYY-MM-DD").format("YYYY-MM-DD");
            // await axios.put(`https://attendance-1-r8738834.deta.app/api/v1/employee/${selectedEmployeeData.key}`, values, {
            await axios.put(`http://127.0.0.1:5000/api/v1/employee/${selectedEmployeeData.uuid}`, values, {
                headers: {
                    "Authorization": token,
                },
            });
            setIsSuccessModalVisible(true);
        } catch (error) {
            setIsFailedModalVisible(true);
            console.log(error, values);
        } finally {
            setSelectedEmployeeLoading(false);
        }
    }

    const handleEmployeeSuccessAddForm = (values) => {
        editEmployeeData(values);
    }

    const handleEmployeeFailedAddForm = (error) => {
        setIsFailedModalVisible(true);
        console.log(error)
    }

    const handleEmployeeSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    const handleEmployeeFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };

    // handler education data tabs
    const [activeEducationTab, setActiveEducationTab] = useState('education-data');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

    const handleEducationAddButtonClick = () => {
        setActiveEducationTab('education-add-form');
    }

    const handleEducationDetailButtonClick = (record) => {
        setSelectedEducationData(record);
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

    // API call to add education data
    const addEducationData = async (values) => {
        try {
            values.entry_year = dayjs(values.entry_year, "YYYY-MM-DD").format("YYYY-MM-DD");
            values.out_year = dayjs(values.out_year, "YYYY-MM-DD").format("YYYY-MM-DD");
            values.ipk = parseFloat(values.ipk);
            setAddEducationLoading(true);
            await axios.post(`https://attendance-1-r8738834.deta.app/api/v1/employee/education/add`,
            {
                employee_uuid: uuid,
                education: values.education,
                institute: values.institution,
                major: values.major,
                thesis: values.thesis,
                ipk: values.ipk,
                certificate_number: values.certificate_number,
                entry_year: values.entry_year,
                out_year: values.out_year,
            },
            {
                headers: {
                    "Authorization": token,
                },
            });
            setIsSuccessModalVisible(true);
        } catch (error) {
            console.log(error);
        } finally {
            setAddEducationLoading(false);
        }
    }

    const handleEducationSuccessAddForm = (values) => {
        addEducationData(values);
    }

    const handleEducationFailedAddForm = () => {
        setIsFailedModalVisible(true);
    }

    // API call to edit education data
    const editEducationData = async (values) => {
        try {
            values.entry_year = dayjs(values.entry_year, "YYYY-MM-DD").format("YYYY-MM-DD");
            values.out_year = dayjs(values.out_year, "YYYY-MM-DD").format("YYYY-MM-DD");
            setEditEducationLoading(true);
            await axios.put(`https://attendance-1-r8738834.deta.app/api/v1/education/item/${selectedEducationData.key}`, values, {
                headers: {
                    "Authorization": token,
                },
            });
            setIsSuccessModalVisible(true);
        } catch (error) {
            setIsFailedModalVisible(true);
            console.log(error);
        } finally {
            setEditEducationLoading(false);
        }
    }

    const handleEducationFailedEditForm = () => {
        setIsFailedModalVisible(true);
    }

    const handleEducationSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
        setActiveEducationTab('education-data');
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

    const handleFamilyDetailButtonClick = (record) => {
        setSelectedFamilyData(record);
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

    const addFamilyData = async (values) => {
        try {
            setAddFamilyLoading(true);
            await axios.post(`https://attendance-1-r8738834.deta.app/api/v1/employee/family/add`,
            {
                employee_uuid: uuid,
                full_name: values.full_name,
                nik: values.nik,
                birth_date: values.birth_date,
                birth_place: values.birth_place,
                address: values.address,
                relation: values.relation,
                job: values.job,
            },
            {
                headers: {
                    "Authorization": token,
                },
            });
            setIsSuccessModalVisible(true);
        } catch (error) {
            setIsFailedModalVisible(true);
            console.log(error);
        } finally {
            setAddFamilyLoading(false);
        }
    }

    const handleFamilySuccessAddForm = (values) => {
        addFamilyData(values);
    }

    const handleFamilyFailedAddForm = () => {
        setIsFailedModalVisible(true);
    }

    const editFamilyData = async (values) => {
        try {
            setEditFamilyLoading(true);
            values.birth_date = dayjs(values.birth_date, "YYYY-MM-DD").format("YYYY-MM-DD");
            await axios.put(`https://attendance-1-r8738834.deta.app/api/v1/family/member/${selectedFamilyData.key}`, values, {
                headers: {
                    "Authorization": token,
                },
            });
            setIsSuccessModalVisible(true);
        } catch (error) {
            setIsFailedModalVisible(true);
            console.log(error);
        } finally {
            setEditFamilyLoading(false);
        }
    }

    const handleFamilyFailedEditForm = () => {
        setIsFailedModalVisible(true);
    }

    const handleFamilySuccessModalClose = () => {
        setIsSuccessModalVisible(false);
        setActiveFamilyTab('family-data');
    };

    const handleFamilyFailedModalClose = () => {
        setIsFailedModalVisible(false);
    };
    // end of handler family data tabs
    
    // API call to get selected employee data
    const getSelectedEmployeeData = async () => {
        try {
            setSelectedEmployeeLoading(true);
            // const response = await axios.get(`https://attendance-1-r8738834.deta.app/api/v1/employee/${uuid}`, {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/employee/${uuid}`, {
            headers: {
              "Authorization": token,
            },
            });
            setSelectedEmployeeData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setSelectedEmployeeLoading(false);
        }
    }

    const onChange = (key) => {
        console.log(key);
    };

    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
        getSelectedEmployeeData();
    }, [token, navigate, isSuccessModalVisible]);

    return (
        <>
            <Row align='middle' gutter={[56, 8]}>
            <Col xs={8} sm={6} md={6} lg={4} xl={3} xxl={2}>
                <Avatar size={100} icon={<UserOutlined />} />
            </Col>
            <Col xs={16} sm={18} md={18} lg={20} xl={21} xxl={22}>
                <div className='profile-info'>
                {/* <h4 className='profile-name'>{selectedEmployeeData.name}</h4>
                <p className='profile-role'>{selectedEmployeeData.position.name}</p> */}
                </div>
            </Col>
            </Row>
        <Divider className='profile-divider'/>
        <Tabs defaultActiveKey="employeeData" onChange={onChange}>
            <TabPane tab="Employee Data" key="employeeData"> <br />
            {selectedEmployeeLoading ? <LoadingComponent /> :
                <Spin spinning={editEducationLoading} size='large' tip="Edit Data...">
                <EmployeeEditForm 
                selectedEmployeeData={selectedEmployeeData} 
                onFinish={handleEmployeeSuccessAddForm}
                onFinishFailed={handleEmployeeFailedAddForm}/>

                <SuccessAddDataModal
                visible={isSuccessModalVisible}
                onClose={handleEmployeeSuccessModalClose}
                textParagraph="Data update successful!"
                />

                <FailedAddDataModal
                visible={isFailedModalVisible}
                onClose={handleEmployeeFailedModalClose}
                />
                </Spin>
            }
            </TabPane>
            <TabPane tab="Education Data" key="educationData">
                <div>
                    {activeEducationTab === 'education-data' && (
                        <>
                        <Row>
                            <Col style={{marginBottom: 16}} xs={24} md={{span: 12, offset:12}} lg={{span: 12, offset:12}} xl={{span: 6, offset:18}} xxl={{span: 4, offset:20}}>
                                <AddButton buttonText="Add Education" handleClick={handleEducationAddButtonClick}/>
                            </Col>
                        </Row>
                        <div className='education-data'>
                            <EducationTable onDetailClick={handleEducationDetailButtonClick}/>
                        </div>
                        </>       
                    )}
                    
                    {activeEducationTab === 'education-detail' && (
                        <div className='education-detail'>
                            <DetailEducationTable detailEducationData={selectedEducationData} />
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
                            <Spin spinning={addEducationLoading} size='large' tip="Add Data...">
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
                            </Spin>
                        </div>
                    )} 
                    
                    {activeEducationTab === 'education-edit-form' && (
                        <div className='education-edit-form'>
                            <Spin spinning={editEducationLoading} size='large' tip="Edit Data...">
                            <EducationForm
                            onCancleEditFormButton={handleEducationCancleEditFormButtonClick}
                            onFinish={editEducationData}
                            onFinishFailed={handleEducationFailedEditForm}
                            editEducationData={selectedEducationData}/>

                            <SuccessAddDataModal
                            visible={isSuccessModalVisible}
                            onClose={handleEducationSuccessModalClose}
                            textParagraph="Data update successful!"
                            />

                            <FailedAddDataModal
                            visible={isFailedModalVisible}
                            onClose={handleEducationFailedModalClose}
                            />
                            </Spin>
                        </div>
                    )}    
                </div>
            </TabPane>
            <TabPane tab="Family Data" key="familyData">
            <div>
                    {activeFamilyTab === 'family-data' && (
                        <>
                        <Row>
                            <Col style={{marginBottom: 16}} xs={24} md={{span: 12, offset:12}} lg={{span: 12, offset:12}} xl={{span: 6, offset:18}} xxl={{span: 4, offset:20}}>
                                <AddButton buttonText="Add Family" handleClick={handleFamilyAddButtonClick}/>
                            </Col>
                        </Row>
                        <div className='family-data'>
                            <FamilyTable onDetailClick={handleFamilyDetailButtonClick}/>
                        </div>     
                        </>  
                    )}
                    
                    {activeFamilyTab === 'family-detail' && (
                        <div className='family-detail'>
                            <DetailFamilyTable detailFamilyData={selectedFamilyData} />
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
                            <Spin spinning={addFamilyLoading} size='large' tip="Add Data...">
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
                            </Spin>
                        </div>
                    )} 
                    
                    {activeFamilyTab === 'family-edit-form' && (
                        <Spin spinning={editFamilyLoading} size='large' tip="Edit Data...">
                        <div className='family-edit-form'>
                            <FamilyForm
                            onCancleEditFormButton={handleFamilyCancleEditFormButtonClick}
                            onFinish={editFamilyData}
                            onFinishFailed={handleFamilyFailedEditForm}
                            editFamilyData={selectedFamilyData}/>

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
                        </Spin>
                    )}    
                </div>
            </TabPane>
        </Tabs>
        </>
    );
};

export default EmployeeTabs;