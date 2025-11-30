import { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginPage from "../pages/loginPage/LoginPage";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";
import LayoutComponent from "../components/layouts/LayoutComponent";
import DashboardPage from "../pages/superAdmin/dashboardPage/DashboardPage";
import MainCompanyConfiguration from "../pages/superAdmin/companyConfiguration/mainCompanyConfiguration/MainCompanyConfiguration";
import AddCompanyConfiguration from "../pages/superAdmin/companyConfiguration/addCompanyConfiguration/AddCompanyConfiguration";
import DetailCompanyConfiguration from "../pages/superAdmin/companyConfiguration/detailCompanyConfiguration/DetailCompanyConfiguration";
import EditCompanyConfiguration from "../pages/superAdmin/companyConfiguration/editCompanyConfiguration/EditCompanyConfiguration";
import RoleConfig from "../pages/superAdmin/roleConfig/RoleConfig";
import RoleConfigDetail from "../pages/superAdmin/roleConfig/detailRole/RoleConfigDetail";
import UserConfiguration from "../pages/admin/userConfiguration/UserConfiguration";
import SuperAdminAddUser from "../pages/superAdmin/userConfiguration/addUser/AddUser";
import AddUser from "../pages/admin/userConfiguration/addUser/AddUser";

const RouteManagement = () => {
  const token = Cookies.get("token");
  const role_name = decodeURIComponent(Cookies.get("role_name"));
  const navigate = useNavigate();
  let roleNumber;

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (role_name === "superadmin" || role_name === "useradmin") {
    roleNumber = 1;
  } else if (role_name === "admin") {
    roleNumber = 2;
  } else {
    roleNumber = 0;
  }

  if (roleNumber === 1) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <LayoutComponent roleNumber={roleNumber}>
                <DashboardPage />
              </LayoutComponent>
            }
          />

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
        </Routes>
      </Suspense>
    );
  }

  if (roleNumber === 2) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/company"
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

          <Route
            path="/user"
            element={
              <LayoutComponent roleNumber={roleNumber}>
                <UserConfiguration />
              </LayoutComponent>
            }
          />
          <Route
            path="/employee/add-user/:uuid"
            element={
              <LayoutComponent roleNumber={roleNumber}>
                <AddUser />
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
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
};

export default RouteManagement;
