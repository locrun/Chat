import React, { useContext } from 'react';
import { ChatContext } from 'context/Context';
import { Topics } from 'types/topics';

import { createClientChats } from 'api/routes/clientChat';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';

import s from './TopicCard.module.scss';

interface TopicCardProps {
  topics: Topics[];
}

export const TopicCard = ({ topics }: TopicCardProps) => {
  const { changePage } = usePage();
  const { setIsAddNewChat } = useContext(ChatContext);

  const handleNewChatDialog = async (id: number) => {
    await createClientChats({
      topic: id
    });

    setIsAddNewChat(true);
    changePage(PageType.CHAT);
  };

  return (
    <>
      {topics.map((dialog: Topics) => {
        return (
          <div key={dialog.id} className={s.card}>
            <div>
              <div className={s.flex2}>
                <span className={s.image}>
                  <img src={dialog.logo} alt="logo" />
                </span>
                <h3 className={s.title}>{dialog.title}</h3>
              </div>
              {dialog.description && (
                <span
                  className={s.text}
                  dangerouslySetInnerHTML={{ __html: dialog.description }}
                />
              )}
            </div>
            <button
              onClick={() => handleNewChatDialog(dialog.id)}
              className={s.linkButton}
            >
              Написать
            </button>
          </div>
        );
      })}
    </>
  );
};
