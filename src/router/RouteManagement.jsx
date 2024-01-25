import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";
import LayoutComponent from "../components/layouts/LayoutComponent";
import MainCompanyConfiguration from "../pages/superAdmin/companyConfiguration/mainCompanyConfiguration/MainCompanyConfiguration";
import AddCompanyConfiguration from "../pages/superAdmin/companyConfiguration/addCompanyConfiguration/AddCompanyConfiguration";
import DetailCompanyConfiguration from "../pages/superAdmin/companyConfiguration/detailCompanyConfiguration/DetailCompanyConfiguration";
import EditCompanyConfiguration from "../pages/superAdmin/companyConfiguration/editCompanyConfiguration/EditCompanyConfiguration";
import AdminDetailCompanyConfiguration from "../pages/admin/companyConfiguration/detailCompanyConfiguration/AdminDetailCompanyConfiguration";
import AdminEditCompanyConfiguration from "../pages/admin/companyConfiguration/editCompanyConfiguration/AdminEditCompanyConfiguration";
import UserConfiguration from "../pages/admin/userConfiguration/UserConfiguration";
import RoleConfig from "../pages/superAdmin/roleConfig/RoleConfig";
import RoleConfigDetail from "../pages/superAdmin/roleConfig/detailRole/RoleConfigDetail";
import PositionConfiguration from "../pages/admin/positionConfiguration/PositionConfiguration";
import DivisionConfiguration from "../pages/admin/divisionConfiguration/DivisionConfiguration";
import MainEmployeeConfiguration from "../pages/admin/employeeConfiguration/mainEmployeeConfiguration/MainEmployeeConfiguration";
import DetailEmployeeConfiguration from "../pages/admin/employeeConfiguration/detailEmployeeConfiguration/DetailEmployeeConfiguration";
import AddEmployee from "../pages/admin/employeeConfiguration/addEmployee/AddEmployee";
import AddUser from "../pages/admin/userConfiguration/addUser/AddUser";
import SuperAdminAddUser from "../pages/superAdmin/userConfiguration/addUser/AddUser";
import Cookies from "js-cookie";
import DashboardPage from "../pages/superAdmin/dashboardPage/DashboardPage";
import AdminRoleConfig from "../pages/admin/roleConfig/AdminRoleConfig";
import AdminRoleConfigDetail from "../pages/admin/roleConfig/detailRole/AdminRoleConfigDetail";
import OfficialTravelMain from "../pages/employee/schemas/approvalConfiguration/officialTravel/OfficialTravelMain";
import OfficialTravelDetail from "../pages/employee/schemas/approvalConfiguration/officialTravel/OfficialTravelDetail";
import LeaveMain from "../pages/employee/schemas/approvalConfiguration/leave/LeaveMain";
import LeaveDetail from "../pages/employee/schemas/approvalConfiguration/leave/LeaveDetail";
import OvertimeMain from "../pages/employee/schemas/approvalConfiguration/overtime/OvertimeMain";
import OvertimeDetail from "../pages/employee/schemas/approvalConfiguration/overtime/OvertimeDetail";
import PermitMain from "../pages/employee/schemas/approvalConfiguration/permit/PermitMain";
import PermitDetail from "../pages/employee/schemas/approvalConfiguration/permit/PermitDetail";
import OfficialTravelEmployee from "../pages/employee/schemas/permitConfiguration/officialTravelEmployee/OfficialTravelEmployee";
import AddOfficialTravelEmployee from "../pages/employee/schemas/permitConfiguration/officialTravelEmployee/addOfficialTravelEmployee/AddOfficialTravelEmployee";
import LeaveEmployee from "../pages/employee/schemas/permitConfiguration/leaveEmployee/LeaveEmployee";
import AddLeaveEmployee from "../pages/employee/schemas/permitConfiguration/leaveEmployee/addLeaveEmployee/AddLeaveEmployee";
import PermitEmployee from "../pages/employee/schemas/permitConfiguration/permitEmployee/PermitEmployee";
import AddPermitEmployee from "../pages/employee/schemas/permitConfiguration/permitEmployee/addPermitEmployee/AddPermitEmployee";
import OvertimeEmployee from "../pages/employee/schemas/permitConfiguration/overtimeEmployee/OvertimeEmployee";
import AddOvertimeEmployee from "../pages/employee/schemas/permitConfiguration/overtimeEmployee/addOvertimeEmployee/AddOvertimeEmployee";
import HistoryConfiguration from "../pages/employee/schemas/historyConfiguration/HistoryConfiguration";
import ReportConfiguration from "../pages/employee/schemas/attendanceReport/reportConfiguration/ReportConfiguartion";
import AttendanceDetails from "../pages/employee/schemas/attendanceReport/attendanceDetails/AttendanceDetails";
import PresentConfiguration from "../pages/employee/schemas/attendanceReport/presentConfiguration/PresentConfiguration";
import DetailLeaveData from "../pages/employee/schemas/permitConfiguration/leaveEmployee/detailLeaveEmployee/DetailLeaveData";
import DetailOvertimeData from "../pages/employee/schemas/permitConfiguration/overtimeEmployee/detailOvertimeEmployee/DetailOvertimeData";
import DetailPermitData from "../pages/employee/schemas/permitConfiguration/permitEmployee/detailPermitEmployee/DetailPermitData";
import AttendanceConfiguration from '../pages/employee/schemas/attendanceConfiguration/AttendanceConfiguration'
import MainClientConfiguration from "../pages/admin/clientConfiguration/mainClientConfiguration/MainClientConfiguration";
import AddClientConfiguration from "../pages/admin/clientConfiguration/addClientConfiguration/AddClientConfiguration";
import DetailClientConfiguration from "../pages/admin/clientConfiguration/detailClientConfiguration/DetailClientConfiguration";
import EditClientConfiguration from "../pages/admin/clientConfiguration/editClientConfiguration/EditClientConfiguration";
import MainTeamProjectConfiguration from "../pages/admin/teamProjectConfiguration/mainTeamProjectConfiguration/MainTeamProjectConfiguration";
import AddTeamProjectConfiguration from "../pages/admin/teamProjectConfiguration/addTeamProjectConfiguration/AddTeamProjectConfiguration.";
import DetailTeamProjectConfiguration from "../pages/admin/teamProjectConfiguration/detailTeamProjectConfiguration/DetailTeamProjectConfiguration";
import AddMemberTeamProjectConfiguration from "../pages/admin/teamProjectConfiguration/addMemberTeamProjectConfiguration/AddMemberTeamProjectConfiguration";
import TaskMain from "../pages/employee/schemas/taskConfiguration/taskMain/TaskMain";
import TaskAdd from "../pages/employee/schemas/taskConfiguration/taskAdd/TaskAdd";
import TaskDetail from "../pages/employee/schemas/taskConfiguration/taskDetail/TaskDetail";
import ProjectConfiguration from "../pages/admin/projectConfiguration/ProjectConfiguration";
import AddProject from "../pages/admin/projectConfiguration/addProject/AddProject";
import DetailProject from "../pages/admin/projectConfiguration/detailProject/DetailProject";
import EditProject from "../pages/admin/projectConfiguration/editProject/EditProject";
import TypeProjectConfiguration from "../pages/admin/typeProjectConfiguration/TypeProjectConfiguration";
import TaskReport from "../pages/employee/schemas/taskReport/TaskReport";
import DetailOfficialTravelData from "../pages/employee/schemas/permitConfiguration/officialTravelEmployee/detailOfficialTravelEmployee/DetailOfficialTravelData";

