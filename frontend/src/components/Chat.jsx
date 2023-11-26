import React, { useContext, useState } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../../../api/context/ChatContext'
import { MessageContext } from '../../../api/context/MessageContext'

const Chat = () => {
  const currentChat = useContext(ChatContext);
  const [mess, setMess] = useState([]);
  return (
    <MessageContext.Provider value={{mess, setMess}}>
    <div className='chat'>
      <div className="chatInfo">
        <span>John</span>
      </div>
      
      <Messages/>
      <Input/>
    </div>
    </MessageContext.Provider>
  )
}

export default Chat