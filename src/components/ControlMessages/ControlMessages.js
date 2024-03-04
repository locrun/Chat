import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TopicsContext } from 'context/Context';
import Form from 'react-bootstrap/Form';
import classnames from 'classnames';
import s from './ControlMessages.module.scss';
import TopicsProvider from 'components/app/topics/TopicsProvider';

const Controls = ({ handleChangeTopicType, handleChangeRedirection }) => {
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

  const { topics } = useContext(TopicsContext);

  return (
    <div className={s.container}>
      <div className={s.controlsWrapper}>
        <div className={s.selectGroup}>
          <div className={s.topicsSelect}>
            <span className={s.label}>Обращения</span>
            <Form.Select
              className={s.select}
              onChange={e => handleChangeTopicType && handleChangeTopicType(e)}
            >
              {topics.map(item => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.item}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className={s.redirectSelect}>
            <span className={s.label}>Спам</span>
            <Form.Select
              className={s.select}
              onChange={e =>
                handleChangeTopicType && handleChangeRedirection(e)
              }
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
            <button className={classnames(s.button, s.openButton)}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  handleChangeTopicType: PropTypes.func.isRequired,
  handleChangeRedirection: PropTypes.func.isRequired
};

const ControlMessages = () => {
  return (
    <TopicsProvider>
      <Controls />
    </TopicsProvider>
  );
};
export default ControlMessages;
