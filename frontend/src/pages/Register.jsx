import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Register = () => {

  const [credentials, setCredentials] = useState( {
    username: "",
    email: "",
    password: "",
  })
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">FireChat</span>
        <span className="title">Register</span>
        <form>
          <input required type="text" placeholder="Display name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <span>Add an avatar</span>
          </label>
          <button >Sign up</button>
        </form>
        <p>
          Already have an account? <Link to="/login" style={{textDecoration: "none"}}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register