import { createContext, useEffect, useState } from 'react';

import { onAuthStateChangedListener } from '../utils/firebase/firebase.util';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubsribe = onAuthStateChangedListener(user => {
      console.log(user);
    });

    return unsubsribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
