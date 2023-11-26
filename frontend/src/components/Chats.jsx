import React, { useEffect, useState } from 'react'
import Photo from "../assets/photo.png";
import axios from 'axios';

const Chats = ({conversation, currentUser}) => {
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const getUser = async ()=> {
      try {
        const res = await axios.get("http://localhost:4300/api/users?userId=" + friendId);
        setUser(res.data);       
      } catch (error) {
          console.log(error);
      }
    }
    getUser();
  },[currentUser, conversation])

  return (
    <div className='chats'>
      <div className="userChat">
        <img src={Photo} />
        <div className="userChatInfo">
          <span>{user?.username}</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats