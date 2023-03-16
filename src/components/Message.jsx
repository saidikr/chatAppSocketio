import React from 'react'
import {format} from 'timeago.js'
import noavatar from '../assets/noavatar.jpg'

export const Message = ({msg,currentUser}) => {
  return (
        <>
        <div className={currentUser._id===msg.sender?"relative mt-6 flex w-fit rounded-full pr-5 ml-auto bg-[#1877f2] text-white":"relative mt-6 flex  w-fit rounded-2xl pr-5 mr-auto bg-[#f5f1f1] text-black"}>
        <img className='w-10 h-10 rounded-full mr-2' src={currentUser.profilePicture?currentUser.profilePicture:noavatar} alt="" />
        <p className='pt-1'>{msg.text}</p>
        <span className='absolute -bottom-4 right-1 text-black text-xs'>{format(msg.createdAt)}</span>
        </div>
        </>
      )
}
