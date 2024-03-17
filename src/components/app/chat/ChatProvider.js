import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from 'context/Context';
import users from 'data/people';
import groups from 'data/chat/groups';
import { arrayReducer } from 'reducers/arrayReducer';

const ChatProvider = ({ children }) => {
  const [messages, messagesDispatch] = useReducer(arrayReducer, []);
  const [threads, threadsDispatch] = useReducer(arrayReducer, []);
  const [currentThread, setCurrentThread] = useState(null);
  const [textAreaInitialHeight, setTextAreaInitialHeight] = useState(32);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [isOpenThreadInfo, setIsOpenThreadInfo] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (threads.length > 0) {
      setCurrentThread(threads[0]);
      setActiveThreadId(threads[0].id);
    }
  }, [threads]);

  const getUser = thread => {
    let user = {};
    if (thread.type === 'group') {
      const { name, members } = groups.find(({ id }) => id === thread.groupId);
      user = {
        name,
        avatarSrc: members.map(
          member => users.find(({ id }) => id === member.userId).avatarSrc
        )
      };
    } else {
      user = users.find(({ id }) => id === thread.userId);
    }
    return user;
  };

  const value = {
    users,
    groups,
    threads,
    getUser,
    messages,
    activeThreadId,
    setActiveThreadId,
    threadsDispatch,
    messagesDispatch,
    textAreaInitialHeight,
    setTextAreaInitialHeight,
    isOpenThreadInfo,
    setIsOpenThreadInfo,
    currentThread,
    setCurrentThread,
    scrollToBottom,
    setScrollToBottom,
    key,
    setKey
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = { children: PropTypes.node.isRequired };

export default ChatProvider;
