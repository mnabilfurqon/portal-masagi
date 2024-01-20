import React from 'react'
import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

const DetailProject = () => {
  // Declaration 
  const navigate = useNavigate();

  return (
    <>
        <div className='table-container'>
            <table className='table-content'>
                <tbody>
                <tr>
                    <th>Client</th>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Project Name</th>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Type Project</th>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Start Date</th>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Due Date</th>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Cancle Date</th>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>Done Date</th>
                    <td></td>
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