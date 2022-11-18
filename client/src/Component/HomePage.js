import React from 'react'
import '../Style/HomePage.css'
import SideBar from './SideBar'

function HomePage({currentUser, signOut, email}) {
  return (
    <div  className='home'>
        <div className="container-home">
            <SideBar currentUser={currentUser} signOut={signOut}/>
            <div className="home-logo">
                <img src="./Icon/privtext.png" alt="logo" />
            </div>
        </div>
    </div>
  )
}

export default HomePage