import React, { useState, useEffect } from "react";
import { useSocket } from "../../Contexts/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faSmileWink,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import {} from "../../Contexts/AuthContext";
import Message from "./Message";

function ChatScreen() {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const roomId = localStorage.getItem("roomId");

  useEffect(() => {
    fetchUserInfo();
    //메시지 받아오는 API

    sendMessageWhenReady(socket, { type: "joinRoom", data: { roomId } });

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, []);

  useEffect(() => {
    console.log("useEffect : " + messages);
  }, [messages]);

  function sendMessageWhenReady(client, message) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    } else {
      setTimeout(() => sendMessageWhenReady(client, message), 100);
    }
  }

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
      .then((res) => setUserName(res.id))
      .catch((error) => console.error("Error:", error));
  };

  const handleSocketMessage = (event) => {
    const receivedMessage = JSON.parse(event.data);

    switch (receivedMessage.type) {
      case "getmsg":
        setMessages((messages) => {
          return [...messages, receivedMessage.data];
        });
        console.log(
          "messages : " + messages,
          "newMessage : ",
          receivedMessage.data
        );
        break;
      default:
        break;
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log({ userName, roomId, message });
    socket.send(
      JSON.stringify({ type: "sendmsg", data: { userName, roomId, message } })
    );
    setMessage("");
  };

  return (
    <main className="main-screen main-chat">
      {messages.map((message) => (
        <Message message={message} userName={userName} />
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
