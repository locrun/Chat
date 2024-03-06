import React, { ChangeEvent, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import classnames from 'classnames';
import { Topics } from 'types/topics';
import { ChatContext } from 'context/Context';
import s from './ControlMessages.module.scss';
import { closeCurrentDialog } from 'api/routes/curatorChat';

interface ColtrolMessagesProps {
  topics: Topics[];
  handleChangeTopicType: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeRedirection: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ControlMessages = ({
  topics,
  handleChangeTopicType,
  handleChangeRedirection
}: ColtrolMessagesProps) => {
  const { currentThread } = useContext(ChatContext);

  const redirectListItems = [
    {
      item: 'В корзину',
      value: 'trash'
    },
    {
      item: 'В спам',
      value: 'spam'
    }
  ];

  const deleteDialog = () => {
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
              onChange={e => handleChangeTopicType(e)}
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
          <div className={s.redirectSelect}>
            <span className={s.label}>Спам</span>
            <Form.Select
              className={s.select}
              onChange={e => handleChangeRedirection(e)}
            >
              {redirectListItems.map(item => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.item}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        </div>
        <div className={s.buttons}>
          <div className={s.flexCol}>
            <span className={s.label}>Нет менеджера</span>
            <button className={s.button}>Взять себе</button>
          </div>
          <div className={s.flexCol}>
            <span className={s.label}>
              Открыт <span className={s.date}>Пн 09.10.23. 14:41</span>
            </span>
            <button
              className={classnames(s.button, s.openButton)}
              onClick={deleteDialog}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlMessages;
