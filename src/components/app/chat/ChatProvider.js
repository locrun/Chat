import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from 'context/Context';
import users from 'data/people';
import groups from 'data/chat/groups';
import { arrayReducer } from 'reducers/arrayReducer';

const ChatProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(null);
  const [newChat, setNewChat] = useState(null);
  const [socketChatStatus, setSocketChatStatus] = useState(null);
  const [readChatMessage, setReadChatMessage] = useState(null);
  const [socketAssignCurator, setSocketAssignCurator] = useState(null);
  const [newMessageSocket, setNewMessageSocket] = useState(null);
  const [socketDeletedMessage, setSocketDeletedMessage] = useState(null);
  const [socketUpdatedMessage, setSocketUpdatedMessage] = useState(null);

  const [messages, messagesDispatch] = useReducer(arrayReducer, []);
  const [threads, threadsDispatch] = useReducer(arrayReducer, []);
  const [currentThread, setCurrentThread] = useState(null);
  const [textAreaInitialHeight, setTextAreaInitialHeight] = useState(32);
  const [isOpenThreadInfo, setIsOpenThreadInfo] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [key, setKey] = useState(0);
  const [lmsUsers, setLmsUsers] = useState([]);
  const [profileCardVisible, setProfileCardVisible] = useState(false);
  const [currentLmsUser, setCurrentLmsUser] = useState(null);
  const [isChatClosed, setIsChatClose] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const [limit, setLimit] = useState(50);
  const [limitMessages, setLimitMessages] = useState(null);
  const [previousMessages, setPreviousMessages] = useState(null);
  const [totalMessagesCount, setTotalMessagesCount] = useState(null);
  const [totalChatsCount, setTotalChatsCount] = useState(null);

  const [messagesLoading, setMessagesLoading] = useState(false);

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
    limit,
    setLimit,
    limitMessages,
    setLimitMessages,
    messagesLoading,
    setMessagesLoading,
    previousMessages,
    setPreviousMessages,
    totalChatsCount,
    setTotalChatsCount,
    searchValue,
    setSearchValue,
    socketUpdatedMessage,
    setSocketUpdatedMessage,
    socketDeletedMessage,
    setSocketDeletedMessage,
    totalMessagesCount,
    setTotalMessagesCount,
    users,
    userStatus,
    setUserStatus,
    socketChatStatus,
    setSocketChatStatus,
    readChatMessage,
    setReadChatMessage,
    newChat,
    setNewChat,
    socketAssignCurator,
    setSocketAssignCurator,
    newMessageSocket,
    setNewMessageSocket,
    groups,
    threads,
    getUser,
    messages,
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
    setKey,
    lmsUsers,
    setLmsUsers,
    profileCardVisible,
    setProfileCardVisible,
    currentLmsUser,
    setCurrentLmsUser,
    isChatClosed,
    setIsChatClose
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = { children: PropTypes.node.isRequired };

export default ChatProvider;
