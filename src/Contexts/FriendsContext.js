import React, { createContext, useState, useEffect } from 'react';

export const FriendsContext = createContext();

export const FriendsProvider = ({ children, userId }) => { 
  const localStorageKey = `addedFriends-${userId}`; 

  const [addedFriends, setAddedFriends] = useState(() => {
    const savedAddedFriends = localStorage.getItem(localStorageKey);
    return savedAddedFriends ? JSON.parse(savedAddedFriends) : [];
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(addedFriends));
  }, [addedFriends, localStorageKey]);

  return (
    <FriendsContext.Provider value={{ addedFriends, setAddedFriends }}>
      {children}
    </FriendsContext.Provider>
  );
};