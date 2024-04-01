import { ChatContext } from 'context/Context';
import { useContext } from 'react';
import { LmsUser } from 'shared/types';
import { Client } from 'shared/types/curator';

export const getUserLMS = (thread: Client) => {
  const { lmsUsers } = useContext(ChatContext);

  if (!thread) return null;

  return lmsUsers.find((user: LmsUser) => thread.username === user.username);
};
