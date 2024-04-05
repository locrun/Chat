import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { checkRoles } from 'helpers/checkRoles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LastMessage from './LastMessage';
import { ChatContext } from 'context/Context';
import { getCuratorChats } from 'api/routes/curatorChat';
import { getMessagesListCurator } from 'api/routes/curatorChat';
import { getMessagesListClient } from 'api/routes/clientChat';
import { markChatMessagesAsReadClient } from 'api/routes/clientChat';
import { markChatMessagesAsReadCurator } from 'api/routes/curatorChat';
import Flex from 'components/common/Flex';
import classNames from 'classnames';
import Avatar from 'components/common/Avatar';
import { Nav } from 'react-bootstrap';

import { getUserLMS } from 'helpers/getUserLMS';

const ChatThread = ({ thread, index, newChat }) => {
  const {
    userStatus,
    chatStatus,
    currentThread,
    readChatMessage,
    threadsDispatch,
    messagesDispatch,
    setCurrentLmsUser
  } = useContext(ChatContext);

  const isClient = checkRoles();

  useEffect(() => {
    const fetchDialogs = async () => {
      const { data } = await getCuratorChats({});
      if (data)
        threadsDispatch({
          type: 'SET_DIALOGS',
          payload: data?.results
        });
    };
    if (newChat && newChat?.data) {
      fetchDialogs();
    }
  }, [newChat]);

  const fetchMessagesList = async () => {
    try {
      setCurrentLmsUser(user ? user : {});

      const { data } = isClient
        ? await getMessagesListClient({ id: thread.id })
        : await getMessagesListCurator({ id: thread.id });

      messagesDispatch({
        type: 'SET_MESSAGES',
        payload: data.results
      });

      let lastElement = data.results.at(1);

      if (isClient) {
        if (lastElement) {
          await markChatMessagesAsReadClient({
            chat_id: thread?.id,
            message_id: lastElement.id + 1
          });
        }
      } else {
        if (lastElement) {
          await markChatMessagesAsReadCurator({
            chat_id: thread?.id,
            message_id: lastElement.id + 1
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const user = getUserLMS(thread.client);

  let userAvatar = user?.profile_image?.image_url_medium
    ? user.profile_image.image_url_medium
    : thread.topic.logo;

  const getFormattedDate = time => {
    if (!time) {
      return '';
    }
    const monthName = new Intl.DateTimeFormat('ru-RU', {
      month: 'long'
    }).format(new Date(time));
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  const is_read_message = currentThread?.id === readChatMessage?.data.chat_id;

  return (
    <Nav.Link
      eventKey={index}
      onClick={() => fetchMessagesList()}
      className={classNames(`chat-contact hover-actions-trigger p-3`, {
        'unread-message': !is_read_message,
        'read-message': is_read_message || currentThread,
        'blocked-message':
          thread.status === 'closed' || chatStatus?.data.chat_id === thread.id
      })}
    >
      <Flex justifyContent="center">
        <Avatar
          className={thread.status}
          size={classNames('xl', {
            'status-online': userStatus && userStatus?.data.status === 'online'
          })}
          src={userAvatar}
        />
        <div className="flex-1 chat-contact-body ms-2 d-md-none d-lg-block">
          <Flex justifyContent="between">
            <h6 className="mb-0 chat-contact-title">
              {user ? user.username : thread.topic.title}
            </h6>
            <span className="message-time fs-11">
              {getFormattedDate(thread.last_message?.created_at)}
            </span>
          </Flex>
          <div className="min-w-0">
            <div className="chat-contact-content pe-3">
              <LastMessage lastMessage={thread?.last_message} />

              <FontAwesomeIcon
                icon={
                  is_read_message || currentThread ? 'check-double' : 'check'
                }
                size="xs"
                className="position-absolute bottom-4 end-0"
                color="rgb(182 193 210)"
              />
            </div>
          </div>
        </div>
      </Flex>
    </Nav.Link>
  );
};

ChatThread.propTypes = {
  thread: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  newChat: PropTypes.any,
  chatStatus: PropTypes.any
};

export default ChatThread;
