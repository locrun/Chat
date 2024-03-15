import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'react-bootstrap';
import { ChatContext } from 'context/Context';
import ChatContentHeader from './ChatContentHeader';
import ChatContentBody from './ChatContentBody';
import MessageTextArea from './MessageTextArea';

const ChatContent = ({ setHideSidebar, hideSidebar }) => {
  const { threads } = useContext(ChatContext);

  return (
    <Tab.Content className="card-chat-content">
      {threads.map((thread, index) => (
        <Tab.Pane key={index} eventKey={thread.id} className="card-chat-pane">
          <ChatContentHeader
            thread={thread}
            setHideSidebar={setHideSidebar}
            hideSidebar={hideSidebar}
          />
          <ChatContentBody thread={thread} />
        </Tab.Pane>
      ))}
      <MessageTextArea />
    </Tab.Content>
  );
};

ChatContent.propTypes = {
  setHideSidebar: PropTypes.func.isRequired,
  hideSidebar: PropTypes.bool
};

export default ChatContent;
