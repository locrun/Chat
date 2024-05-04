import React, { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { ChatContext } from 'context/Context';
import { Nav } from 'react-bootstrap';
import ChatThread from './ChatThread';
import SimpleBarReact from 'simplebar-react';
import ChatContactsSearch from './ChatContactSearch';

import classNames from 'classnames';

const ChatSidebar = ({ hideSidebar, threads }) => {
  const { setLimit, limit, totalChatsCount } = useContext(ChatContext);

  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inView) {
      if (limit < totalChatsCount) {
        setLimit(limit => limit + 10);
      }
    }
  }, [inView]);

  return (
    <div className={classNames('chat-sidebar', { 'start-0': hideSidebar })}>
      <div className="contacts-list">
        <SimpleBarReact style={{ height: '100%', minWidth: '65px' }}>
          <Nav className="border-0">
            {threads.map(thread => (
              <ChatThread thread={thread} index={thread.id} key={thread.id} />
            ))}
          </Nav>
          {threads.length > 0 && <div ref={ref} style={{ height: '10px' }} />}
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
