import React from 'react';
import { Link } from 'react-router-dom';

import s from './TopicCard.module.scss';
import { Topics } from 'types/topics';

interface TopicCardProps {
  topics: Topics[];
}

export const TopicCard = ({ topics }: TopicCardProps) => {
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
            <Link to={'/student-chat'} className={s.linkButton}>
              Написать
            </Link>
          </div>
        );
      })}
    </>
  );
};
