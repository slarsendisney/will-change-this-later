'use client';

import React, { useContext, useState } from 'react';
import { createMessenger } from '@userlike/messenger';

const createApi = async () => {
  const result = await createMessenger({
    version: 1,
    widgetKey: "WIDGET_KEY",
  });
  const { api } = (result as any).value;
  return api;
};

interface MessengerContextAttributes {
  userlike: any
}

const MessengerContext =
  React.createContext<MessengerContextAttributes>({
    userlike: undefined
  });

export const MessengerProvider = ({ ...props }) => {
  const userlike: any = createApi();

  return (
    <MessengerContext.Provider
      value={{
        userlike
      }}
      {...props}
    />
  );
};

export const useMessenger = () =>
  useContext(MessengerContext);

export default MessengerContext;