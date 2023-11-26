import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from "./Message"
import { UserContext } from '../../../api/context/UserContext'
import { ChatContext } from '../../../api/context/ChatContext';
import axios from 'axios';
import { MessageContext } from '../../../api/context/MessageContext';

const Messages = ({current}) => {
  const {isUser,setIsUser} = useContext(UserContext);
  const {currentChat, setCurrentChat} = useContext(ChatContext);
  // const [messages, setMessages] = useState([]);
  const {mess, setMess} = useContext(MessageContext);
  const scrollRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      try{
        const res = await axios.get("http://localhost:4300/api/messages/" + currentChat?._id);
        // setMessages(res.data);
        setMess(res.data);
      } catch(err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [mess]);

  if(currentChat === null) {
    return <>
      <span>Hello</span>
    </>
  }
  else {
    return <>
    <div className='messages'>
      {mess.map((m) => (
        <div ref={scrollRef}>
          <Message message = {m} own = {m.sender === isUser.id}/>
        </div>
      ))}

    </div>
  </>
  }
}

export default Messages