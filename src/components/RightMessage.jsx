import React from 'react'
import noavatar from '../assets/noavatar.jpg'

export const RightMessage = ({user}) => {
  const handleClick=async ()=>{
    try{
    }
    catch(err){
      console.log(err);
    }
  }
  return (
        <div onClick={()=>{handleClick}} className='relative hover:cursor-pointer hover:bg-gray-200 hover:rounded-3xl my-1 flex items-center p-3'>
        <div className='relative'>
        <img className='mr-5 w-14 h-14 rounded-full' src={user.profilePicture?user.profilePicture:noavatar} alt="" />
        <span className='absolute top-0 right-5 rounded-full bg-green-600 w-4 h-4'></span>
        </div>
        <span className='font-medium text-lg'>{user.userName}</span>
    </div>

  )
}
