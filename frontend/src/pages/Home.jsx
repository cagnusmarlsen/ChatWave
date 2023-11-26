import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { ChatContext } from '../../../api/context/ChatContext'


const Home = () => {
  const [currentChat, setCurrentChat] = useState(null);
  return (
    <ChatContext.Provider value={{currentChat, setCurrentChat}}>
    <div className='home'>
        <div className="container">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
    </ChatContext.Provider>
  )
}

export default Home