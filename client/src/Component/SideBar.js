import React, { useEffect, useState } from 'react'
import db from '../FireBase'
import "../Style/Sidebar.css"
import UserProfile from './UserProfile'

function SideBar({currentUser, signOut}) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setFriendList] = useState([]);

 useEffect(()=> {
  const getAllUsers = async () =>{
    const data = await db.collection("users").onSnapshot((snapshot) => {
      setAllUsers(snapshot.docs.filter((doc)=> doc.data().email !== currentUser?.email));
    });
  };


  const getFriends = async () => {
    const data = await db
      .collection("FriendList")
      .doc(currentUser.email)
      .collection("list")
      .onSnapshot((snapshot) => {
        setFriendList(snapshot.docs);
      });
  };
  getAllUsers();
  getFriends();
 
 },[]);


 const searchedUser = allUsers.filter((user) =>{
  if(searchInput){
    if(user.data().userName.toLowerCase().includes(searchInput.toLowerCase())){
      return user;
    }
  }
 } );

 const searchItem = searchedUser.map((user) =>  {
  return(
    <UserProfile name = {user.data().userName}
    photoURL = {user.data().photoURL} 
    key ={user.id}
    email = {user.data().email}
    />
  );
 });

  return (
    <div className='sidebar'>
    <div className="header-sidebar">
        <div className="profile-pic-user" onClick={signOut}>
            <img src={currentUser?.photoURL} alt="Profile-Pic" />
        </div>
    </div>

    <div className="search">
      <div className="search-input">
        <div className="search-icon">
            <img src="./Icon/Search.png" alt="Search-Icon" />
        </div>
        <div className='input'>
        <input type="text" name="search" placeholder="search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
        </div>
      </div>
    </div> 
   
    <div className="chatlist">
      { searchItem.length> 0 ? 
          searchItem
        : friendList.map((friend) => (
          <UserProfile name= {friend.data().userName}
           photoURL={friend.data().photoURL} 
           lastMessage={friend.data.lastMessage}
           email={friend.data().email}
           />
     ))}
       
       
       
    </div>
    </div>
  )
}

export default SideBar