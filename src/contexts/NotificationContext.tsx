import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
  showCartNotification: () => void;
  isCartNotificationVisible: boolean;
  hideCartNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartNotificationVisible, setIsCartNotificationVisible] = useState(false);

  const showCartNotification = () => {
    setIsCartNotificationVisible(true);
  };

  const hideCartNotification = () => {
    setIsCartNotificationVisible(false);
  };

  const value = {
    showCartNotification,
    isCartNotificationVisible,
    hideCartNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
