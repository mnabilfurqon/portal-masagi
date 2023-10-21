import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";
import LayoutComponent from "../components/layouts/LayoutComponent";
import MainCompanyConfiguration from "../pages/superAdmin/companyConfiguration/mainCompanyConfiguration/MainCompanyConfiguration";
import RoleConfig from "../pages/roleConfig/RoleConfig";

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
                  <LayoutComponent>
                    
                  </LayoutComponent>
                }
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
