import React, { useEffect, useState } from 'react'
import "../Style/Chats.css"
import Messgae from './Messgae'
import {useParams} from 'react-router-dom'
import db from '../FireBase';


function Chats({currentUser}) {
    const [msg, setmsg] =useState("");
    const {emailID} = useParams();
    const [chatUser, setChatUser] = useState({});
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(()=> {
        const getUser = async ()=> {
            const data =await db.collection('users').doc(emailID).onSnapshot((snapshot)=> {
                setChatUser(snapshot.data());
            });
        };

        const getMessages = async () => {
            const data = await db.collection('chats').doc(emailID).collection('messages').onSnapshot((snapshot) =>{
                let messages = snapshot.docs.map((doc) => doc.data());

                let newMessages = messages.filter((msg) => 
                msg.senderEmail === (currentUser.email || emailID ) ||
                msg.recieverEmail === (currentUser.email || emailID )
                );

                setChatMessages(newMessages);
            });
        }
        getUser();
        getMessages();
    },[emailID]); 


    const sent =(e)=>{
        e.preventDefault()
        if(emailID){
            let payload = {
                text: msg,
                senderEmail : currentUser.email,
                recieverEmail: emailID,
                
            }
            //send
            db.collection('chats').doc(currentUser.email).collection('messages').add(payload);

            //recieve
            db.collection('chats').doc(emailID).collection('messages').add(payload);


            //add users to senders friendlist
            db.collection('FriendList').doc(currentUser.email).collection('list').doc(emailID).set({
                email:chatUser.email,
                userName:chatUser.userName,
                photoURL:chatUser.photoURL,
                lastMessage:chatUser.msg,
            });

            db.collection('FriendList').doc(emailID).collection('list').doc(currentUser.email).set({
                email:currentUser.email,
                userName:currentUser.userName,
                photoURL:currentUser.photoURL,
                lastMessage:msg,
            });

            setmsg("");
        }
    };

  return (
    <div className='chat-container'>
        <div className="chat-header">
            <div className="chat-user">
                <div className="chat-user-img">
                    <img src={chatUser?.photoURL} alt="user-img" />
                </div>
                <h1>{chatUser?.userName}</h1>
            </div>
        </div>
        <div className="chats-display">
            {
                chatMessages.map((message) =>(
                   <Messgae 
                   message ={message.text}
                   sender={message.senderEmail}
                   />
                    
                ))

            }
        </div>

        <div className="chat-input">
            <div className="emoji-clip">
                <img src="./Icon/emoji.png" alt="emoji" />
                <img src="./Icon/attache.png" alt="attatch" />
            </div>
            
                <form onSubmit={sent}>
                    <input type="text" placeholder='Type a message' value={msg}  onChange={(e) =>{
                    setmsg(e.target.value);
                }}/></form>
        
            <div className='send-btn' onClick={sent}>
                <img src="./Icon/sent.png" alt="sent btn" />
            </div>
        </div>
    </div>
  )
}

export default Chats