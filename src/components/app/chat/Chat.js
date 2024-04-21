import React, { useContext, useState, useEffect } from 'react';
import { checkRoles } from 'helpers/checkRoles';
import Flex from 'components/common/Flex';
import { markChatMessagesAsReadClient } from 'api/routes/clientChat';
import { markChatMessagesAsReadCurator } from 'api/routes/curatorChat';
import { getCuratorChats } from 'api/routes/curatorChat';
import { getClientChats } from 'api/routes/clientChat';
import { ChatContext } from 'context/Context';
import { Card, Tab } from 'react-bootstrap';
import ChatContent from './content/ChatContent';
import ChatSidebar from './sidebar/ChatSidebar';

const Chat = () => {
  const {
    threadsDispatch,
    readChatMessage,
    newMessageSocket,
    setCurrentThread,
    threads,
    setIsOpenThreadInfo,
    setScrollToBottom,
    key,
    setKey
  } = useContext(ChatContext);
  const isChatClient = checkRoles();

  const [hideSidebar, setHideSidebar] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      if (isChatClient) {
        const { data } = await getClientChats({});
        threadsDispatch({
          type: 'SET_DIALOGS',
          payload: data.results
        });
      }
      if (!isChatClient) {
        const { data } = await getCuratorChats({});
        threadsDispatch({
          type: 'SET_DIALOGS',
          payload: data.results
        });
      }
    };

    if (newMessageSocket || readChatMessage) fetchChats();
  }, [newMessageSocket, isChatClient, readChatMessage]);

  const handleSelect = async e => {
    setHideSidebar(false);

    if (isChatClient) {
      const { data } = await getClientChats({});
      const thread = data.results.find(thread => thread.id === parseInt(e));
      updateChatThread(thread);

      if (thread)
        await markChatMessagesAsReadClient({
          chat_id: thread.id,
          message_id: thread.last_message.id
        });
    }

    if (!isChatClient) {
      const { data } = await getCuratorChats({});
      const thread = data.results.find(thread => thread.id === parseInt(e));
      updateChatThread(thread);
      if (thread)
        await markChatMessagesAsReadCurator({
          chat_id: thread?.id,
          message_id: thread?.last_message.id
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
