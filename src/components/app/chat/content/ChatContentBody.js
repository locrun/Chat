import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Message from './Message';
import SimpleBarReact from 'simplebar-react';
import ThreadInfo from './ThreadInfo';
import { ChatContext } from 'context/Context';
import { useConnectSocket } from 'hooks/useConnectSocket';
import NewDay from './NewDay';

const ChatContentBody = ({ thread }) => {
  const messagesEndRef = useRef();
  const socketMessage = useConnectSocket();

  const { messages, messagesDispatch, scrollToBottom, setScrollToBottom } =
    useContext(ChatContext);

  const sortedMessages = messages.sort((a, b) => {
    return new Date(a.created_at) - new Date(b.created_at);
  });
  useEffect(() => {
    const handleNewMessage = newMessage => {
      messagesDispatch({
        type: 'SET_MESSAGES',
        payload: [...messages, newMessage]
      });
    };

    if (socketMessage.socketMessage.event_type === 'new_message') {
      const newMessageData = socketMessage.socketMessage.data;
      if (!messages.some(message => message.id === newMessageData.id)) {
        handleNewMessage(newMessageData);
      }
    }
  }, [socketMessage, messages, messagesDispatch]);

  useEffect(() => {
    if (scrollToBottom) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);

  let prevDay = null;

  const checkDayDiff = date => {
    const messageTime = new Date(date);
    const currentDate = messageTime.toDateString();

    if (currentDate !== prevDay) {
      prevDay = currentDate;
      return <NewDay messageTime={messageTime} />;
    }
    return null;
  };

  return (
    <div className="chat-content-body" style={{ display: 'inherit' }}>
      <ThreadInfo thread={thread} isOpenThreadInfo={true} />
      <SimpleBarReact style={{ height: '100%' }}>
        <div className="chat-content-scroll-area">
          {sortedMessages?.map(
            ({ text, created_at, is_my_message, files, is_read }, index) => {
              return (
                <div key={index}>
                  {checkDayDiff(created_at)}
                  <Message
                    message={text}
                    time={created_at}
                    files={files}
                    avatar={thread?.topic?.logo}
                    is_my={is_my_message}
                    is_read={is_read}
                  />
                </div>
              );
            }
          )}
        </div>
        <div ref={messagesEndRef} />
      </SimpleBarReact>
    </div>
  );
};

ChatContentBody.propTypes = {
  thread: PropTypes.object.isRequired
};

export default ChatContentBody;
