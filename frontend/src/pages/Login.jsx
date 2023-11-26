import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../api/context/UserContext'

const Login = () => {
  const {isUser, setIsUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  }) 
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  } 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(credentials);
      const res = await axios.post("http://localhost:4300/api/auth/login", credentials, {withCredentials: 'true'});
      if(res) {
        const currentUser = await axios.get("http://localhost:4300/api/auth/me", {withCredentials: true});
        if(currentUser) { 
          setIsUser(currentUser.data);
          navigate("/home");
        }
      }
    } catch (error) {
        console.log("There is someting wrong");
    }

  }
  return (
    <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">FireChat</span>
      <span className="title">Login</span>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="Username" id='username' onChange={handleChange}/>
        <input required type="password" placeholder="Password" id='password' onChange={handleChange}/>
        <button >Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register" style={{textDecoration: "none"}}>Register</Link>
      </p>
    </div>
  </div>
  )
}

export default Login