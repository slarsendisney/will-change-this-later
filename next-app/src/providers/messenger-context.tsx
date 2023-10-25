'use client';

import React, { useContext, useState, useEffect } from 'react';
import { createMessenger } from '@userlike/messenger';

const createApi = async () => {
  const result = await createMessenger({
    version: 1,
    widgetKey: "2e2f911a8f594f10a171a24424fdd25a7f63c1eb6ff04efab2a3b7a2d30b75d3",
  });
  const { api } = (result as any).value;
  return api;
};

const toggleVisibility = (userlike) => {
  userlike.maximize(); // opens the chat

  // visibility shows the widget button 
  // userlike.setVisibility({
  //   main: true,
  //   button: false,
  //   notifications: false,
  // });
}

interface MessengerContextAttributes {
  userlike: any
  toggleVisibility: (userlike) => void;
}

const MessengerContext =
  React.createContext<MessengerContextAttributes>({
    userlike: undefined,
    toggleVisibility: (userlike) => { }
  });

export const MessengerProvider = ({ ...props }) => {
  const [userlike, setUserlike] = useState();

  useEffect(() => {
    const init = async () => {
      const userliketest: any = await createApi();
      setUserlike(userliketest)
    }
    init()

  }, []);

  return (
    <MessengerContext.Provider
      value={{
        userlike,
        toggleVisibility
      }}
      {...props}
    />
  );
};

export const useMessenger = () =>
  useContext(MessengerContext);

export default MessengerContext;