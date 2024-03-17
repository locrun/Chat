import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useKeycloak } from '@react-keycloak/web';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';

import { getMessagesListCurator } from 'api/routes/curatorChat';
import { getMessagesListClient } from 'api/routes/clientChat';
import { markChatMessagesAsReadClient } from 'api/routes/clientChat';
import { markChatMessagesAsReadCurator } from 'api/routes/curatorChat';
import Flex from 'components/common/Flex';
import classNames from 'classnames';
import Avatar from 'components/common/Avatar';
import { Nav } from 'react-bootstrap';

import ChatSidebarDropdownAction from './ChatSidebarDropdownAction';
import { ChatContext } from 'context/Context';

const ChatThread = ({ thread, index }) => {
  const { messagesDispatch } = useContext(ChatContext);
  const { keycloak } = useKeycloak();

  const isChatClient = checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
    keycloakRealmRoles.CHAT_USER
  ]);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  const fetchMessagesList = async () => {
    try {
      const { data } = isChatClient
        ? await getMessagesListClient({ id: thread.id })
        : await getMessagesListCurator({ id: thread.id });

      messagesDispatch({
        type: 'SET_MESSAGES',
        payload: data.results
      });

      if (isChatClient) {
        if (thread.last_message) {
          await markChatMessagesAsReadClient({
            chat_id: thread?.id,
            message_id: thread.last_message.id
          });
        }
      } else {
        if (thread.last_message) {
          await markChatMessagesAsReadCurator({
            chat_id: thread?.id,
            message_id: thread.last_message?.id
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFormattedDate = (time, formatOptions) => {
    if (!time) {
      return '';
    }
    const dateTime = new Date(time);
    return new Date(dateTime).toLocaleDateString('ru-RU', formatOptions);
  };

  return (
    <Nav.Link
      eventKey={index}
      onClick={() => fetchMessagesList(index)}
      className={classNames(`chat-contact hover-actions-trigger p-3`, {
        'unread-message': !thread.read,
        'read-message': thread.read,
        'delete-message': thread.status === 'closed'
      })}
    >
      <div className="d-md-none d-lg-block">
        <ChatSidebarDropdownAction />
      </div>
      <Flex justifyContent="center">
        <Avatar className={thread.status} src={thread.topic.logo} size="xl" />
        <div className="flex-1 chat-contact-body ms-2 d-md-none d-lg-block">
          <Flex justifyContent="between">
            <h6 className="mb-0 chat-contact-title">{thread.topic.title}</h6>
            <span className="message-time fs-11"></span>
            <span style={{ fontSize: '12px' }}>
              <span>
                {thread.unread_messages_count > 0 && (
                  <>
                    <span>{thread.unread_messages_count}</span>
                    <span>Не прочитанных сообщений</span>
                  </>
                )}
              </span>
            </span>
          </Flex>
          <div className="min-w-0">
            <div className="chat-contact-content pe-3">
              {/* <LastMessage lastMessage={lastMessage} thread={thread} /> */}
              {getFormattedDate(thread.last_message?.created_at, options)}
              <div className="position-absolute bottom-0 end-0 hover-hide"></div>
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
