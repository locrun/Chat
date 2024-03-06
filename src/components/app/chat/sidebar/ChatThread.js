import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Flex from 'components/common/Flex';
import classNames from 'classnames';
import Avatar from 'components/common/Avatar';
import { Nav } from 'react-bootstrap';
import LastMessage from './LastMessage';
import ChatSidebarDropdownAction from './ChatSidebarDropdownAction';
import { ChatContext } from 'context/Context';

const ChatThread = ({ thread, index }) => {
  const { messages } = useContext(ChatContext);

  const message = messages.find(({ id }) => id === thread.messagesId);
  const lastMessage = message?.content[message.content.length - 1];

  //console.log(thread.status);

  return (
    <Nav.Link
      eventKey={index}
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
        <Avatar
          className={thread.status}
          src={'/static/media/4.482e0311a04c21d39072.jpg'}
          size="xl"
        />
        <div className="flex-1 chat-contact-body ms-2 d-md-none d-lg-block">
          <Flex justifyContent="between">
            <h6 className="mb-0 chat-contact-title">{'Peter Dinklage'}</h6>
            <span className="message-time fs-11"></span>
          </Flex>
          <div className="min-w-0">
            <div className="chat-contact-content pe-3">
              <LastMessage lastMessage={lastMessage} thread={thread} />
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
