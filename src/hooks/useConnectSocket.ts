import { useEffect, useContext } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import WebSocketApi from 'api/socket';

import { ChatContext } from 'context/Context';

export const useConnectSocket = () => {
  const { keycloak } = useKeycloak();

  const {
    setUserStatus,
    setChatStatus,
    setNewMessageSocket,
    setReadChatMessage,
    setNewChat,
    setAssignCurator
  } = useContext(ChatContext);

  useEffect(() => {
    const connectSocket = () => {
      WebSocketApi.createConnection(keycloak.token!);
    };

    if (!WebSocketApi.socket) {
      connectSocket();
    }

    if (WebSocketApi.socket) {
      WebSocketApi.socket.onmessage = function (event) {
        const data = JSON.parse(event.data);

        if (data.event_type === 'update_status') {
          setUserStatus({ ...data });
        }

        if (data.event_type === 'new_message') {
          setNewMessageSocket(data);
        }
        if (data.event_type === 'new_chat') {
          setNewChat({ ...data });
        }

        if (data.event_type === 'assign_curator') {
          setAssignCurator({ ...data });
        }
        if (data.event_type === 'read_chat_message') {
          setReadChatMessage({ ...data });
        }
        if (data.event_type === 'update_chat_status') {
          setChatStatus({ ...data });
        }
      };

      const pingInterval = setInterval(() => {
        if (
          WebSocketApi.socket &&
          WebSocketApi.socket.readyState === WebSocketApi.socket.OPEN
        ) {
          console.log('Ping server');
          WebSocketApi.socket.send(JSON.stringify({}));
        }
      }, 15000);

      return () => {
        clearInterval(pingInterval);
      };
    }
  }, []);
};
