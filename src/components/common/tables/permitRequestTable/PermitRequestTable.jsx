import React, {useState, useEffect} from 'react'
import './permitRequestTable.css'
import { Table } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'

function parseMonthYearString(monthYearString) {
  const [month, year] = monthYearString.split("/");
  return new Date(`${year}-${month}-1`);
}

function isDateInRange(itemDate, selectedMonthYear) {
  const itemDateObj = new Date(itemDate);
  const selectedDate = parseMonthYearString(selectedMonthYear);

  // Mengatur startDate ke tanggal 1 (awal bulan)
  const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

  // Mengatur endDate ke tanggal terakhir bulan
  const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

  // Memeriksa apakah itemDate berada dalam rentang
  return itemDateObj >= startDate && itemDateObj <= endDate;
}

const PermitRequestTable = (props) => {
  let typePermit ;
  const token = Cookies.get('token');
  const [permitData, setPermitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {searchValue, filterValue, sortValue, countValue, datePickerValue, columns, respondApproveModalVisible, respondRejectModalVisible} = props;
  const location = useLocation();
  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  }

    const [tableParams, setTableParams] = useState({
        pagination : {
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

    if (location.pathname === '/leave-request') {
      typePermit = "cuti"
    } else if (location.pathname === '/permit-request') {
      typePermit = "izin"
    } else if (location.pathname === '/overtime-request') {
      typePermit = "lembur"
    } else if (location.pathname === '/official-travel-request') {
      typePermit = "dinas"
    }

    const getPermitData = async () => {
      try {
        var page;
        setLoading(true);
        if (tableParams.pagination.total < countValue) {
          page = 1;
        } else {
          page = tableParams.pagination.current;
        }
        const response = await axios.get("http://103.82.93.38/api/v1/permit/", {
          params: {
            page: page,
            per_page: countValue,
            search: searchValue,
            type_permit: typePermit,
            date_permit: datePickerValue ? datePickerValue : null,
            desc: sortValue === 'latestEndPermitDate' ? true : false,
            sort_by: sortValue === 'latestEndPermitDate' || sortValue === 'oldestEndPermitDate' ? 'end_date_permit' : null,
            status: filterValue[0],
          },
          headers: {
            Authorization: token,
          },
        });
        setPermitData(response.data[0].items);
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
    }

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
      getPermitData();
    }, [token, navigate, params, countValue, searchValue, sortValue, filterValue, respondApproveModalVisible, respondRejectModalVisible, datePickerValue]);

    const dataLeaveRaw = permitData
    .map(item => {
      let status = "pending";
      let statusByHr = "pending";
      let statusByTeamLeader = "pending";

      if (item.approved_by_hr === true ) {
        statusByHr = "approved";
      } else if (item.approved_by_hr === false && item.reject_by !== null) {
        statusByHr = "rejected";
      }

      if (item.approved_by_team_lead === true) {
        statusByTeamLeader = "approved";
      } else if (item.approved_by_team_lead === false && item.reject_by !== null) {
        statusByTeamLeader = "rejected";
      }

      if (statusByHr === "approved" && statusByTeamLeader === "approved") {
        status = "approved";
      } else if (statusByHr === "rejected" || statusByTeamLeader === "rejected") {
        status = "rejected";
      }

      return {
        key: item.uuid,
        employee_name: item.attendance.employee.name,
        type_leave: item.type.name,
        reason: item.reason,
        permit_date: formatDate(item.date_permit),
        end_permit_date: formatDate(item.end_date_permit),
        status: status,
        hr: item.hr_employee,
        status_by_hr: statusByHr,
        team_leader: item.team_lead_employee,
        status_by_team_leader: statusByTeamLeader,
      }
    });

    const dataLeave = dataLeaveRaw.filter(item => { 
      const isStatusMatch = filterValue.includes('approved') || filterValue.includes('rejected') || filterValue.includes('pending')
      ? filterValue.includes(item.status)
      : true

      // convert item.permit_date from DD/MM/YYYY to MM/DD/YYYY
      const dateItem = item.permit_date.split("/").reverse().join("/");
      const isDateMatch = datePickerValue 
      ? isDateInRange(dateItem, datePickerValue)
      : true
      
      return isStatusMatch && isDateMatch;
    });

    const dataOfficialTravelRaw = permitData
    .map(item => {
      let status = "pending";
      let statusByHr = "pending";
      let statusByTeamLeader = "pending";

      if (item.approved_by_hr === true ) {
        statusByHr = "approved";
      } else if (item.approved_by_hr === false && item.reject_by !== null) {
        statusByHr = "rejected";
      }

      if (item.approved_by_team_lead === true) {
        statusByTeamLeader = "approved";
      } else if (item.approved_by_team_lead === false && item.reject_by !== null) {
        statusByTeamLeader = "rejected";
      }

      if (statusByHr === "approved" && statusByTeamLeader === "approved") {
        status = "approved";
      } else if (statusByHr === "rejected" || statusByTeamLeader === "rejected") {
        status = "rejected";
      }

      return {
        key: item.uuid,
        employee_name: item.attendance.employee.name,
        agenda: item.type.name,
        destination: item.destination,
        permit_date: formatDate(item.date_permit),
        end_permit_date: formatDate(item.end_date_permit),
        status: status,
        hr: item.hr_employee,
        status_by_hr: statusByHr,
        team_leader: item.team_lead_employee,
        status_by_team_leader: statusByTeamLeader,
      }
    });

    const dataOfficialTravel = dataOfficialTravelRaw.filter(item => {
      const isStatusMatch = filterValue.includes('approved') || filterValue.includes('rejected') || filterValue.includes('pending')
      ? filterValue.includes(item.status)
      : true

      // convert item.permit_date from DD/MM/YYYY to MM/DD/YYYY
      const dateItem = item.permit_date.split("/").reverse().join("/");
      const isDateMatch = datePickerValue
      ? isDateInRange(dateItem, datePickerValue)
      : true

      return isStatusMatch && isDateMatch;
    });

    const dataOvertimeRaw = permitData
    .map(item => {
      let status = "pending";
      let statusByHr = "pending";
      let statusByTeamLeader = "pending";

      if (item.approved_by_hr === true ) {
        statusByHr = "approved";
      } else if (item.approved_by_hr === false && item.reject_by !== null) {
        statusByHr = "rejected";
      }

      if (item.approved_by_team_lead === true) {
        statusByTeamLeader = "approved";
      } else if (item.approved_by_team_lead === false && item.reject_by !== null) {
        statusByTeamLeader = "rejected";
      }

      if (statusByHr === "approved" && statusByTeamLeader === "approved") {
        status = "approved";
      } else if (statusByHr === "rejected" || statusByTeamLeader === "rejected") {
        status = "rejected";
      }

      return {
        key: item.uuid,
        employee_name: item.attendance.employee.name,
        type_overtime: item.type.name,
        reason: item.reason,
        overtime_date: formatDate(item.date_permit),
        duration: item.hours_overtime,
        status: status,
        hr: item.hr_employee,
        status_by_hr: statusByHr,
        team_leader: item.team_lead_employee,
        status_by_team_leader: statusByTeamLeader,
      }
    });

    const dataOvertime = dataOvertimeRaw.filter(item => {
      const isStatusMatch = filterValue.includes('approved') || filterValue.includes('rejected') || filterValue.includes('pending')
      ? filterValue.includes(item.status)
      : true

      // convert item.permit_date from DD/MM/YYYY to MM/DD/YYYY
      const dateItem = item.overtime_date.split("/").reverse().join("/");
      const isDateMatch = datePickerValue
      ? isDateInRange(dateItem, datePickerValue)
      : true

      return isStatusMatch && isDateMatch;
    });

    const dataPermitRaw = permitData
    .map(item => {
      let status = "pending";
      let statusByHr = "pending";
      let statusByTeamLeader = "pending";

      if (item.approved_by_hr === true ) {
        statusByHr = "approved";
      } else if (item.approved_by_hr === false && item.reject_by !== null) {
        statusByHr = "rejected";
      }

      if (item.approved_by_team_lead === true) {
        statusByTeamLeader = "approved";
      } else if (item.approved_by_team_lead === false && item.reject_by !== null) {
        statusByTeamLeader = "rejected";
      }

      if (statusByHr === "approved" && statusByTeamLeader === "approved") {
        status = "approved";
      } else if (statusByHr === "rejected" || statusByTeamLeader === "rejected") {
        status = "rejected";
      }

      return {
        key: item.uuid,
        employee_name: item.attendance.employee.name,
        type_permit: item.type.name,
        reason: item.reason,
        permit_date: formatDate(item.date_permit),
        end_permit_date: formatDate(item.end_date_permit),
        status: status,
        hr: item.hr_employee,
        status_by_hr: statusByHr,
        team_leader: item.team_lead_employee,
        status_by_team_leader: statusByTeamLeader,
      }
    });

    const dataPermit = dataPermitRaw.filter(item => {
      const isStatusMatch = filterValue.includes('approved') || filterValue.includes('rejected') || filterValue.includes('pending')
      ? filterValue.includes(item.status)
      : true

      // convert item.permit_date from DD/MM/YYYY to MM/DD/YYYY
      const dateItem = item.permit_date.split("/").reverse().join("/");
      const isDateMatch = datePickerValue
      ? isDateInRange(dateItem, datePickerValue)
      : true

      return isStatusMatch && isDateMatch;
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
          pagination: {
            ...tableParams.pagination,
            current: pagination.current,
            pageSize: countValue,
          },
          filters,
          ...sorter,
        });
    
        setParams({
          page: pagination.current,
          per_page: pagination.pageSize,
          search: searchValue,
        });
    
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
          setPermitData([]);
        }
    };

    return (
        <div>
          {location.pathname === '/official-travel-request' ? 
            <Table 
                columns={columns}
                dataSource={dataOfficialTravel}
                pagination={tableParams.pagination}
                loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
          : location.pathname === '/leave-request' ?  
            <Table 
                columns={columns}
                dataSource={dataLeave}
                pagination={tableParams.pagination}
                loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
          : location.pathname === '/permit-request' ?
            <Table 
                columns={columns}
                dataSource={dataPermit}
                pagination={tableParams.pagination}
                loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
          : location.pathname === '/overtime-request' ?
            <Table 
                columns={columns}
                dataSource={dataOvertime}
                pagination={tableParams.pagination}
                loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                onChange={handleTableChange}
            />
          : null }
        </div>
    )
}

export default PermitRequestTable