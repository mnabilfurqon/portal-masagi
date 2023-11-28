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
import OfficialTravelMain from "../pages/employee/schemas/approvalConfiguration/officialTravel/OfficialTravelMain";
import OfficialTravelDetail from "../pages/employee/schemas/approvalConfiguration/officialTravel/OfficialTravelDetail";

const RouteManagement = () => {
  const token = Cookies.get("token");
  const role_uuid = Cookies.get("role_uuid");
  const navigate = useNavigate();
  let roleNumber = 3;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (role_uuid === "1e5c6bc1-f3fb-4ed4-863b-09e6af49c0fc") {
    roleNumber = 1;
  } else if (role_uuid === "a454bd10-5dfe-48fa-8f4c-ee104334842a") {
    roleNumber = 2;
  } else {
    roleNumber = 3;
  }

  console.log(roleNumber);
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
                      <DashboardPage/>
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
              path="/user/add-user"
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
                      <p>History</p>
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
                      <p>Present</p>
                    </LayoutComponent>
                  }
                />

                <Route
                  path="/report"
                  element={
                    <LayoutComponent roleNumber={roleNumber}>
                      <p>Report</p>
                    </LayoutComponent>
                  }
                />

                {/* Permit Configuration Route */}                
                <Route
                path="/permit-parent"
                element={
                  <LayoutComponent roleNumber={roleNumber}>
                    <p>Permit</p>
                  </LayoutComponent>
                }
                />

                <Route
                path="/official-travel"
                element={
                  <LayoutComponent roleNumber={roleNumber}>
                    <p>Official Travel</p>
                  </LayoutComponent>
                }
                />

                <Route
                path="/leave"
                element={
                  <LayoutComponent roleNumber={roleNumber}>
                    <p>Leave</p>
                  </LayoutComponent>
                }
                />

                <Route
                path="/overtime"
                element={
                  <LayoutComponent roleNumber={roleNumber}>
                    <p>Overtime</p>
                  </LayoutComponent>
                }
                />

                <Route
                path="/permit"
                element={
                  <LayoutComponent roleNumber={roleNumber}>
                    <p>Permit</p>
                  </LayoutComponent>
                }
                />

                {/* Permit Request Configuration Route */}
                <Route
                  path="/permit-request-parent"
                  element={
                    <LayoutComponent roleNumber={roleNumber}>
                      <p>Permit Request</p>
                    </LayoutComponent>
                  }
                />

                <Route
                  path="/official-travel-request"
                  element={
                    <LayoutComponent roleNumber={roleNumber}>
                      <OfficialTravelMain />
                    </LayoutComponent>
                  }
                />

                <Route
                  path="/official-travel-request/detail"
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
                      <p>Leave Request</p>
                    </LayoutComponent>
                  }
                />

                <Route
                  path="/overtime-request"
                  element={
                    <LayoutComponent roleNumber={roleNumber}>
                      <p>Overtime Request</p>
                    </LayoutComponent>
                  }
                />

                <Route
                  path="/permit-request"
                  element={
                    <LayoutComponent roleNumber={roleNumber}>
                      <p>Permit Request</p>
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
