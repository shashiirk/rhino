import { createContext, useEffect, useState } from 'react';

export const OnlineStatusContext = createContext(navigator.onLine);

export const OnlineStatusProvider = (props) => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });
    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener('offline', () => {
        setOnlineStatus(false);
      });
      window.removeEventListener('online', () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {props.children}
    </OnlineStatusContext.Provider>
  );
};
