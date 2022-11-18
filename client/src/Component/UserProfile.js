import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../Style/ChatList.css"

function UserProfile({name, photoURL, email, lastMessage}) {

  const navigate = useNavigate
  const goToUser = (emailID) => {
    if(emailID) {
      navigate(`/${emailID}`)
    }
  }
  return (
    <div className='profiles' onClick={() => goToUser(email)}>
        <div className="profile-image">
            <img src={photoURL} alt="img" />
        </div>
        <div className="profile-name">
            <p className='name'>{name}</p>
            {lastMessage && (<p className="user-lastmessage">{lastMessage}</p>)}
        </div>

    </div>
  )
}

export default UserProfile