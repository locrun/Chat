import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ChatContext } from 'context/Context';

import { Nav } from 'react-bootstrap';
import ChatThread from './ChatThread';
import SimpleBarReact from 'simplebar-react';
import ChatContactsSearch from './ChatContactSearch';

import classNames from 'classnames';

const ChatSidebar = ({ hideSidebar, threads }) => {
  const { chatStatus, newChat, userStatus } = useContext(ChatContext);

  return (
    <div className={classNames('chat-sidebar', { 'start-0': hideSidebar })}>
      <div className="contacts-list">
        <SimpleBarReact style={{ height: '100%', minWidth: '65px' }}>
          <Nav className="border-0">
            {threads.map(thread => (
              <ChatThread
                thread={thread}
                chatStatus={chatStatus}
                newChat={newChat}
                userStatus={userStatus?.data?.status}
                index={thread.id}
                key={thread.id}
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
