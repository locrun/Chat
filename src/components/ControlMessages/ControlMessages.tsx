import React, { ChangeEvent, useContext } from 'react';
import Form from 'react-bootstrap/Form';

import { useKeycloak } from '@react-keycloak/web';
import { Topics } from 'types/topics';
import { assignCurator } from 'api/routes/curatorChat';
import { ChatContext } from 'context/Context';
import { closeCurrentDialog } from 'api/routes/curatorChat';
import { AssignCuratorParams } from 'shared/types/curator';
import classnames from 'classnames';
import s from './ControlMessages.module.scss';

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

  const deleteDialogHandler = () => {
    if (currentThread) {
      closeCurrentDialog(currentThread.id);
      setIsChatClose(true);
    }
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
              onChange={e => console.log(e)}
            >
              <option className={s.default} disabled hidden>
                Переадресовать в
              </option>
              {[
                { id: 0, title: 'В Мусорку' },
                { id: 1, title: 'В Спам' }
              ].map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.title}
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
