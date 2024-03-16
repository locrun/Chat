import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Message from './Message';
import SimpleBarReact from 'simplebar-react';
import ThreadInfo from './ThreadInfo';
import { ChatContext } from 'context/Context';
import s from './content.module.scss';
import NewDay from './NewDay';

const ChatContentBody = ({ thread }) => {
  const messagesEndRef = useRef();

  const { messages, scrollToBottom, setScrollToBottom } =
    useContext(ChatContext);

  const threadMessages = messages.slice().reverse();

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
          {threadMessages?.map(
            ({ text, created_at, is_my_message, files }, index) => {
              return (
                <div key={index}>
                  {checkDayDiff(created_at)}
                  <Message
                    message={text}
                    time={created_at}
                    files={files}
                    is_my={is_my_message}
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
