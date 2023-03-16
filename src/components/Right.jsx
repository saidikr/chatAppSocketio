import axios from '../services/axios';
import React, { useEffect, useState } from 'react'
import { RightMessage } from './RightMessage'

export const Right = ({onlineUsers,currentId,setCurrentChat}) => {
  const [friends,setFriends]=useState([]);
  const [onlinefriends,setOnlineFriends]=useState([]);
  useEffect(() => {
    if(currentId){
    const getFriends = async ()=>{
      const res=await axios.get("/api/user/friends/"+currentId);
      setFriends(res.data)
    };
    getFriends();
    }
  }, [currentId]);
  useEffect(() => {
    setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)))
  }, [friends,onlineUsers]);
  return (
    <div>
      {onlinefriends.map(o=>(
      <RightMessage setCurrentChat={setCurrentChat} user={o} />
      ))}
    </div>
  )
}
