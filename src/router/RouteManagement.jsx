import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";
import LayoutComponent from "../components/layouts/LayoutComponent";

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
                path="/company"
                element={
                  <LayoutComponent>
                    
                  </LayoutComponent>
                }
              />
              <Route
                path="/employee"
                element={
                  <LayoutComponent>
                    
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
                    
                  </LayoutComponent>
                }
              />
              <Route
                path="/division"
                element={
                  <LayoutComponent>
                    
                  </LayoutComponent>
                }
              />
              <Route
                path="/posisition"
                element={
                  <LayoutComponent>
                    
                  </LayoutComponent>
                }
              />
            </React.Fragment>
          </Routes>
    </Suspense>
  );
};

export default RouteManagement;
