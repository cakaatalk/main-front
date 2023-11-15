import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMusic, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ScreenHeader() {
  return (
    <header className="screen-header">
      <h1 className="screen-header__title">More</h1>
      <div className="screen-header__icons">
        {/* <FontAwesomeIcon icon={faSearch} size="lg" /> */}
        {/* <FontAwesomeIcon icon={faMusic} size="lg" /> */}
        {/* <Link to="/settings">
          <FontAwesomeIcon icon={faCog} size="lg" />
        </Link> */}
      </div>
    </header>
  );
}

export default ScreenHeader;
