import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from './Component/ChatPage';
import HomePage from './Component/HomePage';
import { useState } from 'react';
import Login from './Component/Login';
import { auth } from './FireBase';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const signOut = ()=>{auth
      .signOut()
      .then(() => {setUser(null);
        localStorage.removeItem("user");
      }) 
      .catch((err) => alert(err.message));
  }
  return (
    <Router>
    <div className="App">
      { user ? ( 


      <Routes>
        <Route path="/" element={ <HomePage currentUser = {user} signOut={signOut} />} />
        <Route path='/:emailID' element = {<ChatPage currentUser = {user} signOut={signOut} />} />
        <Route path='/Login' element = {<Login />} />
      </Routes>

        ):(
            <Login setUser={setUser} /> 
      )}       
    </div>
    </Router>
  );
}

export default App;
