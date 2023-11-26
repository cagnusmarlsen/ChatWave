import React, { useContext, useEffect, useState } from 'react'
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from './Chats'
import { UserContext } from '../../../api/context/UserContext'
import axios from 'axios'
import { ChatContext } from '../../../api/context/ChatContext'

const Sidebar = () => {
  const {isUser, setIsUser} = useContext(UserContext);
  const {currentChat, setCurrentChat} = useContext(ChatContext);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversation = async ()=> {
      try {
        const res = await axios.get("http://localhost:4300/api/conversations/" + isUser.id);
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      } 
    }
    getConversation();
  }, [])

  return (
    <div className='sidebar'>
        <Navbar/>
        <Search/>
        {conversation.map(c => (
          <div onClick={() => setCurrentChat(c)}>
            <Chats conversation = {c} currentUser = {isUser}/>
          </div>
        ))}
    </div>
  )
}

export default Sidebar