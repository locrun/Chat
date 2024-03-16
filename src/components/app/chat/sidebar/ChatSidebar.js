import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useKeycloak } from '@react-keycloak/web';
import keycloakRealmRoles from 'helpers/keycloakRealmRoles';
import { getMessagesListCurator } from 'api/routes/curatorChat';
import { getMessagesListClient } from 'api/routes/clientChat';
import { checkAllRealmRolesAssigned } from 'helpers/utils';
import { Nav } from 'react-bootstrap';
import ChatThread from './ChatThread';
import SimpleBarReact from 'simplebar-react';
import ChatContactsSearch from './ChatContactSearch';
import classNames from 'classnames';

const ChatSidebar = ({ hideSidebar, threads }) => {
  const { keycloak } = useKeycloak();
  const isChatClient = checkAllRealmRolesAssigned(keycloak.realmAccess.roles, [
    keycloakRealmRoles.CHAT_USER
  ]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessagesList = async threads => {
      for (const thread of threads) {
        const { data } = isChatClient
          ? await getMessagesListClient({ id: thread.id })
          : await getMessagesListCurator({ id: thread.id });
        setMessages(data.results);
      }
    };
    fetchMessagesList(threads);
  }, [threads]);

  const displayUnreadMessageCount = messages => {
    return messages.filter(item => {
      return !item?.is_read;
    });
  };
  const unreadMessageCount = displayUnreadMessageCount(messages).length;

  return (
    <div className={classNames('chat-sidebar', { 'start-0': hideSidebar })}>
      <div className="contacts-list">
        <SimpleBarReact style={{ height: '100%', minWidth: '65px' }}>
          <Nav className="border-0">
            {threads.map(thread => (
              <ChatThread
                key={thread.id}
                thread={thread}
                messageCount={unreadMessageCount}
                index={thread.id}
              />
            ))}
          </Nav>
        </SimpleBarReact>
      </div>
      <ChatContactsSearch />
    </div>
  );
};

ChatSidebar.propTypes = {
  hideSidebar: PropTypes.bool,
  threads: PropTypes.any
};

export default ChatSidebar;
