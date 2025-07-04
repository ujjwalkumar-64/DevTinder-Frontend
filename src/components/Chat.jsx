import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BaseUrl } from '../utils/constant';

const Chat =   () => {
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user= useSelector(store=>store.user)
    const userId= user?._id;

    const fetchChatMessage = async ()=>{
        const chat= await axios.get(BaseUrl + "/chat/" + targetUserId,{withCredentials:true})

      const chatMessages = chat?.data?.messages.map((msg)=>{
        const {senderId,text}= msg;
        return {
          firstName: senderId?.firstName,
          lastName:  senderId?.lastName,
          text
        };
      });

      setMessages(chatMessages);

    };

    useEffect(()=>{
      fetchChatMessage();
    },[])

    useEffect(()=>{

    })

    useEffect(()=>{
        if(!userId){
            return;
        }
        const socket= createSocketConnection();
        socket.emit("joinChat",{firstName:user.firstName,userId,targetUserId})

        socket.on("messageReceived",({firstName,text,lastName})=>{
            console.log(firstName + ": " + text)
            setMessages((messages)=>[...messages,{firstName,text,lastName}]);
        })

        return ()=>{ 
            socket.disconnect();
        }

    },[userId,targetUserId])
    
 

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
          firstName: user.firstName,
          lastName:user.lastName,
          userId,
          targetUserId,
          text: newMessage,
        });
        setNewMessage("");
      };

  return (
    <div className="w-3/4 mx-auto  bg-blue-100 border border-cyan-50 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-cyan-700 bg-cyan-50 text-cyan-900 text-xl">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header text-blue-900">
                {`${msg.firstName}  ${msg.lastName} `}
                {/* <time className="text-xs opacity-50"> 2 hours ago</time> */}
              </div>
              <div className="chat-bubble bg-cyan-800 text-white">{msg.text}</div>
              {/* <div className="chat-footer opacity-50">Seen</div> */}
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600  bg-cyan-50 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 bg-cyan-800 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage}  className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
  
}

export default Chat
