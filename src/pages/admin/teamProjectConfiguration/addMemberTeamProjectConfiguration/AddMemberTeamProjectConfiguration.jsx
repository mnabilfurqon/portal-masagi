import React, { useState, useEffect } from "react";
import SuccessAddDataModal from "@common/modals/successModal/SuccessAddDataModal";
import FailedAddDataModal from "@common/modals/failedModal/FailedAddDataModal";
import TeamMemberForm from "@common/forms/teamMemberForm/TeamMemberForm";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Spin } from "antd";
import axios from "axios";

const AddMemberTeamProjectConfiguration = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [projectData, setProjectData] = useState();
  const [teamMember, setTeamMember] = useState([]);
  const [roleProject, setRoleProject] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://103.82.93.38/api/v1/team_project/${uuid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProjectData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTeamMember = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://103.82.93.38/api/v1/employee/", {
        headers: {
          Authorization: token,
        },
      });
      setTeamMember(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://103.82.93.38/api/v1/role_project/",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setRoleProject(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getProject();
    getTeamMember();
    getRoleProject();
  }, [token, navigate]);

  // Modal Handler
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://103.82.93.38/api/v1/member_team/", {
        team_project_uuid: uuid,
        employee_uuid: values.employee_uuid,
        role_project_uuid: values.role_project_uuid,
      }, {
        headers: {
          Authorization: token,
        },
      });
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    setIsFailedModalVisible(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    navigate(-1);
  };

  const handleFailedModalClose = () => {
    setIsFailedModalVisible(false);
  };

  return (
    <>
      <Spin spinning={loading} size="large" tip="Add Data...">
        <TeamMemberForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          buttonText="Save"
          projectData={projectData}
          teamMember={teamMember}
          roleProject={roleProject}
        />

        <SuccessAddDataModal
          visible={isSuccessModalVisible}
          onClose={handleSuccessModalClose}
          textParagraph="Data upload successful!"
        />

        <FailedAddDataModal
          visible={isFailedModalVisible}
          onClose={handleFailedModalClose}
        />
      </Spin>
    </>
  );
};

export default AddMemberTeamProjectConfiguration;
