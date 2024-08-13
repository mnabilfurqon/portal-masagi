import React, { useState, useRef, useEffect, } from 'react'
import './attendanceConfiguration.css'
import { useNavigate } from 'react-router-dom'
import StartAttendance from '../../../../assets/images/StartAttendance.png'
import DoneAttendance from '../../../../assets/images/attendance_done.png'
import { Avatar, Button, Flex, Image, Modal, Form, Input, Upload, Spin, Row, Col, } from 'antd'
import AttendanceModals from '@common/modals/attendanceModals/AttendanceModals'
import SuccessModal from '@common/modals/successModal/SuccessModal'
import FailedModal from '@common/modals/failedModal/FailedModal'
import axios from 'axios'
import Cookies from 'js-cookie'
import { GrLocation } from 'react-icons/gr'
import dayjs from 'dayjs'

const AttendanceConfiguration = () => {
  // Declaration
  const cookies = Cookies.get();
  const token = Cookies.get("token");
  const check_in_time = Cookies.get("check_in_time");
  const check_in_location = Cookies.get("check_in_location");
  const navigate = useNavigate();
  const webcamRefIn = useRef();
  const webcamRefOut = useRef();
  const username = Cookies.get("username");
  // console.log(checkInTime);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [checkInImage, setCheckInImage] = useState();
  const [checkOutImage, setCheckOutImage] = useState();
  const [checkInFile, setCheckInFile] = useState();
  const [checkOutFile, setCheckOutFile] = useState();
  const [checkIn, setCheckIn] = useState({time: "-", location:"-"});
  const [checkOut, setCheckOut] = useState({time: "-", location: "-"});
  const [userCurrentLocation, setUserCurrentLocation] = useState(""); 

  const [openEnableLocationCheckIn, setOpenEnableLocationCheckIn] = useState(false); 
  const [openAddPhotoCheckIn, setOpenAddPhotoCheckIn] = useState(false);
  const [openCameraCheckIn, setOpenCameraCheckIn] = useState(false);
  const [openSubmitAttendanceCheckIn, setOpenSubmitAttendanceCheckIn] = useState(false);
  const [openCheckInSuccessModal, setOpenCheckInSuccessModal] = useState(false);
  
  const [openEnableLocationCheckOut, setOpenEnableLocationCheckOut] = useState(false); 
  const [openAddPhotoCheckOut, setOpenAddPhotoCheckOut] = useState(false);
  const [openCameraCheckOut, setOpenCameraCheckOut] = useState(false);
  const [openSubmitAttendanceCheckOut, setOpenSubmitAttendanceCheckOut] = useState(false);
  const [openCheckOutSuccessModal, setOpenCheckOutSuccessModal] = useState(false);
  const [openFailedModal, setOpenFailedModal] = useState(false);

  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getUserLocation();
    // console.log(cookies);
  }, [token, navigate,]);

  const day = dayjs();
  const currentDate = day.format("DD MMMM YYYY")
  const [today, setToday] = useState(currentDate);
  // console.log(today);

  // Geolocation
  const [userLocation, setUserLocation] = useState({latitude: "", longitude: ""});
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          getUsersCurrentLocation();
        },
        (error) => {
          console.log("Error getting user location:", error);
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser!')
    }
  }

  const getUsersCurrentLocation = async () => {
    try {
      setLoading(true)
      setSpinning(true)
      const response = await axios.get(`https://geocode.maps.co/reverse?lat=${userLocation.latitude}&lon=${userLocation.longitude}&api_key=659cd36b224f9533058416ixkb77e69`);
      const location = response.data.address.office + ", " + response.data.address.road + ", " + response.data.address.subdistrict;
      setUserCurrentLocation(location);
      setLoading(false)
      setSpinning(false)
      // console.log("User Location: ", location);
      // console.log("User Current Location: ", userCurrentLocation);
    } catch (error) {
      console.log("Error", error);
      setLoading(false)
      setSpinning(false)
    } finally {
      setLoading(false);
      setSpinning(false)
    }
  }

  // Check In
  const startAttendanceCheckIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenEnableLocationCheckIn(true);
    }, 3000);
  }
  
  const onOkEnableLocationCheckIn = () => {
    setLoading(true);
    getUserLocation();
    setTimeout(() => {
      setLoading(false);
      setOpenAddPhotoCheckIn(true);
      setOpenEnableLocationCheckIn(false);
      // console.log("User location: ", userLocation);
    }, 3000);
  }

  const onCancelEnableLocationCheckIn = () => {
    setOpenEnableLocationCheckIn(false);
  }

  const onOkAddPhotoCheckIn = () => {
    setOpenAddPhotoCheckIn(false);
    setOpenCameraCheckIn(true);
  }

  const onCancelAddPhotoCheckIn = () => {
    setOpenAddPhotoCheckIn(false);
  }

  const [fileIn, setFileIn] = useState();
  const handleCaptureIn = url => {
    fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], "photo_in.png", { type: "image/png"})
      setFileIn(file)
      // console.log("fileIn", fileIn)
    })
  }

  const onOkCameraCheckIn = (e) => {    
    const imageSrc = webcamRefIn.current.getScreenshot()
    handleCaptureIn(imageSrc)
    setCheckInImage(imageSrc)    
    // getUserLocation();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);  
      let checkInTime = day.format("DD-MM-YYYY hh:mm A");
      setCheckIn({time: checkInTime, location: userCurrentLocation})
      setOpenCameraCheckIn(false);
      setOpenSubmitAttendanceCheckIn(true);
    }, 1000);
  }

  const onCancelCameraCheckIn = () => {
    setOpenCameraCheckIn(false);
  }

  const onOkSubmitAttendanceCheckIn = () => {
    setOpenSubmitAttendanceCheckIn(false);
    // setOpenCheckInSuccessModal(true);
  }

  const onCancelSubmitAttendanceCheckIn = () => {
    setOpenSubmitAttendanceCheckIn(false);
  }

  // Check Out
  const startAttendanceCheckOut = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenEnableLocationCheckOut(true);
    }, 3000);
  }
  
  const onOkEnableLocationCheckOut = () => {
    setLoading(true);
    getUserLocation();
    setTimeout(() => {
      setLoading(false);
      setOpenEnableLocationCheckOut(false);
      setOpenAddPhotoCheckOut(true);
      // console.log("User location: ", userLocation);
    }, 3000);
  }

  const onCancelEnableLocationCheckOut = () => {
    setOpenEnableLocationCheckOut(false);
  }

  const onOkAddPhotoCheckOut = () => {
    setOpenAddPhotoCheckOut(false);
    setOpenCameraCheckOut(true);
  }

  const onCancelAddPhotoCheckOut = () => {
    setOpenAddPhotoCheckOut(false);
  }

  const [fileOut, setFileOut] = useState();
  const handleCaptureOut = url => {
    fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], "photo_out.png", { type: "image/png"})
      setFileOut(file)
      // console.log("fileOut", fileOut)
    })
  }
  
  const onOkCameraCheckOut = () => {    
    const imageSrc = webcamRefOut.current.getScreenshot();
    setCheckOutImage(imageSrc)
    handleCaptureOut(imageSrc)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      let checkOutTime = day.format("DD-MM-YYYY hh:mm A");
      setCheckOut({time: checkOutTime, location: userCurrentLocation})
      setOpenCameraCheckOut(false);
      setOpenSubmitAttendanceCheckOut(true);
    }, 1000);
  }

  const onCancelCameraCheckOut = () => {
    setOpenCameraCheckOut(false);
  }

  const onOkSubmitAttendanceCheckOut = () => {
    setOpenSubmitAttendanceCheckOut(false);
    // setOpenCheckInSuccessModal(true);
  }

  const onCancelSubmitAttendanceCheckOut = () => {
    setOpenSubmitAttendanceCheckOut(false);
  }

  const onOkSuccessCheckInModal = () => {
    setOpenCheckInSuccessModal(false);
    // document.getElementById("before-checkin").style.display="none";
    // document.getElementById("before-checkout").style.display="block";
    
    var in16Hours = 2/3;
    Cookies.set("check_in_time", checkIn.time, { expires: in16Hours });
    Cookies.set("check_in_location", checkIn.location, { expires: in16Hours });
    Cookies.set("check_in_image", checkInImage, { expires: in16Hours });
  }

  const onCancelSuccessCheckInModal = () => {
    setOpenCheckInSuccessModal(false);
  }

  const onOkSuccessCheckOutModal = () => {
    setOpenCheckOutSuccessModal(false);
    // document.getElementById("before-checkout").style.display="none";
    // document.getElementById("after-checkout").style.display="block";

    var in8Hours = 8/24;
    Cookies.set("check_out_time", checkOut.time, { expires: in8Hours });
    Cookies.set("check_out_location", checkOut.location, { expires: in8Hours });
    Cookies.set("check_out_image", checkOutImage, { expires: in8Hours });
  }

  const onCancelSuccessCheckOutModal = () => {
    setLoading(false);
    setOpenCheckOutSuccessModal(false);
  }

  const onOkFailedModal = () => {
    setLoading(false);
    setOpenFailedModal(false);
  }

  const onCancelFailedModal = () => {
    setLoading(false);
    setOpenFailedModal(false);
  }
  
  // POST API Check_in Attendance
  const attendanceCheckIn = async (values) => {
      try {        
        setLoading(true);
        const form = new FormData()
        form.append("name", fileIn.name);
        form.append("photo_in", fileIn);
        form.append("geotagging_in", values.geotagging_in)

        // console.log("name: ", form.get("name"))
        // console.log("photo_in: ", form.get("photo_in"))
        // console.log("geotagging_in: ", form.get("geotagging_in"))

        // const response = await axios.post(`http://127.0.0.1:5000/api/v1/employee_attendance/check-in`, form, {
        const response = await axios.post(`http://103.82.93.38/api/v1/employee_attendance/check-in`, form, {
            headers: { 
              Authorization: token,
              ContentType: "multipart/form-data",
            }
          }
        );

        setLoading(false);
        let checkInTime = day;
        setCheckIn({time: dayjs(checkInTime).format("DD-MM-YYYY hh:mm A"), location: values.geotagging_in})

        // var in16Hours = 2/3;
        // Cookies.set("check_in_time", checkInTime, { expires: in16Hours });
        // Cookies.set("check_in_location", values.geotagging_in, { expires: in16Hours });
        // Cookies.set("check_in_image", checkInImage, { expires: in16Hours });
        // Cookies.set("check_in_image", checkInFile, { expires: in16Hours });

        setOpenCheckInSuccessModal(true);
        setOpenSubmitAttendanceCheckIn(false);
        console.log("Check In Success!");
        // console.log("response", response);
        // console.log(checkIn);
      } catch (error) {
        console.log("Error", error);
        setLoading(false)
        setOpenSubmitAttendanceCheckIn(false);
        setOpenFailedModal(true);
      } finally {
        setLoading(false)
      }
  }

  // POST API Check_out Attendance
  const attendanceCheckOut = async (values) => {
    try {
      setLoading(true);
      const form = new FormData()
      form.append("name", fileOut.name)
      form.append("photo_out", fileOut)
      form.append("geotagging_out", values.geotagging_out)

      // console.log("name", form.get("name"))
      // console.log("photo_out", form.get("photo_out"))
      // console.log("geotagging_out", form.get("geotagging_out"))

      // const response = await axios.post(`http://127.0.0.1:5000/api/v1/employee_attendance/check-out`, form,
      const response = await axios.post(`http://103.82.93.38/api/v1/employee_attendance/check-out`, form,
        {
          headers: { Authorization: token, ContentType: "multipart/form-data"},
        }
      );
      setLoading(false);
      let checkOutTime = day;
      setCheckIn({time: dayjs(checkOutTime).format("DD-MM-YYYY hh:mm A"), location: values.geotagging_in})

      // var in8Hours = 8/24;
      // Cookies.set("check_out_time", checkOutTime, { expires: in8Hours });
      // Cookies.set("check_out_location", values.geotagging_out, { expires: in8Hours });
      // Cookies.set("check_out_image", checkOutImage, { expires: in8Hours });
      // Cookies.set("check_out_image", checkOutFile, { expires: in8Hours });

      setOpenCheckOutSuccessModal(true);
      setOpenSubmitAttendanceCheckOut(false);
      console.log("Check Out Success!");
      // console.log("response", response);
      // console.log(checkOut);
    } catch (error) {
      console.log("Error", error);
      setOpenSubmitAttendanceCheckOut(false);
      setOpenFailedModal(true);
    }
  }

  const failedAttendanceCheckIn = (error) => {
    console.log("Error", error);
    setOpenSubmitAttendanceCheckIn(false);
    setIsFailedModalOpen(true);
  };

  const failedAttendanceCheckOut = (error) => {
    console.log("Error", error);
    setOpenSubmitAttendanceCheckOut(false);
    setIsFailedModalOpen(true);
  };

  if (cookies.check_in_time && !cookies.check_out_time) {
    return (
      <>
        <Spin size='large' spinning={spinning}>
          <h1>Welcome, {cookies.employee_name}</h1>
          <center>
            <div className="date-bar"> {today} </div>

            <div className='attendance' id="before-checkout" style={{ display:"block"}}>
              <center>
              {/* Image */}
              <Avatar src={cookies.check_in_image} size={100} shape='circle'/>

              <p style={{ color: "red", fontWeight: 500, }}>Shift in progress</p>

              <Flex gap={10} style={{ marginBottom: 10, }} justify='center'>
                {/* Icon */}
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
                  <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
                </svg>

                {/* Time */}
                <span> {dayjs(cookies.check_in_time).format("hh:mm A")} </span>
              </Flex>

              <Flex gap={10} style={{ marginBottom: 10, }} justify='center'>
                {/* Icon */}
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
                  <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
                </svg>

                {/* Location */}
                <span> {cookies.check_in_location} </span>
              </Flex>

              <Button className='attendance-button' onClick={startAttendanceCheckOut} loading={loading}>
                <Flex gap={10} justify='center'>
                  {/* Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M19.5 5.25H16.9012L15.6234 3.33375C15.555 3.23114 15.4623 3.147 15.3535 3.08879C15.2448 3.03057 15.1233 3.00007 15 3H9C8.87665 3.00007 8.75522 3.03057 8.64648 3.08879C8.53773 3.147 8.44502 3.23114 8.37656 3.33375L7.09781 5.25H4.5C3.90326 5.25 3.33097 5.48705 2.90901 5.90901C2.48705 6.33097 2.25 6.90326 2.25 7.5V18C2.25 18.5967 2.48705 19.169 2.90901 19.591C3.33097 20.0129 3.90326 20.25 4.5 20.25H19.5C20.0967 20.25 20.669 20.0129 21.091 19.591C21.5129 19.169 21.75 18.5967 21.75 18V7.5C21.75 6.90326 21.5129 6.33097 21.091 5.90901C20.669 5.48705 20.0967 5.25 19.5 5.25ZM20.25 18C20.25 18.1989 20.171 18.3897 20.0303 18.5303C19.8897 18.671 19.6989 18.75 19.5 18.75H4.5C4.30109 18.75 4.11032 18.671 3.96967 18.5303C3.82902 18.3897 3.75 18.1989 3.75 18V7.5C3.75 7.30109 3.82902 7.11032 3.96967 6.96967C4.11032 6.82902 4.30109 6.75 4.5 6.75H7.5C7.62351 6.75008 7.74512 6.71966 7.85405 6.66143C7.96297 6.60321 8.05583 6.51899 8.12438 6.41625L9.40125 4.5H14.5978L15.8756 6.41625C15.9442 6.51899 16.037 6.60321 16.146 6.66143C16.2549 6.71966 16.3765 6.75008 16.5 6.75H19.5C19.6989 6.75 19.8897 6.82902 20.0303 6.96967C20.171 7.11032 20.25 7.30109 20.25 7.5V18ZM12 8.25C11.1842 8.25 10.3866 8.49193 9.70827 8.94519C9.02992 9.39845 8.50121 10.0427 8.189 10.7964C7.87679 11.5502 7.7951 12.3796 7.95426 13.1797C8.11343 13.9799 8.50629 14.7149 9.08318 15.2918C9.66008 15.8687 10.3951 16.2616 11.1953 16.4207C11.9954 16.5799 12.8248 16.4982 13.5786 16.186C14.3323 15.8738 14.9766 15.3451 15.4298 14.6667C15.8831 13.9884 16.125 13.1908 16.125 12.375C16.1238 11.2814 15.6888 10.2329 14.9154 9.45955C14.1421 8.68624 13.0936 8.25124 12 8.25ZM12 15C11.4808 15 10.9733 14.846 10.5416 14.5576C10.1099 14.2692 9.7735 13.8592 9.57482 13.3795C9.37614 12.8999 9.32415 12.3721 9.42544 11.8629C9.52672 11.3537 9.77673 10.886 10.1438 10.5188C10.511 10.1517 10.9787 9.90172 11.4879 9.80044C11.9971 9.69915 12.5249 9.75114 13.0045 9.94982C13.4842 10.1485 13.8942 10.4849 14.1826 10.9166C14.471 11.3483 14.625 11.8558 14.625 12.375C14.625 13.0712 14.3484 13.7389 13.8562 14.2312C13.3639 14.7234 12.6962 15 12 15Z" fill="white"/>
                  </svg>
                  Check out
                </Flex>
              </Button>
              </center>
            </div>
          </center>

          <div className='attendance-info'>
            <p>Check in</p>        
            <Flex gap={10} style={{ marginBottom:10, }}>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
                <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
              </svg>
              {/* Time */}
              <span> {dayjs(cookies.check_in_time).format("DD-MM-YYYY hh:mm A")} </span>
            </Flex>

            <Flex gap={10}>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
                <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
              </svg>
              {/* Location */}
              <span> {cookies.check_in_location} </span>
            </Flex>
          </div>

          <div className='attendance-info'>
            <p>Check out</p>
            <Flex gap={10} style={{ marginBottom:10, }}>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
                <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
              </svg>
              {/* Time */}
              <span> - </span>
            </Flex>

            <Flex gap={10}>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
                <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
              </svg>
              {/* Location */}
              <span> - </span>
            </Flex>
          </div>

          {/* Submit Check Out */}
          <Modal centered title="Attendance" open={openSubmitAttendanceCheckOut} onOk={onOkSubmitAttendanceCheckOut} onCancel={onCancelSubmitAttendanceCheckOut} footer={<div></div>}>
            <Form
              id="check-out"
              form={form}
              name="checkOut"
              onFinish={attendanceCheckOut}
              onFinishFailed={failedAttendanceCheckOut}
            >
              <center>
                <Form.Item name="photo_out" initialValue={checkOutFile} >
                  <Avatar src={checkOutImage} shape='circle' size={100} id="photo_out" />
                </Form.Item>
                <Form.Item name="geotagging_out" initialValue={checkOut.location}>
                  <Input placeholder='Input your location' suffix={<GrLocation />} style={{ marginTop: 20, marginBottom: 20, }} />
                </Form.Item>
                <Button className='attendance-button' htmlType='submit' style={{ width: "100%", }} loading={loading}>
                  Submit
                </Button>
              </center>
            </Form>
          </Modal>

          {/* Check Out Modals */}
          <AttendanceModals
            loading={loading}
            spinning={spinning}
            formName="Check out"
            photo="photo_out"
            geotagging="geotagging_out"
            openEnableLocation={openEnableLocationCheckOut}
            onOkEnableLocation={onOkEnableLocationCheckOut}
            onCancelEnableLocation={onCancelEnableLocationCheckOut}
            openAddPhoto={openAddPhotoCheckOut}
            onOkAddPhoto={onOkAddPhotoCheckOut}
            onCancelAddPhoto={onCancelAddPhotoCheckOut}
            webcamRef={webcamRefOut}
            openCamera={openCameraCheckOut}
            onOkCamera={onOkCameraCheckOut}
            onCancelCamera={onCancelCameraCheckOut}
            imageSrc={checkOutImage}
            userLocation={checkOut.location}
            openSubmitAttendance={openSubmitAttendanceCheckOut}
            onFinish={attendanceCheckOut}
            onFinishFailed={failedAttendanceCheckIn}
            // onOkSubmitAttendance={onOkSubmitAttendanceCheckOut}
            onCancelSubmitAttendance={onCancelSubmitAttendanceCheckOut}
          />

          <SuccessModal 
          action="Check out" 
          isModalOpen={openCheckOutSuccessModal} 
          handleOk={onOkSuccessCheckOutModal} 
          handleCancel={onCancelSuccessCheckOutModal} 
          additional={
            <>
            <Flex gap={10} justify='center'>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
                <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
              </svg>
              {/* Time */}
              <span> {checkOut.time} </span>
            </Flex>

            <Flex gap={10} justify='center'>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
                <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
              </svg>
              {/* Location */}
                <span> {checkOut.location} </span>
            </Flex>
            </> 
          } />

          <FailedModal 
            isModalOpen={openFailedModal}
            handleOk={onOkFailedModal}
            handleCancel={onCancelFailedModal}
          />
        </Spin>
      </>
    )
  } else if (cookies.check_out_time && cookies.check_in_time) {
    const totalHours = (date_out, date_in) => {
      const totalInSec = dayjs(date_out).diff(date_in, "s", true);
      const total_hours = totalInSec/3600;
      const total_minutes = (totalInSec%3600)/60;
      const total_second = totalInSec%60;
      return Math.floor(total_hours)+":"+Math.floor(total_minutes)+":"+total_second;
      // return totalInSec;
    }

    return (
      <>
        <Spin size='large' spinning={spinning}>
          <h1>Welcome, {cookies.employee_name}</h1>
          <center>
            <div className="date-bar"> {today} </div>

            <div className='attendance' id="after-checkout"  style={{ display:"block"}}>
            <center>
              {/* Image */}
              {/* <Avatar src={cookies.check_out_image} size={100} shape='circle'/> */}
              <Image src={DoneAttendance} preview={false} width={100} />
              <p style={{ fontWeight: "bold", color: "black", }}>Checked out successfully!</p>

              <div>
                <p style={{ fontSize: "1em", marginBottom: 10, }}>see you next day</p>

                <table style={{ margin: 0, }}>
                  <tbody>
                  <tr>
                    <td style={{ padding: 10, }}>Total Hours</td>
                    <td></td>
                    <td style={{ color: "#629093", fontWeight: 500, }}>{totalHours(cookies.check_out_time, cookies.check_in_time)}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 10, }}>Overtimes</td>
                    <td></td>
                    <td style={{ color: "red", fontWeight: 500, }}>00:00:00</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </center>
            </div>
          </center>

          <div className='attendance-info'>
            <p>Check in</p>        
            <Flex gap={10} style={{ marginBottom:10, }}>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
                <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
              </svg>
              {/* Time */}
              <span> {dayjs(cookies.check_in_time).format("DD-MM-YYYY hh:mm A")} </span>
            </Flex>

            <Flex gap={10}>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
                <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
              </svg>
              {/* Location */}
              <span> {cookies.check_in_location} </span>
            </Flex>
          </div>

          <div className='attendance-info'>
            <p>Check out</p>
            <Flex gap={10} style={{ marginBottom:10, }}>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
                <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
              </svg>
              {/* Time */}
              <span> {dayjs(cookies.check_out_time).format("DD-MM-YYYY hh:mm A")} </span>
            </Flex>

            <Flex gap={10}>
              {/* Icon */}
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
                <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
              </svg>
              {/* Location */}
              <span> {cookies.check_out_location} </span>
            </Flex>
          </div>
        </Spin>
      </>
    )
  }

  return (
    <>
      <Spin size='large' spinning={spinning}>
      <h1>Welcome, {cookies.employee_name}</h1>
      <center>
        <div className="date-bar"> {today} </div>

          <div className='attendance' id="before-checkin" style={{ display:"block"}}>
            <center>
              {/* Image */}
              <Image src={StartAttendance} preview={false} width={230} />

              <p>Start my attendance today</p>

              <Button className='attendance-button' onClick={startAttendanceCheckIn} loading={loading}>
                <Flex gap={10} justify='center'>
                  {/* Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 5.25H16.9012L15.6234 3.33375C15.555 3.23114 15.4623 3.147 15.3535 3.08879C15.2448 3.03057 15.1233 3.00007 15 3H9C8.87665 3.00007 8.75522 3.03057 8.64648 3.08879C8.53773 3.147 8.44502 3.23114 8.37656 3.33375L7.09781 5.25H4.5C3.90326 5.25 3.33097 5.48705 2.90901 5.90901C2.48705 6.33097 2.25 6.90326 2.25 7.5V18C2.25 18.5967 2.48705 19.169 2.90901 19.591C3.33097 20.0129 3.90326 20.25 4.5 20.25H19.5C20.0967 20.25 20.669 20.0129 21.091 19.591C21.5129 19.169 21.75 18.5967 21.75 18V7.5C21.75 6.90326 21.5129 6.33097 21.091 5.90901C20.669 5.48705 20.0967 5.25 19.5 5.25ZM20.25 18C20.25 18.1989 20.171 18.3897 20.0303 18.5303C19.8897 18.671 19.6989 18.75 19.5 18.75H4.5C4.30109 18.75 4.11032 18.671 3.96967 18.5303C3.82902 18.3897 3.75 18.1989 3.75 18V7.5C3.75 7.30109 3.82902 7.11032 3.96967 6.96967C4.11032 6.82902 4.30109 6.75 4.5 6.75H7.5C7.62351 6.75008 7.74512 6.71966 7.85405 6.66143C7.96297 6.60321 8.05583 6.51899 8.12438 6.41625L9.40125 4.5H14.5978L15.8756 6.41625C15.9442 6.51899 16.037 6.60321 16.146 6.66143C16.2549 6.71966 16.3765 6.75008 16.5 6.75H19.5C19.6989 6.75 19.8897 6.82902 20.0303 6.96967C20.171 7.11032 20.25 7.30109 20.25 7.5V18ZM12 8.25C11.1842 8.25 10.3866 8.49193 9.70827 8.94519C9.02992 9.39845 8.50121 10.0427 8.189 10.7964C7.87679 11.5502 7.7951 12.3796 7.95426 13.1797C8.11343 13.9799 8.50629 14.7149 9.08318 15.2918C9.66008 15.8687 10.3951 16.2616 11.1953 16.4207C11.9954 16.5799 12.8248 16.4982 13.5786 16.186C14.3323 15.8738 14.9766 15.3451 15.4298 14.6667C15.8831 13.9884 16.125 13.1908 16.125 12.375C16.1238 11.2814 15.6888 10.2329 14.9154 9.45955C14.1421 8.68624 13.0936 8.25124 12 8.25ZM12 15C11.4808 15 10.9733 14.846 10.5416 14.5576C10.1099 14.2692 9.7735 13.8592 9.57482 13.3795C9.37614 12.8999 9.32415 12.3721 9.42544 11.8629C9.52672 11.3537 9.77673 10.886 10.1438 10.5188C10.511 10.1517 10.9787 9.90172 11.4879 9.80044C11.9971 9.69915 12.5249 9.75114 13.0045 9.94982C13.4842 10.1485 13.8942 10.4849 14.1826 10.9166C14.471 11.3483 14.625 11.8558 14.625 12.375C14.625 13.0712 14.3484 13.7389 13.8562 14.2312C13.3639 14.7234 12.6962 15 12 15Z" fill="white"/>
                  </svg>
                  Check in
                </Flex>
              </Button>
            </center>
          </div>
      </center>

      <div className='attendance-info'>
        <p>Check in</p>
        
        <Flex gap={10} style={{ marginBottom:10, }}>
          {/* Icon */}
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
            <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
          </svg>

          {/* Time */}
          <span> - </span>
        </Flex>

        <Flex gap={10}>
          {/* Icon */}
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
            <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
          </svg>

          {/* Location */}
          <span> - </span>
        </Flex>
      </div>

      <div className='attendance-info'>
        <p>Check out</p>

        <Flex gap={10} style={{ marginBottom:10, }}>
          {/* Icon */}
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
            <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
          </svg>

          {/* Time */}
          <span> - </span>
        </Flex>

        <Flex gap={10}>
          {/* Icon */}
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
            <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
          </svg>

          {/* Location */}
          <span> - </span>
        </Flex>
      </div>

      {/* Submit Check In */}
      <Modal centered title="Attendance" open={openSubmitAttendanceCheckIn} onOk={onOkSubmitAttendanceCheckIn} onCancel={onCancelSubmitAttendanceCheckIn} footer={<div></div>}>
        <Form
          id="check-in"
          form={form}
          name="checkIn"
          onFinish={attendanceCheckIn}
          onFinishFailed={failedAttendanceCheckIn}
          >
          <center>
            <Form.Item name="photo_in" initialValue={checkInFile} >
              <Avatar src={checkInImage} shape='circle' size={100} id="photo_in" />
            </Form.Item>

            <Form.Item name="geotagging_in" initialValue={checkIn.location} >
              <Input placeholder='Input your location' suffix={<GrLocation />} style={{ marginTop: 20, marginBottom: 20, }} />
            </Form.Item>

            <Button className='attendance-button' htmlType='submit' style={{ width: "100%", }} loading={loading}>
              Submit
            </Button>
          </center>
        </Form>
      </Modal>

      {/* Check In Modals */}
      <AttendanceModals
        loading={loading}
        spinning={spinning}
        formId="attendance-form"
        formName="checkIn"
        photo="photo_in"
        geotagging="geotagging_in"
        openEnableLocation={openEnableLocationCheckIn}
        onOkEnableLocation={onOkEnableLocationCheckIn}
        onCancelEnableLocation={onCancelEnableLocationCheckIn}
        openAddPhoto={openAddPhotoCheckIn}
        onOkAddPhoto={onOkAddPhotoCheckIn}
        onCancelAddPhoto={onCancelAddPhotoCheckIn}
        webcamRef={webcamRefIn}
        openCamera={openCameraCheckIn}
        onOkCamera={onOkCameraCheckIn}
        onCancelCamera={onCancelCameraCheckIn}
        imageSrc={checkInImage}
        userLocation={checkIn.location}
        openSubmitAttendance={openSubmitAttendanceCheckIn}
        onFinish={attendanceCheckIn}
        onFinishFailed={failedAttendanceCheckIn}
        // onOkSubmitAttendance={onOkSubmitAttendanceCheckIn}
        onCancelSubmitAttendance={onCancelSubmitAttendanceCheckIn}
      />

      <SuccessModal 
      action="Check in" 
      isModalOpen={openCheckInSuccessModal} 
      handleOk={onOkSuccessCheckInModal} 
      handleCancel={onCancelSuccessCheckInModal} 
      additional={
        <>
        <Flex gap={10} justify='center'>
          {/* Icon */}
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3.47917C10.8177 3.47917 10.6428 3.5516 10.5139 3.68054C10.3849 3.80947 10.3125 3.98434 10.3125 4.16667C10.3125 4.34901 10.3849 4.52388 10.5139 4.65281C10.6428 4.78174 10.8177 4.85417 11 4.85417C11.8727 4.85417 12.7369 5.02607 13.5433 5.36006C14.3496 5.69404 15.0822 6.18357 15.6993 6.80069C16.3164 7.41781 16.806 8.15045 17.1399 8.95676C17.4739 9.76306 17.6458 10.6273 17.6458 11.5C17.6458 12.3727 17.4739 13.2369 17.1399 14.0433C16.806 14.8496 16.3164 15.5822 15.6993 16.1993C15.0822 16.8164 14.3496 17.306 13.5433 17.64C12.7369 17.9739 11.8727 18.1458 11 18.1458C10.8177 18.1458 10.6428 18.2183 10.5139 18.3472C10.3849 18.4761 10.3125 18.651 10.3125 18.8333C10.3125 19.0157 10.3849 19.1905 10.5139 19.3195C10.6428 19.4484 10.8177 19.5208 11 19.5208C13.1273 19.5208 15.1674 18.6758 16.6716 17.1716C18.1758 15.6674 19.0208 13.6273 19.0208 11.5C19.0208 9.37275 18.1758 7.33262 16.6716 5.82842C15.1674 4.32422 13.1273 3.47917 11 3.47917Z" fill="#888888"/>
            <path d="M9.59749 9.23584C9.47605 9.10551 9.40994 8.93313 9.41308 8.75502C9.41622 8.57691 9.48837 8.40698 9.61434 8.28102C9.7403 8.15505 9.91023 8.0829 10.0883 8.07976C10.2665 8.07662 10.4388 8.14273 10.5692 8.26417L13.3192 11.0142C13.4479 11.1431 13.5202 11.3178 13.5202 11.5C13.5202 11.6822 13.4479 11.8569 13.3192 11.9858L10.5692 14.7358C10.5062 14.8034 10.4303 14.8576 10.346 14.8951C10.2617 14.9327 10.1706 14.9529 10.0783 14.9545C9.98599 14.9562 9.8943 14.9392 9.80869 14.9046C9.72309 14.87 9.64532 14.8186 9.58004 14.7533C9.51475 14.688 9.46329 14.6102 9.42871 14.5246C9.39413 14.439 9.37715 14.3473 9.37878 14.255C9.38041 14.1627 9.40061 14.0717 9.43819 13.9873C9.47577 13.903 9.52994 13.8271 9.59749 13.7642L11.1742 12.1875H3.66666C3.48432 12.1875 3.30945 12.1151 3.18052 11.9861C3.05159 11.8572 2.97916 11.6823 2.97916 11.5C2.97916 11.3177 3.05159 11.1428 3.18052 11.0139C3.30945 10.8849 3.48432 10.8125 3.66666 10.8125H11.1742L9.59749 9.23584Z" fill="#888888"/>
          </svg>

          {/* Time */}
          <span> {checkIn.time} </span>
        </Flex>

        <Flex gap={10} justify='center'>
          {/* Icon */}
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 12.875C10.3201 12.875 9.65552 12.6734 9.09023 12.2957C8.52494 11.918 8.08434 11.3811 7.82417 10.753C7.56399 10.1249 7.49592 9.43369 7.62855 8.76688C7.76119 8.10007 8.08858 7.48757 8.56932 7.00682C9.05007 6.52608 9.66257 6.19869 10.3294 6.06605C10.9962 5.93342 11.6874 6.00149 12.3155 6.26167C12.9436 6.52184 13.4805 6.96244 13.8582 7.52773C14.2359 8.09302 14.4375 8.75763 14.4375 9.4375C14.4364 10.3488 14.0739 11.2226 13.4295 11.867C12.7851 12.5114 11.9113 12.8739 11 12.875ZM11 7.375C10.5921 7.375 10.1933 7.49597 9.85414 7.7226C9.51496 7.94923 9.25061 8.27134 9.0945 8.64822C8.93839 9.02509 8.89755 9.43979 8.97713 9.83988C9.05671 10.24 9.25315 10.6075 9.54159 10.8959C9.83004 11.1844 10.1975 11.3808 10.5976 11.4604C10.9977 11.54 11.4124 11.4991 11.7893 11.343C12.1662 11.1869 12.4883 10.9225 12.7149 10.5834C12.9415 10.2442 13.0625 9.84543 13.0625 9.4375C13.062 8.89066 12.8445 8.36637 12.4578 7.9797C12.0711 7.59302 11.5468 7.37555 11 7.375Z" fill="#888888"/>
            <path d="M11 21.125L5.20026 14.2851C5.11967 14.1824 5.03992 14.079 4.96101 13.975C3.97031 12.67 3.43511 11.076 3.43751 9.4375C3.43751 7.4318 4.23427 5.50825 5.65251 4.09001C7.07076 2.67176 8.99431 1.875 11 1.875C13.0057 1.875 14.9293 2.67176 16.3475 4.09001C17.7657 5.50825 18.5625 7.4318 18.5625 9.4375C18.5649 11.0752 18.03 12.6685 17.0397 13.9729L17.039 13.975C17.039 13.975 16.8328 14.2459 16.8018 14.2823L11 21.125ZM6.05826 13.1466C6.05963 13.1466 6.21913 13.3583 6.25557 13.4037L11 18.9993L15.7506 13.3961C15.7809 13.3583 15.9418 13.1452 15.9424 13.1445C16.7517 12.0783 17.1891 10.7761 17.1875 9.4375C17.1875 7.79647 16.5356 6.22266 15.3752 5.06228C14.2148 3.9019 12.641 3.25 11 3.25C9.35898 3.25 7.78517 3.9019 6.62478 5.06228C5.4644 6.22266 4.81251 7.79647 4.81251 9.4375C4.81107 10.7769 5.24823 12.0798 6.05826 13.1466Z" fill="#888888"/>
          </svg>

          {/* Location */}
          <span> {checkIn.location} </span>
        </Flex>
        </>
      } />

      <FailedModal 
        isModalOpen={openFailedModal}
        handleOk={onOkFailedModal}
        handleCancel={onCancelFailedModal}
      />
      </Spin>
    </>
  )
}

export default AttendanceConfiguration