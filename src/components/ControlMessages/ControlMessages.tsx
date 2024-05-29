import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { useKeycloak } from '@react-keycloak/web';
import { Topics } from 'types/topics';
import { setAssignCurator } from 'api/routes/curatorChat';
import { ChatContext } from 'context/Context';
import { closeCurrentDialog } from 'api/routes/curatorChat';
import { AssignCuratorParams } from 'shared/types/curator';
import { fetchAccessTokenKeycloak } from 'api/tokenKeycloak';
import { getAdminMembers } from 'api/getAdminMembers';
import classnames from 'classnames';
import s from './ControlMessages.module.scss';

export interface ChatManager {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: unknown[];
  requiredActions: unknown[];
  notBefore: number;
}

interface ColtrolMessagesProps {
  topics: Topics[];
  handleTypeTopicChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const ControlMessages = ({
  topics,
  handleTypeTopicChange
}: ColtrolMessagesProps) => {
  const [curatorsList, setCuratorsList] = useState([]);

  const { keycloak } = useKeycloak();

  const {
    socketAssignCurator,
    setSocketAssignCurator,
    totalChatsCount,
    currentThread,
    isChatClosed,
    setIsChatClose
  } = useContext(ChatContext);

  const assignThreadToSelf = async () => {
    const params: AssignCuratorParams = {
      chat: currentThread.id,
      curator: keycloak.idTokenParsed?.preferred_username
    };

    await setAssignCurator(params);
  };

  const assignThreadToUser = async (event: ChangeEvent<HTMLSelectElement>) => {
    const params: AssignCuratorParams = {
      chat: currentThread?.id,
      curator: event.target.value
    };

    await setAssignCurator(params);
    event.target.value = 'Переадресовать';
  };

  const deleteDialogHandler = () => {
    if (currentThread) {
      closeCurrentDialog(currentThread.id);
      setIsChatClose(true);
    }
  };

  useEffect(() => {
    const fetchCuratorList = async () => {
      const access_token = await fetchAccessTokenKeycloak();
      localStorage.setItem(
        'persist:root',
        JSON.stringify({ tokens: JSON.stringify(access_token) })
      );
      const { data } = await getAdminMembers(access_token);

      setCuratorsList(data);
    };
    fetchCuratorList();
  }, []);

  const getFormattedDate = (time: string) => {
    const date = new Date(time);
    const day = date.toLocaleString('ru-RU', { weekday: 'short' });
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    const formattedDate = `${capitalizedDay} ${date.toLocaleDateString(
      'ru-RU',
      { day: '2-digit', month: '2-digit', year: '2-digit' }
    )}. ${date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
    return formattedDate;
  };

  useEffect(() => {
    setSocketAssignCurator(null);
  }, [currentThread]);

  return (
    <div className={s.container}>
      <div className={s.controlsWrapper}>
        <div className={s.selectGroup}>
          <div className={s.topicsSelect}>
            <span className={s.label}>Обращения</span>
            <div className={s.selectWrapper}>
              <Form.Select
                className={s.select}
                onChange={e => handleTypeTopicChange(e)}
              >
                <option className={s.default} value="">
                  Все
                </option>
                {topics.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </Form.Select>
              <div className={s.unreadCount}>{totalChatsCount}</div>
            </div>
          </div>

          {currentThread?.curator?.username ===
            keycloak.idTokenParsed?.preferred_username && (
            <div className={s.redirectSelect}>
              <Form.Select
                className={s.select}
                defaultValue="Переадресовать"
                onChange={e => assignThreadToUser(e)}
              >
                <option className={s.default} disabled hidden>
                  Переадресовать
                </option>
                {curatorsList.map((item: ChatManager) => {
                  return (
                    <option key={item.username} value={item.username}>
                      {item.username}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          )}
        </div>
        {currentThread &&
          currentThread.curator?.username ===
            keycloak.idTokenParsed?.preferred_username && (
            <div className={s.buttons}>
              <div className={s.flexCol}>
                <span className={s.label}>
                  {currentThread.curator || socketAssignCurator
                    ? currentThread.curator?.username ||
                      keycloak.idTokenParsed?.preferred_username
                    : 'Нет менеджера'}
                </span>
                <button
                  disabled={
                    currentThread.curator || socketAssignCurator || isChatClosed
                  }
                  className={classnames(s.button, {
                    [s.disabled]:
                      currentThread.curator ||
                      socketAssignCurator ||
                      isChatClosed
                  })}
                  onClick={assignThreadToSelf}
                >
                  Взять себе
                </button>
              </div>
              <div className={s.flexCol}>
                <span className={s.label}>
                  Открыт &nbsp;
                  <span className={s.date}>
                    {getFormattedDate(currentThread.created_at)}
                  </span>
                </span>
                <button
                  className={classnames(s.button, s.openButton, {
                    [s.disabled]: isChatClosed
                  })}
                  onClick={deleteDialogHandler}
                  disabled={isChatClosed}
                >
                  Закрыть
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
