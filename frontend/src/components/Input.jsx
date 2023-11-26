import React, { useContext, useEffect, useRef, useState } from 'react'
import { MessageContext } from '../../../api/context/MessageContext'
import { UserContext } from '../../../api/context/UserContext';
import { ChatContext } from '../../../api/context/ChatContext';
import {io} from "socket.io-client";

import axios from 'axios';

const Input = () => {
  const {mess, setMess} = useContext(MessageContext);
  const {isUser, setIsUser} = useContext(UserContext);
  const {currentChat, setCurrentChat} = useContext(ChatContext);
  const [newMessage, setNewMesssage] = useState("");
  const [arrivalMessage, setArrivalMesssage] = useState(null);
  const socket = useRef();

  useEffect(()=> {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMesssage({
        sender: data.senderId,
        text : data.text,
        // createdAt : Date.now(),
      })
    } )
  },[]);

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
    setMess((prev) => [...prev, arrivalMessage]);
    // console.log("2");
    // console.log(mess);
  },[arrivalMessage]);

  useEffect(()=> {
    socket.current.emit("addUser", isUser.id);
    socket.current.on("getUsers", users=> {
        // console.log(users);
    })
  },[isUser]);

  const handleClick = async (e)=> {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: isUser.id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find((m) => m !== isUser.id);

    socket.current.emit("sendMessage", {
      senderId: isUser.id,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post("http://localhost:4300/api/messages", message);
      setMess([...mess, res.data]);
      // console.log("1");
      // console.log(mess);
      setNewMesssage("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='input'>
        <input type="text" placeholder='Send a message...' onChange={(e) => setNewMesssage(e.target.value)} value={newMessage}/>
        <div className="send">
            <button onClick={handleClick}>Send</button>
        </div>
    </div>
  )
}

export default Input