import React from 'react'
import './historyButton.css'
import { Button, Card } from 'antd'

const HistoryButton = ({onClick, icon, title, value}) => {
  return (
    <>
        <Button className='button' onClick={onClick}>
            <div>{icon}</div>

            <span
                style={{
                    fontSize: 14,
                    marginTop: 10,
                    paddingBottom: 0
                }}
            >
                {title}
            </span>

            <h2 
                style={{
                    fontSize: 24,
                    margin: 0,
                    fontWeight: "bold",
                }}
            >
                {value}
            </h2>
        </Button>
    </>
  )
}

export default HistoryButton