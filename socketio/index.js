const io = require("socket.io")(8900,{
    cors:{
        origin:"http://127.0.0.1:5173"
    }
});


/*
SERVER:
to send event to one client: io.to(socketId).emit
to send event to all clients: io.emit
take event from client: socket.on 
CLIENT:
send event to server: socket.emit
take event from server: socket.on
*/

let users=[];

const addUser=(userId,socketId)=>{
    !users.some(user=>user.userId === userId) &&
        users.push({userId,socketId})
}

const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId);
}

const getUser=(userId)=>{
    return users.find((user)=>user.userId===userId)    
}

io.on("connection",(socket)=>{

//when connected
    console.log('a user connected.')
    //take userId and socketId from user
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    })

    //send and get messages

    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user=getUser(receiverId);
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text,
        })
    })


    socket.on("disconnect",()=>{
    //when disconnected
        console.log('a user disconnected!')
        removeUser(socket.id)
        io.emit("getUsers",users)
    })

})
