import React from 'react'
import './historyButton.css'
import { Button, Card } from 'antd'

const HistoryButton = (props) => {
  return (
    <>
        <Button className='button'>
            <div>{props.icon}</div>

            <span
                style={{
                    fontSize: 14,
                    marginTop: 0,
                    paddingBottom: 0
                }}
            >
                {props.title}
            </span>

            <h2 
                style={{
                    fontSize: 24,
                    margin: 0,
                    fontWeight: "bold",
                }}
            >
                {props.value}
            </h2>
        </Button>
    </>
  )
}

export default HistoryButton