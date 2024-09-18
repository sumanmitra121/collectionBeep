import React, { createContext, useState, useContext } from 'react';


const SessionContext = createContext();


export const SessionProvider = ({ children }) => {
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <SessionContext.Provider value={{ selectedSession, setSelectedSession }}>
      {children}
    </SessionContext.Provider>
  );
};


export const useSession = () => useContext(SessionContext);
