import './roleConfigTable.css';
import React from 'react';
import { Modal, Table } from 'antd';
import { Button } from 'antd';
import { AiOutlineCheckCircle, AiOutlineFileSearch } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PiWarningCircleLight } from 'react-icons/pi';
import axios from 'axios';
import Cookies from 'js-cookie';

const RoleConfigTable = ({ searchValue, sortValue, countValue, modalOpen }) => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [uuid, setUuid] = useState(null);
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: countValue,
      showTotal: (total, range) => (
        <div className='total-data'>
          {range[0]}-{range[1]} of {total} items
        </div>
      ),
      showLessItems: true,
    },
  });
  const [params, setParams] = useState({
    page: tableParams.pagination.current,
    per_page: tableParams.pagination.pageSize,
  });

  const getRoleData = async () => {
    try {
      var page;
      setLoading(true);
      if (tableParams.pagination.total < countValue) {
        page = 1;
      } else {
        page = tableParams.pagination.current;
      }
      console.log(sortValue);
      const response = await axios.get('https://attendance-1-r8738834.deta.app/api/v1/role/', {
        params: {
          page: page,
          per_page: countValue,
          search: searchValue,
          desc: sortValue === 'latest' ? true : false,
        },
        headers: {
          Authorization: token,
        },
      });
      setRoleData(response.data[0].items);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data[0]._meta.total_items,
          pageSize: countValue,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoleData = async () => {
    try {
      setDeleting(true);
      const response = await axios.delete(
        `https://attendance-1-r8738834.deta.app/api/v1/role/${uuid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setDeleteSuccessModalOpen(true);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getRoleData();
  }, [token, navigate, modalOpen, params, countValue, searchValue, sortValue]);

  const handleDetailClick = record => {
    const value = record.key;
    navigate(`/role/detail-role/${value}`);
  };

  const handleDeleteButton = record => {
    setDeleteModalOpen(true);
    setUuid(record.key);
  };

  const successTitle = (
    <div className='success-title'>
      <AiOutlineCheckCircle size={80} className='success-logo' />
      <p className='success-text'>Success</p>
    </div>
  );

  const deleteTitle = (
    <div className='delete-title'>
      <PiWarningCircleLight size={70} className='caution-icon' />
      <p className='delete-header'>Attention</p>
    </div>
  );

  const reloadTableData = () => {
    getRoleData();
  };

  const handleCancelButton = () => {
    setDeleteModalOpen(false);
  };

  const title = [
    {
      key: 'roleName',
      title: 'Role Name',
      dataIndex: 'roleName',
    },
    {
      key: 'action',
      title: <div className='action-title'>Action</div>,
      render: record => (
        <div className='action-container'>
          <Button
            className='detail-button'
            type='primary'
            onClick={() => handleDetailClick(record)}
            size='small'
            ghost>
            <AiOutlineFileSearch className='detail-icon' />
          </Button>
          <Button
            className='delete-button'
            type='primary'
            size='small'
            onClick={() => handleDeleteButton(record)}
            ghost>
            <BiTrash className='delete-role-icon' />
          </Button>
        </div>
      ),
    },
  ];

  const tabel_data = roleData.map(item => {
    return {
      key: item.uuid,
      roleName: item.name,
      createdDate: item.created_date,
      updatedDate: item.updated_date,
    };
  });

  const handleTableChange = (pagination, sorter) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
        pageSize: countValue,
      },
      ...sorter,
    });

    setParams({
      page: pagination.current,
      per_page: pagination.pageSize,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setRoleData([]);
    }
  };

  return (
    <>
      <Table
        columns={title}
        dataSource={tabel_data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: true, y: 650 }}
      />
      <Modal
        title={deleteTitle}
        centered
        open={deleteModalOpen}
        onCancel={handleCancelButton}
        footer={[
          <Button
            type='text'
            key='cancelButton'
            className='cancel-delete-role'
            onClick={handleCancelButton}>
            CANCEL
          </Button>,
          <Button
            key='deleteButton'
            className='delete-role'
            onClick={deleteRoleData}
            loading={deleting}>
            DELETE
          </Button>,
        ]}>
        <p className='delete-caption'>Are you sure delete this role?</p>
      </Modal>

      <Modal
        title={successTitle}
        centered
        open={deleteSuccessModalOpen}
        onCancel={() => setDeleteSuccessModalOpen(false)}
        footer={null}>
        <div className='modal-content'>
          <p className='success-caption'>Delete successfull!</p>
          <Button
            key='successDeleteRole'
            className='save-button'
            onClick={() => {
              setDeleteSuccessModalOpen(false);
              reloadTableData();
            }}>
            Ok
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RoleConfigTable;
