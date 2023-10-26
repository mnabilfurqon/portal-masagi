import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
import RoleConfigDetail from "../pages/superAdmin/roleConfig/detailRole/RoleConfigDetail"
import PositionConfiguration from "../pages/admin/positionConfiguration/PositionConfiguration";
import DivisionConfiguration from "../pages/admin/divisionConfiguration/DivisionConfiguration";
import MainEmployeeConfiguration from "../pages/admin/employeeConfiguration/mainEmployeeConfiguration/MainEmployeeConfiguration";
import DetailEmployeeConfiguration from "../pages/admin/employeeConfiguration/detailEmployeeConfiguration/DetailEmployeeConfiguration";

const RouteManagement = () => {
  // const token = localStorage.getItem("token");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  let isSuperAdmin = false;

  if (isSuperAdmin) {
    // Routing untuk Super Admin
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <Routes>
          <React.Fragment>
            <Route
              path="/dashboard"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={true}>

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
              path="/company/detail-company"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={true}>
                  <DetailCompanyConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/company/edit-company"
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
              path="/role/detail-role"
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
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <Routes>
          <React.Fragment>
            <Route
              path="/dashboard"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={false}>

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
              path="/company/edit-company"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                  <AdminEditCompanyConfiguration />
                </LayoutComponent>
              }
            />
            {/* End of Company Configuration Route */}

            <Route
              path="/user"
              element={
                <LayoutComponent isSuperAdmin={false}>
                  <UserConfiguration />
                </LayoutComponent>
              }
            />
            <Route
              path="/role"
              element={
                <LayoutComponent isSuperAdmin={false}>
                  <RoleConfig />
                </LayoutComponent>
              }
            />
            <Route
              path="/role/detail-role"
              element={
                <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                  <RoleConfigDetail />
                </LayoutComponent>
              }
            />
            <Route
              path="/position"
              element={
                <LayoutComponent isSuperAdmin={false}>
                  <PositionConfiguration />
                </LayoutComponent>
              }
            />
          </React.Fragment>
        </Routes>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
            <Routes>
              <React.Fragment>
                <Route
                  path="/dashboard"
                  element={
                    <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                      
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
                  path="/company/edit-company"
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
                {/* End of Employee Configuration Route */}

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
                <Route
                  path="/role"
                  element={
                    <LayoutComponent isSuperAdmin={false}>
                      <RoleConfig/>
                    </LayoutComponent>
                  }
                />
                <Route
                  path="/role/detail-role"
                  element={
                    <LayoutComponent hideButtons={true} isSuperAdmin={false}>
                      <RoleConfigDetail/>
                    </LayoutComponent>
                  }
                />
              </React.Fragment>
            </Routes>
      </Suspense>
    );
  }

};

export default RouteManagement;
