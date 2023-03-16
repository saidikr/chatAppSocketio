import React, { useEffect,useState } from 'react'
import axios from '../services/axios';
import noavatar from '../assets/noavatar.jpg'

export const Conversation = ({setCurrentChat2,setCurrentChat,conversation,user}) => {
const [friend, setFriend] = useState();
  useEffect(() => {
  const friendId = conversation.members.find(m=>m !== user._id)
  const getUser= async ()=>{
    try {
      const res = await axios("/api/user/"+friendId);
      setFriend(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }
      getUser()
}, [user]);
const handleCurrentChat=()=>{
  setCurrentChat(conversation._id);
  setCurrentChat2(conversation);
}
return (
    <>
    {friend && 
    <div onClick={()=>handleCurrentChat()} className='hover:cursor-pointer hover:bg-gray-200 hover:rounded-3xl my-1 flex items-center p-3'>
        <img className='mr-5 w-14 h-14 rounded-full' src={friend.profilePicture?friend.profilePicture:noavatar} alt="" />
        <span className='font-medium text-lg'>{friend.userName}</span>
    </div>
     }
  </>
  )
}
