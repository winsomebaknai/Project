import React from 'react'
import db, { auth, googleProvider } from '../FireBase'
import { useNavigate } from 'react-router-dom'
import '../Style/Login.css'

function Login({setUser}) {
    const navigate = useNavigate()
    const signInWithGoogle = () =>{
            auth.signInWithPopup(googleProvider).then((res) =>
                {
                    const newUser = {
                        userName :res.user.displayName,
                        email: res.user.email,
                        photoURL: res.user.photoURL
                    }
                    navigate('/')
                    setUser(newUser)
                    localStorage.setItem('user', JSON.stringify(newUser))
                    db.collection('users').doc(res.user.email).set(newUser)
                })
                .catch((err) => alert(err.message));    
    }

  return (
    <div className="login">
        <div className="login-conatiner">
            <img src="./Icon/privtext.png" alt="logo" />
            <h1>Login</h1>
            <button className='login-btn ' onClick={signInWithGoogle}>
                <img src="./Icon/google.png" alt="google icon"/>
            Log in with Google</button>
        </div>
    </div>
  )
}

export default Login