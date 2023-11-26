import React from 'react'
import Photo from "../assets/photo.png";
import {format} from "timeago.js"
const Message = ({message, own}) => {
  // console.log(own)

  return (
    <div className= {own? "message owner" : "message"}>
      <div className= "messageInfo">
        <img src={Photo} alt="" />
        <span>{format(message.createdAt)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  )
}

export default Message