const RouteManagement = () => {
  const token = Cookies.get("token");
  const role_name = Cookies.get("role_name");
  const navigate = useNavigate();
  let roleNumber;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (role_name === "superadmin") {
    roleNumber = 1;
  } else if (role_name === "admin") {
    roleNumber = 2;
  } else if (role_name === "HR") {
    roleNumber = 3;
  } else if (role_name === "Head of Division") {
    roleNumber = 4;
  } else {
    roleNumber = 5;
  }

  if (roleNumber === 1) {
    // Routing untuk Super Admin
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <React.Fragment>
            <Route
              path="/dashboard"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DashboardPage />
                </LayoutComponent>
              }
            />

            {/* Super Admin Company Configuration Route */}
            <Route
              path="/company"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <MainCompanyConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/add-company"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddCompanyConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/detail-company/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailCompanyConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/edit-company/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <EditCompanyConfiguration />
                </LayoutComponent>
              }
            />
            {/* Super Admin End of Company Configuration Route */}

            <Route
              path="/user"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <UserConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/add-user/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <SuperAdminAddUser />
                </LayoutComponent>
              }
            />
            <Route
              path="/role"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <RoleConfig />
                </LayoutComponent>
              }
            />
            <Route
              path="/role/detail-role/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <RoleConfigDetail />
                </LayoutComponent>
              }
            />
          </React.Fragment>
        </Routes>
      </Suspense>
    );
  } else if (roleNumber === 2) {
    // Routing untuk Admin
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <React.Fragment>
            <Route
              path="/dashboard"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DashboardPage />
                </LayoutComponent>
              }
            />

            {/* Company Configuration Route */}
            <Route
              path="/company"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AdminDetailCompanyConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/edit-company/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AdminEditCompanyConfiguration />
                </LayoutComponent>
              }
            />
            {/* End of Company Configuration Route */}

            {/* Employee Configuration Route */}
            <Route
              path="/employee"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <MainEmployeeConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/employee/detail-employee/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailEmployeeConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/employee/add-employee"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddEmployee />
                </LayoutComponent>
              }
            />
            {/* End of Employee Configuration Route */}

            {/* User Configuration Route */}
            <Route
              path="/user"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <UserConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path='/employee/add-user/:uuid'
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddUser />
                </LayoutComponent>
              }
            />
            {/* End of User Configuration Route */}

            {/* Division Configuration Route */}
            <Route
              path="/division"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DivisionConfiguration />
                </LayoutComponent>
              }
            />
            {/* End of Division Configuration Route */}

            {/* Role Configuration Route */}
            <Route
              path="/role"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AdminRoleConfig />
                </LayoutComponent>
              }
            />
            <Route
              path="/role/detail-role/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AdminRoleConfigDetail />
                </LayoutComponent>
              }
            />
            {/* End of Role Configuration Route */}

            {/* Position Configuration Route */}
            <Route
              path="/position"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PositionConfiguration />
                </LayoutComponent>
              }
            />
            {/* End of Position Configuration Route */}

            {/* Client Configuration Route */}
            <Route
              path="/client"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <MainClientConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/client/detail-client/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailClientConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/client/add-client"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddClientConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/client/edit-client/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <EditClientConfiguration />
                </LayoutComponent>
              }
            />
      
            {/* End of Configuration Route */}

            {/* Team Project Configuration Route */}
            <Route
              path="/team-project"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <MainTeamProjectConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/team-project/add-team-project"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddTeamProjectConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/team-project/detail-team-project/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailTeamProjectConfiguration/>
                </LayoutComponent>
              }
            />

            <Route
              path="/team-project/add-member-team-project/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddMemberTeamProjectConfiguration />
                </LayoutComponent>
              }
            />

            {/* End of Team Project Configuration Route */}

            {/* Project Configuration Route */}
            <Route
              path="/project"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <ProjectConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/add-project"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddProject />
                </LayoutComponent>
              }
            />
            <Route
              path="/project/detail-project/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailProject />
                </LayoutComponent>
              }
            />
            <Route
              path="/edit-project/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <EditProject />
                </LayoutComponent>
              }
            />
            {/* End of Project Configuration Route */}

            {/* Type Project Configuration Route */}
            <Route
              path="/type-project"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <TypeProjectConfiguration />
                </LayoutComponent>
              }
            />
            {/* End of Type Project Configuration Route */}
          </React.Fragment>
        </Routes>
      </Suspense>
    );
  } else if (roleNumber === 3) {
    
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <React.Fragment>
            {/* Attendance Configuration Route */}
            <Route
              path="/attendance"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AttendanceConfiguration />
                </LayoutComponent>
              }
            />

            {/* History Configuration Route */}
            <Route
              path="/history"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <HistoryConfiguration />
                </LayoutComponent>
              }
            />

            {/* Attendance Report Configuration Route */}
            <Route
              path="/attendance-report"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <ReportConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/present"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PresentConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/present/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AttendanceDetails />
                </LayoutComponent>
              }
            />

            <Route
              path="/report"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <ReportConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/report/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AttendanceDetails />
                </LayoutComponent>
              }
            />

            {/* Permit Configuration Route */}
            <Route
              path="/official-travel"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OfficialTravelEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/official-travel/official-travel-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddOfficialTravelEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/official-travel/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailOfficialTravelData />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <LeaveEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave/leave-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddLeaveEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailLeaveData />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OvertimeEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime/overtime-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddOvertimeEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailOvertimeData />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PermitEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit/permit-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddPermitEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailPermitData />
                </LayoutComponent>
              }
            />

            {/* Permit Request Configuration Route */}
            <Route
              path="/official-travel-request"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OfficialTravelMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/official-travel-request/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OfficialTravelDetail />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave-request"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <LeaveMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave-request/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <LeaveDetail />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime-request"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OvertimeMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime-request/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OvertimeDetail />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit-request"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PermitMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit-request/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PermitDetail />
                </LayoutComponent>
              }
            />
          </React.Fragment>
        </Routes>
      </Suspense>
    );
  } else if (roleNumber === 4 ) {
    // Routing untuk Team Leader
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <React.Fragment>
            {/* Attendance Configuration Route */}
            <Route
              path="/attendance"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AttendanceConfiguration />
                </LayoutComponent>
              }
            />

            {/* History Configuration Route */}
            <Route
              path="/history"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <HistoryConfiguration />
                </LayoutComponent>
              }
            />

            {/* Attendance Report Configuration Route */}
            <Route
              path="/attendance-report"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <ReportConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/present"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PresentConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/present/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AttendanceDetails />
                </LayoutComponent>
              }
            />

            <Route
              path="/report"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <ReportConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/report/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AttendanceDetails />
                </LayoutComponent>
              }
            />

            {/* Permit Configuration Route */}
            <Route
              path="/official-travel"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OfficialTravelEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/official-travel/official-travel-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddOfficialTravelEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/official-travel/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailOfficialTravelData />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <LeaveEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave/leave-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddLeaveEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailLeaveData />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OvertimeEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime/overtime-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddOvertimeEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailOvertimeData />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PermitEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit/permit-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddPermitEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailPermitData />
                </LayoutComponent>
              }
            />

            {/* Permit Request Configuration Route */}
            <Route
              path="/official-travel-request"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OfficialTravelMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/official-travel-request/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OfficialTravelDetail />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave-request"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <LeaveMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave-request/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <LeaveDetail />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime-request"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OvertimeMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime-request/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OvertimeDetail />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit-request"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PermitMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit-request/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PermitDetail />
                </LayoutComponent>
              }
            />

            {/* Task Management Configuration Route */}
            <Route
              path="/project-report"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <p>Project Report</p>
                </LayoutComponent>
              }
            />

            <Route
              path="/task"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <TaskMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/task/add-task"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <TaskAdd />
                </LayoutComponent>
              }
            />

            <Route
              path="/task/detail-task/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <TaskDetail />
                </LayoutComponent>
              }
            />

            {/* End of Task Management Configuration Route */}
          </React.Fragment>
        </Routes>
      </Suspense>
    );
  } else {
    // Routing untuk Employee
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <React.Fragment>
            {/* Attendance Configuration Route */}
            <Route
              path="/attendance"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <p>Attendance</p>
                </LayoutComponent>
              }
            />

            {/* History Configuration Route */}
            <Route
              path="/history"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <HistoryConfiguration />
                </LayoutComponent>
              }
            />

            {/* Attendance Report Configuration Route */}
            <Route
              path="/attendance-report"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <p>Attendance Report</p>
                </LayoutComponent>
              }
            />

            <Route
              path="/present"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PresentConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/present/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AttendanceDetails />
                </LayoutComponent>
              }
            />

            <Route
              path="/report"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <ReportConfiguration />
                </LayoutComponent>
              }
            />

            <Route
              path="/report/detail"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AttendanceDetails />
                </LayoutComponent>
              }
            />

            {/* Permit Configuration Route */}
            <Route
              path="/official-travel"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OfficialTravelEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/official-travel/official-travel-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddOfficialTravelEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/official-travel/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailOfficialTravelData />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <LeaveEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave/leave-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddLeaveEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/leave/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailLeaveData />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <OvertimeEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime/overtime-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddOvertimeEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/overtime/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailOvertimeData />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <PermitEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit/permit-requested"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <AddPermitEmployee />
                </LayoutComponent>
              }
            />

            <Route
              path="/permit/detail/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <DetailPermitData />
                </LayoutComponent>
              }
            />

            {/* End of Permit Configuration Route */}

            {/* Task Management Configuration Route */}
            <Route
              path="/task"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <TaskMain />
                </LayoutComponent>
              }
            />

            <Route
              path="/task/add-task"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <TaskAdd />
                </LayoutComponent>
              }
            />

            <Route
              path="/task/detail-task/:uuid"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <TaskDetail />
                </LayoutComponent>
              }
            />

            <Route
              path="task-report"
              element={
                <LayoutComponent roleNumber={roleNumber}>
                  <TaskReport />
                </LayoutComponent>
              }
            />
            {/* End of Task Management Configuration Route */}
          </React.Fragment>
        </Routes>
      </Suspense>
    );
  }
};

export default RouteManagement;
