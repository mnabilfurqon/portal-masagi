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
import Cookies from "js-cookie";
import DashboardPage from "../pages/superAdmin/dashboardPage/DashboardPage";
import AdminRoleConfig from "../pages/admin/roleConfig/AdminRoleConfig";
import AdminRoleConfigDetail from "../pages/admin/roleConfig/detailRole/AdminRoleConfigDetail";

const RouteManagement = () => {
  const token = Cookies.get("token");
  const role_id = Cookies.get("role_id");
  const navigate = useNavigate();
  let isSuperAdmin = false;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (role_id === "1") {
    isSuperAdmin = true;
  }

  if (isSuperAdmin) {
    // Routing untuk Super Admin
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <React.Fragment>
            <Route
              path="/dashboard"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={true}>
                  <DashboardPage />
                </LayoutComponent>
              }
            />

            {/* Super Admin Company Configuration Route */}
            <Route
              path="/company"
              element={
                <LayoutComponent isSuperAdmin={true}>
                  <MainCompanyConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/add-company"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={true}>
                  <AddCompanyConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/detail-company/:uuid"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={true}>
                  <DetailCompanyConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/edit-company/:uuid"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={true}>
                  <EditCompanyConfiguration />
                </LayoutComponent>
              }
            />
            {/* Super Admin End of Company Configuration Route */}

            <Route
              path="/user"
              element={
                <LayoutComponent isSuperAdmin={true}>
                  <UserConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/role"
              element={
                <LayoutComponent isSuperAdmin={true}>
                  <RoleConfig />
                </LayoutComponent>
              }
            />
            <Route
              path="/role/detail-role/:uuid"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={true}>
                  <RoleConfigDetail />
                </LayoutComponent>
              }
            />
          </React.Fragment>
        </Routes>
      </Suspense>
    );
  } else {
    // Routing untuk Admin
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
              <React.Fragment>
                <Route
                  path="/dashboard"
                  element={
                    <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                      <DashboardPage/>
                    </LayoutComponent>
                  }
                />
                
                {/* Company Configuration Route */}
                <Route
                  path="/company"
                  element={
                    <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                      <AdminDetailCompanyConfiguration />
                    </LayoutComponent>
                  }
                />
                <Route
                  path="/company/edit-company/:uuid"
                  element={
                    <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                      <AdminEditCompanyConfiguration />
                    </LayoutComponent>
                  }
                />
                {/* End of Company Configuration Route */}
              
                {/* Employee Configuration Route */}
                <Route
                  path="/employee"
                  element={
                    <LayoutComponent isSuperAdmin={false}>
                      <MainEmployeeConfiguration />
                    </LayoutComponent>
                  }
                />
                <Route
                path="/employee/detail-employee"
                element={
                  <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                    <DetailEmployeeConfiguration />
                  </LayoutComponent>
                }
                />
                <Route
                path="/employee/add-employee"
                element={
                  <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                    <AddEmployee />
                  </LayoutComponent>
                }
                />
                {/* End of Employee Configuration Route */}

            {/* User Configuration Route */}
            <Route
              path="/user"
              element={
                <LayoutComponent isSuperAdmin={false}>
                  <UserConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/employee/add-user"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                  <AddUser />
                </LayoutComponent>
              }
            />
            {/* End of User Configuration Route */}

            {/* Division Configuration Route */}
            <Route
              path="/division"
              element={
                <LayoutComponent isSuperAdmin={false}>
                  <DivisionConfiguration />
                </LayoutComponent>
              }
            />
            {/* End of Division Configuration Route */}

            {/* Role Configuration Route */}
            <Route
              path="/role"
              element={
                <LayoutComponent isSuperAdmin={false}>
                  <AdminRoleConfig />
                </LayoutComponent>
              }
            />
            <Route
              path="/role/detail-role/:uuid"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                  <AdminRoleConfigDetail />
                </LayoutComponent>
              }
            />
            {/* End of Role Configuration Route */}

            {/* Position Configuration Route */}
            <Route
              path="/position"
              element={
                <LayoutComponent isSuperAdmin={false}>
                  <PositionConfiguration />
                </LayoutComponent>
              }
            />
            {/* End of Position Configuration Route */}
          </React.Fragment>
        </Routes>
      </Suspense>
    );
  }
};

export default RouteManagement;
