import React from 'react'
import '../Style/ChatPage.css'
import Chats from './Chats'
import SideBar from './SideBar'

function ChatPage({currentUser, signOut}) {
  return (
    <div className='chatpage'>
      <div className="container-chatpage">
      <SideBar currentUser={currentUser} signOut={signOut}/>
      <Chats currentUser={currentUser} />
      </div>
    </div>
  )
}

export default ChatPage