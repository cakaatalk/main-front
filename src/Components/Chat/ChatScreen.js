import React, { useState, useEffect } from "react";
import { useSocket } from "../../Contexts/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import chatService from "../../API/ChatService"
import userService from "../../API/UserService"
import Message from "./Message";

function ChatScreen() {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState();
  const [userInfo, setUserInfo] = useState();
  const [startId, setStartId] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const roomId = localStorage.getItem("roomId");

  useEffect(() => {
    fetchAllUserInfo();
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

  const fetchAllUserInfo = () => {
    const apiUrl = "http://localhost:8080/api/user/findAll";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => setUserInfo(res))
      .catch((error) => console.error("Error:", error));
  };

  const getUserInfo = (id) => {
    for (let el of userInfo) {
      if (el.id == id) {
        return { name: el.name, profileImage: el.profileImage };
      }
    }
  };

  const handleSocketMessage = (event) => {
    const receivedMessage = JSON.parse(event.data);

    switch (receivedMessage.type) {
      case "getmsg":
        setMessages((messages) => {
          return [...messages, receivedMessage.data];
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

  return (
    <main className="main-screen main-chat">
      {messages.map((msg) => (
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
          />
          <button onClick={handleSendMessage}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default ChatScreen;
