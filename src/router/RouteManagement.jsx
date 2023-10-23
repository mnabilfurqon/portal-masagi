import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";
import LayoutComponent from "../components/layouts/LayoutComponent";
import MainCompanyConfiguration from "../pages/superAdmin/companyConfiguration/mainCompanyConfiguration/MainCompanyConfiguration";
import RoleConfig from "../pages/roleConfig/RoleConfig";
import RoleConfigDetail from "../pages/roleConfig/detailRole/RoleConfigDetail";
import UserConfiguration from "../pages/userConfiguration/UserConfiguration";

const RouteManagement = () => {
  // const token = localStorage.getItem("token");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <Routes>
        <React.Fragment>
          <Route
            path="/dashboard"
            element={<LayoutComponent hideButtons={true}></LayoutComponent>}
          />
          <Route
            path="/company"
            element={
              <LayoutComponent>
                <MainCompanyConfiguration />
              </LayoutComponent>
            }
          />
          <Route
            path="/user"
            element={
              <LayoutComponent>
                <UserConfiguration />
              </LayoutComponent>
            }
          />
          <Route
            path="/role"
            element={
              <LayoutComponent>
                <RoleConfig />
              </LayoutComponent>
            }
          />
          <Route
            path="/role/detail-role"
            element={
              <LayoutComponent hideButtons={true}>
                <RoleConfigDetail />
              </LayoutComponent>
            }
          />
        </React.Fragment>
      </Routes>
    </Suspense>
  );
};

export default RouteManagement;
