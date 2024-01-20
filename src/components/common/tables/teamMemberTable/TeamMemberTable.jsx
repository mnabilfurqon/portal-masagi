import React, {useState, useEffect} from 'react'
import { Table,} from 'antd'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const TeamMemberTable = (props) => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { columns } = props;

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    //   getPermitData();
    }, [token, navigate]);

    const dataDummy = [
        {
            key: '1',
            name: 'Alex Brown',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            position: 'Backend',
        },
        {
            key: '2',
            name: 'Jim Green',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            position: 'Frontend',
        },
        {
            key: '3',
            name: 'Joe Black',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            position: 'UI/UX Designer',
        }
    ];

    return (
        <div>
            <Table 
                columns={columns}
                dataSource={dataDummy}
                loading={loading}
                rowClassName="custom-row"
                scroll={{ x: true, y: 650 }}
                pagination={false}
            />
        </div>
    )
}

export default TeamMemberTable