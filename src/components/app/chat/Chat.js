import React, { useContext, useState } from 'react';
import { Card, Tab } from 'react-bootstrap';
import { ChatContext } from 'context/Context';
import { markChatMessagesAsReadClient } from 'api/routes/clientChat';
import { markChatMessagesAsReadCurator } from 'api/routes/curatorChat';
// import { getCuratorChats } from 'api/routes/curatorChat';
// import { getClientChats } from 'api/routes/clientChat';
import Flex from 'components/common/Flex';
import { checkRoles } from 'helpers/checkRoles';
import ChatContent from './content/ChatContent';
import ChatSidebar from './sidebar/ChatSidebar';

const Chat = () => {
  const {
    threads,
    setLimitMessages,
    setCurrentThread,
    setIsOpenThreadInfo,
    setScrollToBottom,
    key,
    setKey
  } = useContext(ChatContext);
  const isChatClient = checkRoles();

  const [hideSidebar, setHideSidebar] = useState(false);

  const handleSelect = async e => {
    setHideSidebar(false);
    setLimitMessages(0);
    if (isChatClient) {
      const thread = threads.find(thread => thread.id === parseInt(e));

      updateChatThread(thread);

      if (thread && thread.last_message && !thread.last_message?.is_read)
        await markChatMessagesAsReadClient({
          chat_id: thread?.id,
          message_id: thread?.last_message?.id
        });
    }

    if (!isChatClient) {
      const thread = threads.find(thread => thread.id === parseInt(e));
      updateChatThread(thread);
      if (thread && thread.last_message && !thread.last_message?.is_read)
        await markChatMessagesAsReadCurator({
          chat_id: thread?.id,
          message_id: thread?.last_message?.id
        });
    }

    function updateChatThread(thread) {
      setCurrentThread(thread);
      setIsOpenThreadInfo(false);
      setScrollToBottom(true);
      setKey(e);
    }
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
