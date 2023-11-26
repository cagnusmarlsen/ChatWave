import React, {useContext} from "react";
import {UserContext} from '../../../api/context/UserContext'
import { useNavigate, Route } from "react-router-dom";

export default function PrivateRoute({children}) {
    const navigate = useNavigate();
    const {isUser, setIsUser} = useContext(UserContext);
    if(isUser) {
        return  <>
            {children}
        </>
    }
    else {
        navigate("/landing");
    }
}