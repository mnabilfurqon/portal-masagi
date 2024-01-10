import React, {useState} from 'react'
import SearchBox from '@common/SearchBox/SearchBox'
import FilterButton from '@common/buttons/FilterButton/FilterButton'
import SortButton from '@common/buttons/sortButton/SortButton'
import PermitRequestTable from '@common/tables/permitRequestTable/PermitRequestTable'
import CountButton from '@common/buttons/countButton/CountButton'
import DialogModal from '@common/modals/dialogModal/DialogModal'
import RespondLeftModal from '@common/modals/respondLeftModal/RespondLeftModal'
import { Row, Col, DatePicker, Space, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { FaRegCheckSquare } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";

const LeaveMain = () => {
    const monthFormat = 'MMMM YYYY';
    const navigate = useNavigate();
    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [respondApproveModalVisible, setRespondApproveModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [respondRejectModalVisible, setRespondRejectModalVisible] = useState(false);

    // search handler
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value) => {
        setSearchValue(value);
    };
    // end of search handler

    // filter handler
    const [filterValue, setFilterValue] = useState("");

    const handleFilter = (value) => {
        setFilterValue(value);
    };
    // end of filter handler

    // sort handler
    const [sortValue, setSortValue] = useState("");

    const handleSort = (value) => {
        setSortValue(value);
    };
    // end of sort handler

    // count handler
    const [countValue, setCountValue] = useState("10");

    const handleCount = (value) => {
        setCountValue(value);
    };
    // end of count handler

    const treeData = [
        {
          title: 'Approved',
          key: 'approved',
        },
        {
          title: 'Pending',
          key: 'pending',
        },
        {
          title: 'Rejected',
          key: 'rejected',
        },
    ];

    const itemsSort = [
        {
          key: 'aToZEmployee',
          label: 'A-Z Employee Name'
        },
        {
          key: 'zToAEmployee',
          label: 'Z-A Employee Name'
        },
        {
          key: 'latestEndPermitDate',
          label: 'Latest End Permit Date'
        },
        {
          key: 'oldestEndPermitDate',
          label: 'Oldest End Permit Date'
        },
    ];

    const columns = [
        {
            title: 'Employee Name',
            dataIndex: 'employee_name',
            key: 'employee_name',
            ellipsis: true,
        },
        {
            title: 'Type Leave',
            dataIndex: 'type_leave',
            key: 'type_leave',
            ellipsis: true,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            ellipsis: true,
        },
        {
            title: 'Permit Date',
            dataIndex: 'permit_date',
            key: 'permit_date',
            ellipsis: true,
        },
        {
            title: 'End Permit Date',
            dataIndex: 'end_permit_date',
            key: 'end_permit_date',
            ellipsis: true,
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: (text) => {
            if (text === 'pending') {
                return (
                    <Button className="pending-button" type="primary" size="small" value="pending" ghost>
                    pending
                    </Button>
                );
            } else if (text === 'approved') {
                return (
                    <Button className="approved-button" type="primary" size="small" value="approved" ghost>
                    approved
                    </Button>
                );
            } else {
                return (
                    <Button className="rejected-button" type="primary" size="small" value="rejected" ghost>
                    rejected
                    </Button>
                );
            }
          },
        },
        {
          title: 'Action',
          key: 'action',
            render: (record) => (
                <Space size="small">
                    <Button className="action-button" type="primary" size="small" onClick={() => {handleDetailClick(record)}} ghost>
                        <AiOutlineFileSearch className="action-icon" />
                    </Button>
                    <Button className="action-button" type="primary" size="small" onClick={handleApproveModalOpen} ghost>
                        <FaRegCheckSquare className="accept-icon"/>
                    </Button>
                    <Button className="action-button" type="primary" size="small" onClick={handleRejectModalOpen} ghost>
                        <CgCloseR className="reject-icon" />
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDetailClick = (record) => {
        navigate('/leave-request/detail', { state: { data: record } });
    };
    
    const handleApproveModalOpen = () => {
        setApproveModalVisible(true);
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
    };
    
    const propsTable = {
        searchValue,
        filterValue,
        sortValue,
        countValue,
        columns,
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
    <div>
        <Row gutter={[16, 8]}>
            <Col xs={24} md={14} lg={8} xl={6} xxl={6}>
            <SearchBox onSearch={handleSearch} /> 
            </Col>
            <Col xs={11} md={10} lg={8} xl={4} xxl={3}>
            <FilterButton onFilter={handleFilter} treeData={treeData} />
            </Col>
            <Col xs={13} md={8} lg={8} xl={6} xxl={3}>
            <SortButton className="sort-button" onSort={handleSort} items={itemsSort} />
            </Col>
            <Col xs={8} md={4} lg={12} xl={2} xxl={2}>
            <CountButton className="count-button" onCount={handleCount} />
            </Col>
            <Col xs={16} md={12} lg={12} xl={{span: 4, offset: 2}} xxl={{span: 4, offset: 6}}>
            <DatePicker picker="month" format={monthFormat} className='date-picker-month' />
            </Col>
        </Row>
        <div style={{marginTop: 24}}>
        <PermitRequestTable {...propsTable}/>
        <DialogModal {...propsApproveDialogModal} />
        <RespondLeftModal {...propsApproveRespondModal} />
        <DialogModal {...propsRejectDialogModal} />
        <RespondLeftModal {...propsRejectRespondModal} />
      </div>
    </div>
  )
}

export default LeaveMain
