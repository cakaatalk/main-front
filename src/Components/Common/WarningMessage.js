import React from "react";
import "../../css/components/warningMessage.css";

function WarningMessage({ message }) {
  return <div className="warning-message">{message}</div>;
}

export default WarningMessage;
