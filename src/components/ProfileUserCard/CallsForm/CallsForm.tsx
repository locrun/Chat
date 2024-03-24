import React, { FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { CallsList } from './CallsList/CallsList';
import {
  CallType,
  taskFormRadioButtons
} from 'data/ProfileUserData/callsFormRadioButtons';
import cn from 'classnames';
import s from './CallsForm.module.scss';

export const CallsForm = () => {
  const [active, setActive] = useState(0);
  const [callComments, setCallComments] = useState('');
  const [callType, setCallType] = useState(CallType.incoming);

  const getCallTypeLabel = (callType: CallType) => {
    switch (callType) {
      case CallType.outcoming:
        return 'исходящий';
      case CallType.incoming:
        return 'входящие';
      case CallType.telephone:
        return 'телефон';
      case CallType.skype:
        return 'скайп';
      case CallType.held:
        return 'состоялся';
      default:
        break;
    }
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(callComments);
    console.log(callType);
  };

  return (
    <>
      <form className={s.form} onSubmit={submitHandler}>
        <label className={s.label}>Добавить звонок</label>
        <div className={s.callsButtonsWrapper}>
          {taskFormRadioButtons.map(({ id, value }) => {
            return (
              <div
                key={id}
                className={s.flexButton}
                onClick={() => {
                  setActive(id), setCallType(value);
                }}
              >
                <button
                  className={cn(s.switch, {
                    [s.switchActive]: active === id
                  })}
                />
                <span className={s.text}>{getCallTypeLabel(value)}</span>
              </div>
            );
          })}
        </div>
        <TextareaAutosize
          minRows={1}
          maxRows={6}
          className={s.textarea}
          value={callComments}
          placeholder="Комментарии к звонку"
          onChange={({ target }) => setCallComments(target.value)}
        />
        <button className={s.submitButton} type="submit">
          Добавить
        </button>
      </form>
      <CallsList
        callListData={[
          {
            callType: 'Исходящий / телефон',
            callTheme: 'повышение тарифа'
          }
        ]}
      />
    </>
  );
};
