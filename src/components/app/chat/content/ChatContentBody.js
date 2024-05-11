import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import SimpleBarReact from 'simplebar-react';
import ThreadInfo from './ThreadInfo';
import { ChatContext } from 'context/Context';
import { checkRoles } from 'helpers/checkRoles';
import { getUserLMS } from 'helpers/getUserLMS';
import Message from './Message';
import NewDay from './NewDay';
import { MessageSkeleton } from 'components/Skeletons/MessageSkeleton/MessageSkeleton';
import { deleteMessage, updateMessage } from 'api/routes/curatorChat';

const ChatContentBody = ({ thread }) => {
  const messagesEndRef = useRef();
  const scrollableNodeRef = React.createRef();

  const {
    totalMessagesCount,
    limitMessages,
    messagesLoading,
    //setLimitMessages,
    readChatMessage,
    setNewMessageSocket,
    currentThread,
    messages,
    scrollToBottom,
    setScrollToBottom
  } = useContext(ChatContext);

  const { ref, inView } = useInView({
    threshold: 0
  });

  const isClient = checkRoles();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const [messageId, setMessageId] = useState(null);

  const sortedMessages = messages?.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  useEffect(() => {
    if (inView) {
      if (limitMessages < totalMessagesCount) {
        //setLimitMessages(prev => prev + 10);
      }
    }
  }, [inView, sortedMessages]);

  useEffect(() => {
    if (scrollToBottom && sortedMessages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      setScrollToBottom(false);
    }
  }, [scrollToBottom, sortedMessages]);

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

  const onDeleteMessage = async id => {
    try {
      await deleteMessage(id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const params = {
      text: editedMessage,
      message_type: 'text'
    };

    const fetchUpdateMessage = async () => {
      try {
        await updateMessage(messageId, params);
        setEditedMessage('');
      } catch (error) {
        console.error(error);
      }
    };
    setNewMessageSocket(null);
    !isEditing && messageId && editedMessage && fetchUpdateMessage();
  }, [editedMessage, messageId, isEditing]);

  const onUpdateMessage = async id => {
    setMessageId(id);
    setIsEditing(true);
  };

  return (
    <div className="chat-content-body" style={{ display: 'inherit' }}>
      <ThreadInfo thread={thread} isOpenThreadInfo={true} />
      <SimpleBarReact
        scrollableNodeProps={{ ref: scrollableNodeRef }}
        style={{ height: '100%' }}
      >
        {messagesLoading && <MessageSkeleton />}
        {sortedMessages.length >= 10 && (
          <div
            ref={ref}
            style={{
              height: '10px'
            }}
          />
        )}
        <div className="chat-content-scroll-area">
          {sortedMessages?.map(
            (
              { text, created_at, is_my_message, files, is_read, id },
              index
            ) => {
              return (
                <div key={index}>
                  {checkDayDiff(created_at)}
                  <Message
                    message={text}
                    time={created_at}
                    files={files}
                    avatar={userAvatar}
                    is_my={is_my_message}
                    data={{
                      id,
                      messageId,
                      is_read_message,
                      is_read
                    }}
                    setNewMessageSocket={setNewMessageSocket}
                    isClient={isClient}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editedMessage={editedMessage}
                    setEditedMessage={setEditedMessage}
                    onDeleteMessage={() => onDeleteMessage(id)}
                    onUpdateMessage={() => onUpdateMessage(id)}
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
