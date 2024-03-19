import React, { useContext, useState } from 'react';
import Flex from 'components/common/Flex';
import { ChatContext } from 'context/Context';
import { Card, Tab } from 'react-bootstrap';
import ChatContent from './content/ChatContent';
import ChatSidebar from './sidebar/ChatSidebar';

const Chat = () => {
  const {
    threads,
    setIsOpenThreadInfo,
    setCurrentThread,
    setScrollToBottom,
    key,
    setKey
  } = useContext(ChatContext);

  const [hideSidebar, setHideSidebar] = useState(false);

  const handleSelect = e => {
    setHideSidebar(false);
    setIsOpenThreadInfo(false);
    const thread = threads.find(thread => thread.id === parseInt(e));
    setCurrentThread(thread);
    setScrollToBottom(true);
    setKey(e);
  };

  return (
    <Tab.Container
      id="left-tabs-example"
      activeKey={key}
      onSelect={handleSelect}
    >
      <Card className="card-chat overflow-hidden">
        <Card.Body as={Flex} className="p-0 h-100">
          <ChatSidebar threads={threads} hideSidebar={hideSidebar} />
          <ChatContent
            setHideSidebar={setHideSidebar}
            hideSidebar={hideSidebar}
          />
        </Card.Body>
      </Card>
    </Tab.Container>
  );
};

export default Chat;
