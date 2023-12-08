import React, { createContext, useState } from 'react';

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const [addedFriends, setAddedFriends] = useState([]);

  return (
    <FriendsContext.Provider value={{ addedFriends, setAddedFriends }}>
      {children}
    </FriendsContext.Provider>
  );
};