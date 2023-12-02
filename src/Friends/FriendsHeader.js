import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog} from '@fortawesome/free-solid-svg-icons';
import "../css/components/friendsHeader.css"

function FriendsHeader() {
  return (
    <>
      <header className="screen-header">
        <h1 className="screen-header__title">친구 목록</h1>
        <div className="screen-header__icons">
          <FontAwesomeIcon icon={faSearch} size="lg" />
          <FontAwesomeIcon icon={faCog} size="lg" />
        </div>
      </header>

    </>
  );
}

export default FriendsHeader;
