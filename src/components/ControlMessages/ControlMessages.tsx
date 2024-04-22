import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { useKeycloak } from '@react-keycloak/web';
import { Topics } from 'types/topics';
import { assignCurator } from 'api/routes/curatorChat';
import { ChatContext } from 'context/Context';
import { closeCurrentDialog } from 'api/routes/curatorChat';
import { AssignCuratorParams } from 'shared/types/curator';
import { fetchAccessTokenKeycloak } from 'api/routes/tokenKeycloak';
import { getAdminMembers } from 'api/routes/getAdminMembers';
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
  isMyThreads: boolean;
  handleTypeTopicChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  unreadMessagesCount: number;
}

export const ControlMessages = ({
  topics,
  isMyThreads,
  handleTypeTopicChange,
  unreadMessagesCount
}: ColtrolMessagesProps) => {
  const [curatorsList, setCuratorsList] = useState([]);

  const { keycloak } = useKeycloak();

  const { currentThread, isChatClosed, setIsChatClose } =
    useContext(ChatContext);

  const assignCuratorHandler = () => {
    const params: AssignCuratorParams = {
      chat: currentThread.id,
      curator: keycloak.idTokenParsed?.preferred_username
    };

    if (currentThread) assignCurator(params);
  };

  const handleAssignCurator = (event: ChangeEvent<HTMLSelectElement>) => {
    const params: AssignCuratorParams = {
      chat: currentThread.id,
      curator: event.target.value
    };

    if (currentThread) assignCurator(params);
  };

  const deleteDialogHandler = () => {
    if (currentThread) {
      closeCurrentDialog(currentThread.id);
      setIsChatClose(true);
    }
  };

  useEffect(() => {
    const fetchCuratorList = async () => {
      const { data: keycloak } = await fetchAccessTokenKeycloak();
      const { data } = await getAdminMembers(keycloak.access_token);
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
              <div className={s.unreadCount}>{unreadMessagesCount}</div>
            </div>
          </div>
          <div className={s.redirectSelect}>
            <Form.Select
              className={s.select}
              defaultValue="Переадресовать в"
              onChange={e => handleAssignCurator(e)}
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
        </div>
        {currentThread && (
          <div className={s.buttons}>
            <div className={s.flexCol}>
              <span className={s.label}>
                {isMyThreads && keycloak?.idTokenParsed?.preferred_username}
                {!isMyThreads && 'Нет менеджера'}
              </span>
              <button
                disabled={isMyThreads}
                className={classnames(s.button, { [s.disabled]: isMyThreads })}
                onClick={assignCuratorHandler}
              >
                Взять себе
              </button>
            </div>
            <div className={s.flexCol}>
              <span className={s.label}>
                Открыт{' '}
                <span className={s.date}>
                  {getFormattedDate(currentThread.created_at)}
                </span>
              </span>
              <button
                className={classnames(s.button, s.openButton)}
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
