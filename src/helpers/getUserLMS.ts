import { ChatContext } from 'context/Context';
import { useContext } from 'react';
import { Client } from 'shared/types/curator';

export const getUserLMS = (thread: Client) => {
  const { lmsUsers } = useContext(ChatContext);

  if (!thread) return null;

  return lmsUsers.find((user: any) => thread.username === user.username);
};
