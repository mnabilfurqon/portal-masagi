import React, { useState, useEffect } from 'react'
import './presentConfiguration.css'
import { useNavigate } from 'react-router-dom'
import { Row, Col, DatePicker, Progress, Input, Table, Button, Spin, Avatar, Flex } from 'antd'
import { IoIosSearch } from "react-icons/io";
import { AiOutlineFileSearch, AiOutlineUser } from 'react-icons/ai'
import FilterDropdown from '@common/buttons/FilterButton/FilterDropdown'
import CountButton from '@common/buttons/countButton/CountButton'
import HistoryButton from '@common/buttons/historyButton/HistoryButton'
import Cookies from 'js-cookie'
import axios from 'axios'
import dayjs from 'dayjs'

const PresentConfiguration = () => {
  // Declaration
  const navigate = useNavigate();
  const token = Cookies.get("token")
  const [loading, setLoading] = useState(false);
  const [reportDaily, setReportDaily] = useState();
  const [attendanceSummary, setAttendanceSummary] = useState();
  const [attendanceCompany, setAttendanceCompany] = useState();
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsents, setTotalAbsents] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [totalPermit, setTotalPermit] = useState(0);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [totalOvertime, setTotalOvertime] = useState(0);
  const [totalOfficialTravels, setTotalOfficialTravels] = useState(0);
  const [typeReport, setTypeReport] = useState("Present");

  const today = dayjs()
  const currentDate = today.format("YYYY-MM-DD")
  const currentDayDate = today.format('dddd, DD MMMM YYYY')
  const [filterValue, setFilterValue] = useState(currentDate);
  const [dayDate, setDayDate] = useState(currentDayDate);
  // console.log(filterValue)

  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getAttendanceSummary()
    getAttendanceCompany()
    getReportDaily()
  }, [token, navigate, filterValue, typeReport]);

  // Date Filter Handler
  const onChange = (e) => {
    setFilterValue(e.format('YYYY-MM-DD'))
    setDayDate(e.format('dddd, DD MMMM YYYY'))
    getAttendanceSummary()
  }

  // OnClick Handler
  const onPresents = () => {setTypeReport("Present")}
  const onAbsents = () => {setTypeReport("Absent")}
  const onTravels = () => {setTypeReport("Official Travel")}
  const onOvertimes = () => {setTypeReport("Overtime")}
  const onLeaves = () => {setTypeReport("Leave")}
  const onPermits = () => {setTypeReport("Permit")}

  // Search Handler
  const [searchValue, setSearchValue] = useState("");

  // Count Handler
  const [countValue, setCountValue] = useState("10");

  const handleCount = (value) => {
    setCountValue(value);
  };

  // Table
  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        return String(record.employee).toLowerCase().includes(value.toLowerCase());
      },
      // defaultSortOrder: ['descend'],
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => {return a.employee.localeCompare(b.employee)},
      // sorter: (a, b) =>  a.employee.lenght - b.employee.lenght,
      render: (record) => {
        // console.log("employee record", record)
        return (
        <Flex gap={4} align='center'>
            <Avatar size={55} style={{ backgroundColor: "skyBlue"}} icon={<AiOutlineUser />}/>
            {/* <div style={{ margin: 0, padding: 0, }}>
                <h3 style={{ margin: 0, padding: 0, fontSize: 14, }}>{record.name}</h3>
                <h5 style={{ margin: 0, padding: 0, fontSize: 12, color: "gray", }}>{record.division.name}</h5>
            </div> */}
        </Flex>
        )
    },
    },
    {
      title: "In-Time",
      dataIndex: "in_time",
      key: "in_time",
    },
    {
      title: "Out-Time",
      dataIndex: "out_time",
      key: "out_time",
    },
    {
      title: "Total Hours",
      dataIndex: "total_hours",
      key: "total_hours",
    },
    {
      title: "Lateness",
      dataIndex: "lateness",
      key: "lateness",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "On-Time", value: "on-time" }, { text: "Late", value: "late" }
      ],
      // sortDirections: ["descend", "ascend"],
      // sorter: (a, b) => {return a.employee.localeCompare(b.employee)},
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (record) => {
        // console.log("record", record)
        if (record === "00:00:00") {
          return (
            <Button className="active-button" type="primary" size="small" value="active" ghost>
              on-time
            </Button>
          );
        } else {
          return (
            <Button className="not-active-button" type="primary" size="small" value="notActive" ghost>
              late
            </Button>
          );
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button className="action-button" type="none" size="small" onClick={() => {handleDetailClick(record)}} ghost>
          <AiOutlineFileSearch className="action-icon" />
        </Button>
      ),
    },
  ]

  const handleDetailClick = (record) => {
    // console.log("action record", record)
    const uuid = record.key
    navigate(`/present/detail/${uuid}`, { state: { data: record } });
    // navigate('/report/detail');
  };

  const onChangeTable = (pagination, filter, sorter, extra) => {
    //
  }

  // Get API Attendance Summary
  const getAttendanceSummary = async () => {
    try {
      setLoading(true);
      // const response = await axios.post(`http://103.82.93.38/api/v1/attendance/summary`, values,
      const response = await axios.get(`http://103.82.93.38/api/v1/attendance/summary?date=${filterValue}`,
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setAttendanceSummary(response.data)
      // console.log("attendance summary", response.data)
      setTotalPresent(response.data.total_present)
      setTotalEmployee(response.data.total_employee)
      setTotalAbsents(response.data.total_absent)
      setTotalPermit(response.data.total_permit_approved)
      setTotalLeaves(response.data.total_leaves)
      setTotalOvertime(response.data.total_overtimes)
      setTotalOfficialTravels(response.data.total_official_travels)
      // console.log("total leaves", attendanceSummary.total_permit_by_type["Lembur"]);
      // console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  // Get API Attendance Company
  const getAttendanceCompany = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://103.82.93.38/api/v1/attendance/company`,
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setAttendanceCompany(response.data.items)
      // console.log("attendance company", attendanceCompany)
      // console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const dataSource = attendanceCompany?.map(item => {
    return {
      key: item.uuid,
      employee: item.employee,
      // in_time: item.in_time,
      // out_time: item.out_time,
      // status: "on-time",
      // total_hours: "09:00:00",
      // lateness: "00:00:00",
    }
  })
  // console.log("Attendance Report", dataSource)

  // Get API Report Daily
  const getReportDaily = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://103.82.93.38/api/v1/attendance/report_daily`,
        {
          params: { type_report: typeReport, date: filterValue},
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setReportDaily(response.data.items)
      // console.log("Report Daily", reportDaily)
      // console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const dataReportDaily = reportDaily?.map(item => {
    const totalHours = (date_out, date_in) => {
      const totalInSec = dayjs(date_out).diff(date_in, "s", true);
      const total_hours = totalInSec/3600;
      const total_minutes = (totalInSec%3600)/60;
      const total_second = totalInSec%60;
      return Math.floor(total_hours)+":"+Math.floor(total_minutes)+":"+total_second;
      // return totalInSec;
    }

    const totalLateness = (in_time) => {
      const inTime = dayjs(in_time).format("YYYY-MM-DD hh:mm:ss")
      // console.log("in_time", inTime);

      const standard_in_time = dayjs().set('y', dayjs(in_time).get('y')).set('M', dayjs(in_time).get('M')).set('D', dayjs(in_time).get('D')).set('h', 8).set('m', 0).set('s', 0).format("YYYY-MM-DD hh:mm:ss");
      // console.log("standard_in_time", standard_in_time);

      const totalInSec = dayjs(in_time).diff(standard_in_time, "s", true);
      // console.log("total_insec", totalInSec);

      if (totalInSec > 0) {
          const total_hours = totalInSec/3600;
          const total_minutes = (totalInSec%3600)/60;
          const total_second = totalInSec%60;
          return Math.floor(total_hours)+":"+Math.floor(total_minutes)+":"+total_second;
          // return totalInSec;
      } else {
          return "00:00:00";
      }
    }

    return {
      key: item.uuid,
        date: dayjs(item.check_in_date).format("DD-MM-YYYY"),
        in_time: dayjs(item.check_in_date).format("hh:mm A"),
        out_time: dayjs(item.check_out_date).format("hh:mm A"),
        total_hours: totalHours(item.check_out_date, item.check_in_date),
        lateness: totalLateness(item.check_in_date),
        status: totalLateness(item.check_in_date),
    }
  })

  const data = [
    {
      uuid: "1",
      employee: "Albert",
      in_time: "08.00 AM",
      out_time: "05.00 PM",
      total_hours: "09:00:00",
      lateness: "00:000:00",
      status: "on-time",
    },
    {
      uuid: "2",
      employee: "Banny",
      in_time: "08.00 AM",
      out_time: "05.00 PM",
      total_hours: "09:00:00",
      lateness: "00:000:00",
      status: "on-time",
    },
    {
      uuid: "3",
      employee: "Flauny",
      in_time: "08.00 AM",
      out_time: "05.00 PM",
      total_hours: "09:00:00",
      lateness: "00:000:00",
      status: "on-time",
    },
    {
      uuid: "4",
      employee: "Harry",
      in_time: "08.50 AM",
      out_time: "05.00 PM",
      total_hours: "08:10:00",
      lateness: "00:50:00",
      status: "late",
    },
    {
      uuid: "5",
      employee: "Klaust",
      in_time: "08.00 AM",
      out_time: "05.00 PM",
      total_hours: "09:00:00",
      lateness: "00:00:00",
      status: "on-time",
    },
    {
      uuid: "6",
      employee: "Ian",
      in_time: "08.30 AM",
      out_time: "05.00 PM",
      total_hours: "08:03:00",
      lateness: "00:30:00",
      status: "late",
    },
    {
      uuid: "7",
      employee: "Zack",
      in_time: "08.00 AM",
      out_time: "05.00 PM",
      total_hours: "09:00:00",
      lateness: "00:00:00",
      status: "on-time",
    },
  ]

  // Filter by Division Handler
  const division = [
    {
      key: "all",
      label: "All Division",
    },
    {
      key: "it",
      label: "IT",
    },
    {
      key: "marketing",
      label: "Marketing",
    },
    {
      key: "finance",
      label: "Finance",
    },
    {
      key: "hr",
      label: "Human Resource",
    },
  ]

  return (
    <>
      <Spin size='large' spinning={loading}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
          <p className='week'>{dayDate}</p>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
          <DatePicker onChange={onChange} picker="date" placeholder='Filter By Date' style={{ width: "100%", }} />
        </Col>
      </Row>
      <br />

      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={totalPresent/totalEmployee*100} strokeWidth={10} size={55} />
            }
            title="Total Presents"
            value={0+totalPresent}
            onClick={onPresents}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={totalAbsents/totalEmployee*100} strokeColor="#DC3545" strokeWidth={10} size={55} />
            }
            title="Absents"
            value={0+totalAbsents}
            onClick={onAbsents}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={totalOfficialTravels/totalEmployee*100} strokeColor="#28A745" strokeWidth={10} size={55} />
            }
            title="Official Travels"
            value={0+totalOfficialTravels}
            onClick={onTravels}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={totalOvertime/totalEmployee*100} strokeColor="#FD7E14" strokeWidth={10} size={55} />
            }
              title="Overtimes"
              value={0+totalOvertime}
              onClick={onOvertimes}
              />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={totalLeaves/totalEmployee*100} strokeColor="#6F42C1" strokeWidth={10} size={55} />
            }
            title="Leaves"
            value={0+totalLeaves}
            onClick={onLeaves}
          />
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={4} xxl={4}>
          <HistoryButton 
            icon={
              <Progress type="circle" percent={totalPermit/totalEmployee*100} strokeColor="#FFC107" strokeWidth={10} size={55} />
            }
            title="Permits"
            value={0+totalPermit}
            onClick={onPermits}
          />
        </Col>
      </Row>
      <br /> <br />

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={14} lg={18} xl={18} xxl={18}>
          <Input 
            className='search-box'
            prefix={<IoIosSearch />} 
            placeholder='Search for employee name' 
            onChange={(e) => {
              setSearchValue(e.target.value);
              }}
            allowClear
          />
        </Col>
        <Col xs={6} sm={6} md={4} lg={2} xl={2} xxl={2}>
          <CountButton className="count-button" onCount={handleCount} />
        </Col>
        <Col xs={18} sm={18} md={6} lg={4} xl={4} xxl={4}>
          <FilterDropdown className="sort-button" text="All Division" items={division} />
        </Col>
      </Row>
      <br /> <br />

      <div className='table'>
        <p className='sub-title'>{typeReport}</p>
        <Table 
          dataSource={dataReportDaily}
          // dataSource={dataSource}
          columns={columns}
          onChange={onChangeTable}
          scroll={{
            x: 200,
          }}
          pagination={{
            pageSize: countValue,
          }}
        />
      </div>
      </Spin>
    </>
  )
}

export default PresentConfiguration