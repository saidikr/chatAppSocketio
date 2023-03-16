import React, { useContext } from 'react'
import { Conversation } from './Conversation'

export const Left = ({setCurrentChat2,setCurrentChat,conversations,user}) => {
  return (
    <div>
        <input type="text" placeholder='Search for friends' className='text-lg p-2 focus:outline-none border-b border-b-gray-400 focus:border-b-gray-500 w-[90%]' />
        <div className='mt-4'>
            {conversations.map((c,index)=>(
                          <Conversation key={index} setCurrentChat2={setCurrentChat2} setCurrentChat={setCurrentChat} conversation={c} user={user} />
            ))}
        </div>
    </div>
  )
}
