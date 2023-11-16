// ReplyForm.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSmileWink, faArrowUp } from '@fortawesome/free-solid-svg-icons';

function ReplyForm() {
  return (
    <form className="reply">
      <div className="reply__column">
        <FontAwesomeIcon icon={faPlusSquare} size="lg" />
      </div>
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
