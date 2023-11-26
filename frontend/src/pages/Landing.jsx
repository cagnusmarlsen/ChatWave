import React, { useContext } from 'react'
import { UserContext } from '../../../api/context/UserContext'
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const isUser = useContext(UserContext);
    if(isUser) {
        navigate("/home");
    }

  return (
    <div>
        <h3>Hello and welcome.</h3>
        <button><Link to= "/login">Log in</Link></button>
    </div>
  )
}

export default Landing