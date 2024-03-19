import React, { ChangeEvent, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import classnames from 'classnames';
import { Topics } from 'types/topics';
import { ChatContext } from 'context/Context';
import s from './ControlMessages.module.scss';
import { assignCurator, closeCurrentDialog } from 'api/routes/curatorChat';
import { AssignCuratorParams } from 'shared/types/curator';

interface ColtrolMessagesProps {
  topics: Topics[];
  handleTypeTopicChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const ControlMessages = ({
  topics,
  handleTypeTopicChange
}: ColtrolMessagesProps) => {
  const { currentThread } = useContext(ChatContext);
  console.log(currentThread);

  const assignCuratorHandler = () => {
    const params: AssignCuratorParams = {
      chat: currentThread.id,
      // TODO curator
      curator: ''
    };
    if (currentThread) assignCurator(params);
  };

  const deleteDialogHandler = () => {
    if (currentThread) closeCurrentDialog(currentThread.id);
  };

  return (
    <div className={s.container}>
      <div className={s.controlsWrapper}>
        <div className={s.selectGroup}>
          <div className={s.topicsSelect}>
            <span className={s.label}>Обращения</span>
            <Form.Select
              className={s.select}
              onChange={e => handleTypeTopicChange(e)}
            >
              {topics.map(item => {
                return (
                  <option key={item.title} value={item.id}>
                    {item.title}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className={s.topicsSelect}>
            <span className={s.label}>Обращения</span>
            <Form.Select
              className={s.select}
              onChange={e => handleTypeTopicChange(e)}
            >
              {topics.map(item => {
                return (
                  <option key={item.title} value={item.id}>
                    {item.title}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        </div>
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
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
