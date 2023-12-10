import React, { useState, useEffect } from "react";
import { useSocket } from "../../Contexts/SocketContext";
import chatService from "../../API/ChatService"
import userService from "../../API/UserService"
import Message from "./Message";

function ChatScreen({ roomId, userInfo }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState();
  const [startId, setStartId] = useState(null);

  useEffect(() => {
    fetchUserInfo();
    fetchMesssages();

    sendMessageWhenReady(socket, { type: "joinRoom", data: { roomId } });
    socket.addEventListener("message", handleSocketMessage);
    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, []);

  function sendMessageWhenReady(client, message) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    } else {
      setTimeout(() => sendMessageWhenReady(client, message), 100);
    }
  }

  const fetchMesssages = async () => {
    const response = await chatService.getMessages(roomId, startId);
    setStartId(response.nextId);
    setMessages(response.messages);
  };

  const fetchUserInfo = async () => {
    const response = await userService.searchProfile();
    setUserId(response.id);
  };

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  const handleSocketMessage = (event) => {
    const receivedMessage = JSON.parse(event.data);

    switch (receivedMessage.type) {
      case "getmsg":
          setMessages((messages) => {
            return !messages ? [receivedMessage.data] : [...messages, receivedMessage.data];
          });
        break;
      default:
        break;
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessageWhenReady(socket, {
      type: "sendmsg",
      data: { userName: userId, roomId, message },
    });
    setMessage("");
  };
  
  const getUserInfo = (id) => {
    for (let el of userInfo) {
      if (el.id == id) {
        return { name: el.name, profileImage: el.profileImage };
      }
    }
  };

  return (
    <main className="main-screen main-chat">
      {Array.isArray(messages) && 
        messages.map((msg) => (
          <Message
            message={msg}
            userId={userId}
            senderInfo={getUserInfo(msg.sender)}
          />
        ))}
      <div className="reply">
        <div className="reply__column">
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={handleMessageChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default ChatScreen;
