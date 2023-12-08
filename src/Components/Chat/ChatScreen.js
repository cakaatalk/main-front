import React, { useState, useEffect } from "react";
import { useSocket } from "../Context/socketContext";
import Message from "./Message";

function ChatScreen() {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const roomName = localStorage.getItem("roomName");
  let userName = "";

  useEffect(() => {
    fetchUserInfo();
    socket.send(JSON.stringify({ type: "initmsg", data: { roomName } }));
    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, []);

  const fetchUserInfo = () => {
    const apiUrl = "http://localhost:8080/auth/info";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data)) // 받아온 info를 userName에 주입하는 로직 필요
      .catch((error) => console.error("Error:", error));
  };

  const handleSocketMessage = (event) => {
    const receivedMessage = JSON.parse(event.data);
    console.log(receivedMessage);

    switch (receivedMessage.type) {
      case "initmsg":
      case "getmsg":
        setMessages(receivedMessage.data);
        break;
      default:
        break;
    }
  };

  return (
    <main className="main-screen main-chat">
      {messages.map((message, index) => (
        <Message message={message} userName={userName} />
      ))}
    </main>
  );
}

export default ChatScreen;
