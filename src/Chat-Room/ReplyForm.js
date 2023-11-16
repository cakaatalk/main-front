import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSmileWink, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import useTimeAndBattery from '../Common/UseTimeAndBattery';
import "../css/components/replyForm.css"


function ReplyForm() {
  const {currentTime} = useTimeAndBattery();

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <form className="reply">
      <div className="reply__column">
        <FontAwesomeIcon icon={faPlusSquare} size="lg" />
      </div>
      <div className="chat__timestamp">{formatTime(currentTime)}</div> {/*API*/}
      <div className="reply__column">
        <input type="text" placeholder="Write a message..." />
        <FontAwesomeIcon icon={faSmileWink} size="lg" />
        <button>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </form>
  );
}

export default ReplyForm;
