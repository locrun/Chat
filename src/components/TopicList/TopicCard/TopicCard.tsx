import React from 'react';
import s from './TopicCard.module.scss';
import { Topics } from 'types/topics';
import { createClientChats } from 'api/routes/clientChat';
import { usePage } from 'components/app/pagesProvider/PagesProvider';
import { PageType } from 'shared/types';

interface TopicCardProps {
  topics: Topics[];
}

export const TopicCard = ({ topics }: TopicCardProps) => {
  const { changePage } = usePage();

  const onClick = async (id: number) => {
    await createClientChats({
      topic: id
    });
    changePage(PageType.CHAT);
  };

  return (
    <>
      {topics.map((card: Topics) => {
        return (
          <div key={card.id} className={s.card}>
            <div>
              <div className={s.flex2}>
                <span className={s.image}>
                  <img src={card.logo} alt="logo" />
                </span>
                <h3 className={s.title}>{card.title}</h3>
              </div>
              {card.description && (
                <span
                  className={s.text}
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
              )}
            </div>
            <button onClick={() => onClick(card.id)} className={s.linkButton}>
              Написать
            </button>
          </div>
        );
      })}
    </>
  );
};
