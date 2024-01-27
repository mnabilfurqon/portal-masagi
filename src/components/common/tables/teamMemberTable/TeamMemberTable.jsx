import React, { useState, useEffect } from "react";
import { Avatar, Space, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const TeamMemberTable = (props) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const noMarginBottom = { marginBottom: 0 };
  const { uuid } = useParams();
  const [teamMember, setTeamMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const { columns, isSuccessDeleteModalOpen } = props;

  const getTeamMember = async () => {
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
      setTeamMember(response.data.team_members);
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
    getTeamMember();
  }, [token, navigate, isSuccessDeleteModalOpen]);

  const dataRaw = teamMember.filter((item) => item.isleader !== true);

  const data = dataRaw.map((item) => {
    return {
      key: item.uuid,
      name: (
        <Space direction="horizontal" size={16}>
          <Avatar
            size={64}
            src={
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
          />
          <Space direction="vertical">
            <p style={noMarginBottom}>
              <b>{item.employee.name}</b>
            </p>
            <Space direction="horizontal">
              <p style={noMarginBottom}>{item.role_project.name}</p>
            </Space>
          </Space>
        </Space>
      ),
    };
  });

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowClassName="custom-row"
        scroll={{ x: true, y: 650 }}
        pagination={false}
      />
    </div>
  );
};

export default TeamMemberTable;
