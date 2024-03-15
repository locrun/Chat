import React, { useContext, useState } from 'react';
import Flex from 'components/common/Flex';
import { ChatContext } from 'context/Context';
import { Card, Tab } from 'react-bootstrap';
import ChatContent from './content/ChatContent';
import ChatSidebar from './sidebar/ChatSidebar';

const Chat = () => {
  const { threads, setIsOpenThreadInfo, setCurrentThread, setScrollToBottom } =
    useContext(ChatContext);

  const [hideSidebar, setHideSidebar] = useState(false);

  const handleSelect = e => {
    setHideSidebar(false);
    setIsOpenThreadInfo(false);
    const thread = threads.find((thread, index) => thread.id === parseInt(e));
    setCurrentThread(thread);
    setScrollToBottom(true);
  };

  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={1}
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
