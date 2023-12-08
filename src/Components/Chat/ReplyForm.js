import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSocket } from "../Context/socketContext";
import {
  faPlusSquare,
  faSmileWink,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import useTimeAndBattery from "../Common/UseTimeAndBattery";
import "../css/components/replyForm.css";

function ReplyForm() {
  const socket = useSocket();
  const { currentTime } = useTimeAndBattery();
  const [message, setMessage] = useState("");
  const roomName = localStorage.getItem("roomName");

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    socket.send(
      JSON.stringify({ type: "sendmsg", data: { roomName, message } })
    );
    setMessage("");
  };

  return (
    <form className="reply">
      <div className="reply__column">
        <FontAwesomeIcon icon={faPlusSquare} size="lg" />
      </div>
      <div className="chat__timestamp">{formatTime(currentTime)}</div>
      <div className="reply__column">
        <input
          type="text"
          placeholder="Write a message..."
          onChange={handleMessageChange}
        />
        <FontAwesomeIcon icon={faSmileWink} size="lg" />
        <button onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </form>
  );
}

export default ReplyForm;
