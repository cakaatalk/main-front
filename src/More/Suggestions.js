import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';

function Suggestions() {
  return (
    <div className="more-suggestions">
      <h4 className="more-suggestions__title">Suggestions</h4>
      <div className="more-suggestions__icons">
        <div className="more-suggestions__icon">
          <div className="more-suggestions__icon-image">
            <FontAwesomeIcon icon={faQuoteRight} />
          </div>
          <span className="more-suggestions__icon-text">Kokoa Story</span>
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
