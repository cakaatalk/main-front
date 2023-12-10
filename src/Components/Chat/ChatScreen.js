import React, { useState, useEffect } from "react";
import { useSocket } from "../../Contexts/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {} from "../../Contexts/AuthContext";
import Message from "./Message";

function ChatScreen({ roomId, userInfo }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState();
  console.log(userInfo);
  const [startId, setStartId] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

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

  const fetchMesssages = () => {
    let apiUrl = `http://localhost:8080/api/chat/messages/${roomId}`;
    if (startId) {
      apiUrl = apiUrl + `?startId=${startId}`;
    }
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        setStartId(res.nextId);
        setMessages(res.messages);
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchUserInfo = () => {
    const apiUrl = "http://localhost:8080/api/user/profile";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => setUserId(res.id))
      .catch((error) => console.error("Error:", error));
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
        messages?.map((msg) => (
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
