import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";
import LayoutComponent from "../components/layouts/LayoutComponent";
import MainCompanyConfiguration from "../pages/superAdmin/companyConfiguration/mainCompanyConfiguration/MainCompanyConfiguration";
import AddCompanyConfiguration from "../pages/superAdmin/companyConfiguration/addCompanyConfiguration/AddCompanyConfiguration";
import DetailCompanyConfiguration from "../pages/superAdmin/companyConfiguration/detailCompanyConfiguration/DetailCompanyConfiguration";
import EditCompanyConfiguration from "../pages/superAdmin/companyConfiguration/editCompanyConfiguration/EditCompanyConfiguration";
import RoleConfig from "../pages/roleConfig/RoleConfig";
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
                element={
                  <LayoutComponent hideButtons={true}>
                    
                  </LayoutComponent>
                }
              />
              
              {/* Company Configuration Route */}
              <Route
                path="/company"
                element={
                  <LayoutComponent>
                    <MainCompanyConfiguration />
                  </LayoutComponent>
                }
              />
              <Route
                path="/company/add-company"
                element={
                  <LayoutComponent hideButtons={true}>
                    <AddCompanyConfiguration />
                  </LayoutComponent>
                }
              />
              <Route
                path="/company/detail-company"
                element={
                  <LayoutComponent hideButtons={true}>
                    <DetailCompanyConfiguration />
                  </LayoutComponent>
                }
              />
              <Route
                path="/company/edit-company"
                element={
                  <LayoutComponent hideButtons={true}>
                    <EditCompanyConfiguration />
                  </LayoutComponent>
                }
              />
              {/* End of Company Configuration Route */}
              
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
                    <RoleConfig/>
                  </LayoutComponent>
                }
              />
            </React.Fragment>
          </Routes>
    </Suspense>
  );
};

export default RouteManagement;
