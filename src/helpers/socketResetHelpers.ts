import { useContext } from 'react';
import { ChatContext } from 'context/Context';

export const useResetSocketsData = () => {
  const {
    setNewChat,
    setReadChatMessage,
    setSocketChatStatus,
    setSocketAssignCurator,
    setNewMessageSocket,
    setSocketDeletedMessage,
    setSocketUpdatedMessage
  } = useContext(ChatContext);

  const resetSockets = () => {
    setReadChatMessage(null);
    setSocketChatStatus(null);
    setSocketAssignCurator(null);
    setNewChat(null);
    setNewMessageSocket(null);
    setSocketDeletedMessage(null);
    setSocketUpdatedMessage(null);
  };

  return resetSockets;
};
