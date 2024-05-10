import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { checkRoles } from 'helpers/checkRoles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LastMessage from './LastMessage';
import { ChatContext } from 'context/Context';
import { getMessagesListCurator } from 'api/routes/curatorChat';
import { getMessagesListClient } from 'api/routes/clientChat';
import Flex from 'components/common/Flex';
import classNames from 'classnames';
import Avatar from 'components/common/Avatar';
import { Nav } from 'react-bootstrap';

import { getUserLMS } from 'helpers/getUserLMS';

const ChatThread = ({ thread, index }) => {
  const {
    socketChatStatus,
    newMessageSocket,
    setTotalMessagesCount,
    userStatus,
    messagesDispatch,
    setCurrentLmsUser
  } = useContext(ChatContext);

  const isChatClient = checkRoles();

  const fetchMessagesList = async () => {
    messagesDispatch({
      type: 'SET_MESSAGES',
      payload: []
    });
    try {
      setCurrentLmsUser(user ? user : {});

      const { data } = isChatClient
        ? await getMessagesListClient({ id: thread.id })
        : await getMessagesListCurator({ id: thread.id });

      setTotalMessagesCount(data.count);

      messagesDispatch({
        type: 'SET_MESSAGES',
        payload: data.results
      });
    } catch (error) {
      console.log(error);
    }
  };

  const user = getUserLMS(thread.client);

  let userAvatar = user?.profile_image?.image_url_medium
    ? user.profile_image.image_url_medium
    : thread.topic.logo;

  const getFormattedDate = (time, isClient) => {
    if (!time) {
      return '';
    }
    if (isClient) {
      const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(time));
      return formattedDate;
    } else {
      const monthName = new Intl.DateTimeFormat('ru-RU', {
        month: 'long'
      }).format(new Date(time));
      return monthName.charAt(0).toUpperCase() + monthName.slice(1);
    }
  };

  const lastMessage =
    thread.id === newMessageSocket?.data.chat
      ? newMessageSocket?.data
      : thread?.last_message;

  return (
    <Nav.Link
      eventKey={index}
      onClick={() => {
        fetchMessagesList();
      }}
      className={classNames(
        `chat-contact hover-actions-trigger p-3 read-message`,
        {
          'read-message': thread.last_message?.is_read,
          'unread-message': !thread.last_message?.is_read,
          'blocked-message':
            socketChatStatus?.data.chat_id === thread.id ||
            thread.status === 'closed'
        }
      )}
    >
      <Flex justifyContent="center">
        <Avatar
          className={thread.status}
          size={classNames('xl', {
            'status-online':
              userStatus &&
              userStatus.data.user_id === thread.client.id &&
              userStatus?.data.status === 'online'
          })}
          src={userAvatar}
        />
        <div className="flex-1 chat-contact-body ms-2 d-md-none d-lg-block">
          <Flex justifyContent="between">
            <h6 className="mb-0 chat-contact-title">
              {user ? user.name : thread.topic.title}
            </h6>
            <span className="message-time fs-11">
              {getFormattedDate(thread.last_message?.created_at, isChatClient)}
            </span>
          </Flex>
          <div className="min-w-0">
            <div className="chat-contact-content pe-3">
              <LastMessage lastMessage={lastMessage} />

              {thread.last_message?.is_read ? (
                <FontAwesomeIcon
                  icon="check-double"
                  size="xs"
                  className="position-absolute bottom-4 end-0"
                  color="rgb(182 193 210)"
                />
              ) : (
                <FontAwesomeIcon
                  icon="check"
                  size="xs"
                  className="position-absolute bottom-4 end-0"
                  color="rgb(182 193 210)"
                />
              )}
            </div>
          </div>
        </div>
      </Flex>
    </Nav.Link>
  );
};

ChatThread.propTypes = {
  thread: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default ChatThread;
