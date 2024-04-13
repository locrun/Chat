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
  handleTypeTopicChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  unreadMessagesCount: number;
}

export const ControlMessages = ({
  topics,
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
                Переадресовать в
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
              <span className={s.label}>Нет менеджера</span>
              <button className={s.button} onClick={assignCuratorHandler}>
                Взять себе
              </button>
            </div>
            <div className={s.flexCol}>
              <span className={s.label}>
                Открыт <span className={s.date}>Пн 09.10.23. 14:41</span>
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
