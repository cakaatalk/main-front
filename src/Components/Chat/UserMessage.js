function UserMessage({ avatar, name, time, badgeCount, chatId }) {
    return (
      <div className="user-component-link">
        <div className="user-component">
          <div className="user-component__avatar-container">
            <img
              src={avatar}
              className="user-component__avatar user-component__avatar--xl"
              alt={name}
            />
          </div>
          <div className="user-component__content">
            <div className="user-component__name">
              <h4 className="user-component__title">{name}</h4>
            </div>
            <div className="user-component__info">
              {/* <span className="user-component__time">{time}</span> */}
              {badgeCount > 0 && <div className="badge">{badgeCount}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default UserMessage;