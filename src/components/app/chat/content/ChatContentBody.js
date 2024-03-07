import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Message from './Message';
import SimpleBarReact from 'simplebar-react';
import ThreadInfo from './ThreadInfo';
import { ChatContext } from 'context/Context';

const ChatContentBody = ({ thread }) => {
  const messagesEndRef = useRef();

  const { messages, scrollToBottom, setScrollToBottom } =
    useContext(ChatContext);

  useEffect(() => {
    if (scrollToBottom) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);

  return (
    <div className="chat-content-body" style={{ display: 'inherit' }}>
      <ThreadInfo thread={thread} isOpenThreadInfo={true} />
      <SimpleBarReact style={{ height: '100%' }}>
        <div className="chat-content-scroll-area">
          {messages?.map(({ text, created_at }, index) => {
            return <Message key={index} message={text} time={created_at} />;
          })}
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
