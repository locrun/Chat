import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import WebSocketApi from 'api/socket';

export const useConnectSocket = () => {
  const { keycloak } = useKeycloak();
  const [socketMessage, setSocketMessage] = useState('');
  const [userStatus, setUserStatus] = useState(null);
  const [newChat, setNewChat] = useState(null);
  const [assignCuratorState, setAssignCuratorState] = useState(null);
  const [readChatMessage, setReadChatMessage] = useState(null);

  useEffect(() => {
    const connectSocket = () => {
      WebSocketApi.createConnection(keycloak.token!);
    };

    connectSocket();

    if (WebSocketApi.socket) {
      WebSocketApi.socket.onmessage = function (event) {
        const data = JSON.parse(event.data);

        if (data.event_type === 'new_message') {
          setSocketMessage(data);
        }

        if (data.event_type === 'update_status') {
          setUserStatus({ ...data });
        }
        if (data.event_type === 'new_chat') {
          setNewChat({ ...data });
        }

        if (data.event_type === 'assign_curator') {
          setAssignCuratorState({ ...data });
        }
        if (data.event_type === 'read_chat_message') {
          setReadChatMessage({ ...data });
        }
      };
    }

    // const pingInterval = setInterval(() => {
    //   if (
    //     WebSocketApi.socket &&
    //     WebSocketApi.socket.readyState === WebSocket.OPEN
    //   ) {
    //     WebSocketApi.socket.send('ping');
    //   }
    // }, 15000);

    // return () => {
    //   clearInterval(pingInterval);
    // };
  }, [keycloak.token]);

  return {
    assignCuratorState,
    readChatMessage,
    socketMessage,
    userStatus,
    newChat
  };
};
