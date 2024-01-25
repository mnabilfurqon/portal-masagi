import React, { useState, useEffect } from 'react'
import { Button, Flex, Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

const DetailProject = () => {
  // Declaration 
  const { uuid } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [project, setProject] = useState({});
  const [client, setClient] = useState();
  const [type, setType] = useState();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  // Header
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    getProject();
  }, [token, navigate]);

  // Get API Detail Project
  const getProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://103.82.93.38/api/v1/project/${uuid}`, {
        headers: {
          Authorization: token,
        }
      });
      setLoading(false);
      setProject(response.data);
      setClient(response.data.client.name);
      setType(response.data.type.name);
      setStatus(response.data.status.name);
      // console.log("Project", project);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


  return (
    <>
    <Spin spinning={loading}>
        <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Client</th>
                    <td>{client}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Project Name</th>
                    <td>{project.name}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{project.description}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Project</th>
                    <td>{type}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Start Date</th>
                    <td>{dayjs(project.start_date).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Due Date</th>
                    <td>{dayjs(project.due_date).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{status}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Cancel Date</th>
                    <td>{(project.cancel_at) ? dayjs(project.cancel_at).format("DD/MM/YYYY") : "-"}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Done Date</th>
                    <td>{(project.done_at) ? dayjs(project.done_at).format("DD/MM/YYYY") : "-"}</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>

        <Flex align='center' justify='end'>
            <Button onClick={() => navigate(`/edit-project/${uuid}`)} className='submit-button' style={{ color: "white", }}>Edit Data</Button>
        </Flex>
    </Spin>
    </>
  )
}

export default DetailProject