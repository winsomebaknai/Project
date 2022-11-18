import React from 'react'
import { auth } from "../firebase";
import '../Style/Messgae.css'

function Messgae({ message, time, sender }) {
  return (
    <div className='message'
    style={{
      alignSelf:
        sender === auth?.currentUser?.email ? "flex-end" : "flex-start",

      backgroundColor:
        sender == auth?.currentUser?.email ? "#ffc629" : "#fff",
    }}
    >
     

        <div className="text">
            {message}
        </div>
        <div className="message-time">
           {new Date(time.toDate()).toLocaleString()}
        </div>
    </div>
  )
}

export default Messgae