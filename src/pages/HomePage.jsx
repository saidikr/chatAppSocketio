import React, { useEffect, useRef, useState } from 'react'
import { Left } from '../components/Left'
import { Middle } from '../components/Middle'
import { Right } from '../components/Right'
import axios from '../services/axios'
import {io} from "socket.io-client"

const HomePage = ({user,setUser}) => {
    const [conversations, setConversations] = useState();
    const [currentChat,setCurrentChat]=useState(null);
    const [socket,setSocket]=useState([]);
    const [currentChat2,setCurrentChat2]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([])

    useEffect(() => {
            setSocket(io("ws://localhost:8900"))
        }, []);   

    useEffect(()=>{
      if(user._id){
      socket.emit("addUser",user._id);
      socket.on("getUsers",(users)=>{
      setOnlineUsers(
        user.followings.filter((f) => users.some((u)=>u.userId===f)))
      })
      }
    },[user._id])

    // useEffect(()=>{
    //   const getUser=async()=>{
    //   try {
    // await axios.get('/api/user/63f4ec21519382809c7aea24')
    // .then(response=>{
    //   setUser(response.data[0])
    // })
    //   } catch (error) {
    //   console.log(error)            
    //   }
    //   };
    //   getUser();
    //   },[])

    useEffect(()=>{
        const getConversations=async()=>{
          try {
            const res= await axios.get('/api/conversation/'+user._id)
            setConversations(res.data)
        } catch (error) {
        console.log(error)            
        }
    };
    getConversations();
  },[user])
    return (
    <div className='h-[90vh]'>
    <div className='h-12 px-5 bg-slate-700'>
        <a className='text-white font-semibold text-4xl'>ChatAPP</a>
    </div>
    <div className='flex justify-between h-full w-full'>
        {conversations && 
        <div className='p-10 w-1/4' >
            <Left setCurrentChat={setCurrentChat} setCurrentChat2={setCurrentChat2} conversations={conversations} user={user} />
        </div>}
        <div className='w-1/2 p-10'>
            <Middle socket={socket} conversations={conversations} currentChat2={currentChat2} currentUser={user} currentChat={currentChat} />
        </div>
        <div className='p-10 w-1/4' >
            <Right onlineUsers={onlineUsers} user={user} currentId={user._id} setCurrentChat={setCurrentChat} />            
        </div>
    </div>
    </div>
  )
}

export default HomePage