import React, { useState, useEffect } from "react";
import { useSocket } from "../../Contexts/SocketContext";
import chatService from "../../API/ChatService";
import userService from "../../API/UserService";
import Message from "./Message";

function ChatScreen({ roomId, userInfo }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState();
  const [startId, setStartId] = useState(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(null);

  useEffect(() => {
    fetchUserInfo();
    fetchMessages();
    sendMessageWhenReady(socket, { type: "joinRoom", data: { roomId } });

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, []);

  useEffect(() => {
    if(scrollPosition == 0) {
      fetchMessages();
      window.scrollTo({
        top: document.documentElement.scrollHeight-10,
      });
    }
  }, [scrollPosition]);

  function sendMessageWhenReady(client, message) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    } else {
      setTimeout(() => sendMessageWhenReady(client, message), 100);
    }
  }

  const fetchMessages = async () => {
    const response = await chatService.getMessages(roomId, startId);
    setStartId(response.nextId);
    setMessages((prevMessages) => {
      let newMessages = [];
      if (startId) {
        newMessages = response.messages.concat(prevMessages);
      } else {
        newMessages = response.messages;
      }
      return newMessages;
    });   
  };

  const fetchUserInfo = async () => {
    const response = await userService.searchProfile();
    setUserId(response.id);
  };

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
    handleScrollToBottom(true);
  };

  const getUserInfo = (id) => {
    for (let el of userInfo) {
      if (el.id == id) {
        return { name: el.name, profileImage: el.profileImage };
      }
    }
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const num = scrollTop + clientHeight >= scrollHeight - 100;
    setIsNearBottom(num);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleNewMessage();
  }, [messages]);

  const handleScrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
      });
  };

  const handleNewMessage = () => {
    if(isNearBottom) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
      });
    }
  };

  return (
    <main>
      <div className="main-screen main-chat">
        {!isNearBottom && (
          <button className="scroll-to-bottom-btn" onClick={handleScrollToBottom}>
            이동
          </button>
        )}
        {Array.isArray(messages) &&
          messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              userId={userId}
              senderInfo={getUserInfo(msg.sender)}
            />
          ))}
      </div>
      <footer className="reply">
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
      </footer>
    </main>
  );
}

export default ChatScreen;