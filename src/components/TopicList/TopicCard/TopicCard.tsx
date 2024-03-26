import React, { useContext } from 'react';
import s from './TopicCard.module.scss';
import { Topics } from 'types/topics';

import { createClientChats } from 'api/routes/clientChat';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';
import { ChatContext } from 'context/Context';

interface TopicCardProps {
  topics: Topics[];
}

// if (data) {
//   SocketApi.sendDataToServer('new_chat', {
//     user_id: 3,
//     chat_id: data.id,
//     chat_type: data.chat_type
//   });
// }

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
