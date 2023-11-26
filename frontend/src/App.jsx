import React, { useEffect, useState } from "react"
import Register from "./pages/Register"
import "./style.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";
import axios from "axios";
import {UserContext} from '../../api/context/UserContext';
import PrivateRoute from "./pages/PrivateRoute";
import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Landing from "./pages/Landing";


function App() {
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await axios.get("http://localhost:4300/api/auth/me", {withCredentials: true})
        if(currentUser) {
          setIsUser(currentUser.data);
        }
      } catch (error) {
         console.log("THere is no user");
      }
        
    })();
  },[]);
  
  return (
    <>
    <BrowserRouter>
    <UserContext.Provider value={{isUser, setIsUser}}>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element ={<Login/>} />
        <Route path="/register" element ={<Register/>} />
        <Route path="/home" element = {<PrivateRoute><Home/></PrivateRoute>} />
      </Routes>
    </UserContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
