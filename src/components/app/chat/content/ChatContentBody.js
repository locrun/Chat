import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import SimpleBarReact from 'simplebar-react';
import ThreadInfo from './ThreadInfo';
import { ChatContext } from 'context/Context';

import { getUserLMS } from 'helpers/getUserLMS';
import NewDay from './NewDay';

const ChatContentBody = ({ thread }) => {
  const messagesEndRef = useRef();

  const {
    readChatMessage,
    currentThread,
    messages,
    scrollToBottom,
    setScrollToBottom
  } = useContext(ChatContext);

  const sortedMessages = messages?.sort((a, b) => {
    return new Date(a.created_at) - new Date(b.created_at);
  });

  useEffect(() => {
    if (scrollToBottom) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const user = getUserLMS(thread.client);

  let userAvatar = user?.profile_image?.image_url_medium
    ? user.profile_image.image_url_medium
    : thread.topic.logo;

  const is_read_message = currentThread?.id === readChatMessage?.data.chat_id;

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
                    avatar={userAvatar}
                    is_my={is_my_message}
                    is_read_currentMessage={{
                      currentThread,
                      is_read_message,
                      is_read
                    }}
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
