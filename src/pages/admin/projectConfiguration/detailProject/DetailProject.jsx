import React, { useState } from 'react'
import { Button, Flex } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

const DetailProject = () => {
  // Declaration 
  const navigate = useNavigate();
  const getUuid = useParams();
  const [uuid, setUUid] = useState(getUuid.uuid);
  //   console.log(uuid)


  return (
    <>
        <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Client</th>
                    <td>PT Suka-Suka</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Project Name</th>
                    <td>Website E-Learning</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>Lorem ipsum</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Project</th>
                    <td>Website Development</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Start Date</th>
                    <td>15/01/2020</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Due Date</th>
                    <td>25/10/2020</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>Done</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Cancle Date</th>
                    <td>-</td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Done Date</th>
                    <td>-</td>
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
    </>
  )
}

export default DetailProject