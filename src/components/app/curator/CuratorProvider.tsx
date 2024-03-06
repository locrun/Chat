import React, { useState } from 'react';

import { ChatList } from 'shared/types/curator';

export const CuratorContext = React.createContext<{
  isLoading: boolean;
  dialogs: ChatList[];
  setDialogs: React.Dispatch<React.SetStateAction<ChatList[]>>;
  currentId: number | null;
  setCurrentId: React.Dispatch<React.SetStateAction<number | null>>;
} | null>(null);

export interface CuratorProviderProps {
  children: React.ReactNode;
}

export interface CuratorContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dialogs: ChatList[];
  setDialogs: React.Dispatch<React.SetStateAction<ChatList[]>>;
  currentId: number | null;
  setCurrentId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CuratorProvider = ({ children }: CuratorProviderProps) => {
  const [isLoading] = useState(false);
  const [dialogs, setDialogs] = useState<ChatList[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);

  return (
    <CuratorContext.Provider
      value={{
        isLoading,
        dialogs,
        setDialogs,
        currentId,
        setCurrentId
      }}
    >
      {children}
    </CuratorContext.Provider>
  );
};
export default CuratorProvider;
