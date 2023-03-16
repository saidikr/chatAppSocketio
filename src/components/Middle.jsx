import React, { useEffect, useRef, useState } from 'react'
import { Message } from './Message'
import axios from '../services/axios';



export const Middle = ({currentChat2,socket,currentUser,currentChat,conversations}) => {
  const inputRef=useRef(null);
  const scrollRef=useRef();
  const [messages, setMessages] = useState();
  const [arrivalmessages, setArrivalMessages] = useState(null);
  useEffect(() => { 
   const getMessages= async()=>{
    try {
      const res = await axios.get("/api/messages/"+currentChat);
      setMessages(res.data)
    } catch (error) {
      console.log(error)
    }
   }
   getMessages()
  }, [currentChat]);
  
const handleInputSubmit=async ()=>{
  
  const conversation=conversations.find((m)=>m._id===currentChat)
  const receiverId=conversation.members.find((member)=>member!==currentUser._id)

  socket.emit("sendMessage",{
    senderId: currentUser._id,
    receiverId:receiverId,
    text:inputRef.current.value,
  })
  if(inputRef.current.value.length > 0){
    const res=await axios.post("/api/message/new",{
        text:inputRef.current.value,
        conversationId:currentChat,
        sender:currentUser._id,
      });
      setMessages([...messages,res.data])
      inputRef.current.value="";
      inputRef.current.focus();
  }
    }
    useEffect(()=>{
      if(socket.on){
      socket.on("getMessage", data =>{
        console.log(data)
        setArrivalMessages({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        })
      })
      }
    },[socket])

    useEffect(() => {

      arrivalmessages && currentChat2?.members.includes(arrivalmessages.sender) &&
      setMessages(prev=>[...prev,arrivalmessages])
    }, [arrivalmessages,conversations]);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages]);
  return (
    <div className='h-full flex flex-col bg-gray-200 rounded-xl'>
      {currentChat ?
        <div className='flex-1 flex-col overflow-y-scroll h-full p-5'>
          {messages.map((m,index)=>(
            <div key={index} ref={scrollRef}>
            <Message msg={m} currentUser={currentUser} />
            </div>
          ))}
        </div>
        :<div className='text-center mt-28 font-extralight text-4xl flex-1 h-full'>
          Open a conversation to start a chat 
        </div>
      }
        <div className='flex'>
          <input type="text" ref={inputRef} className='focus:outline-none border border-gray-400 rounded-xl p-1 w-full mr-3'  />
          <button onClick={handleInputSubmit} className='bg-blue-600 rounded-xl p-3 w-24 text-white'>send</button>
        </div>
    </div>
  )
}
