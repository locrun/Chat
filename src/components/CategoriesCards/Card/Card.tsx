import React from 'react';
import { Link } from 'react-router-dom';

import s from './Card.module.scss';
import { Topics } from 'shared/types/topics';

interface CardProps {
  topics: Topics[];
}

export const Card = ({ topics }: CardProps) => {
  return (
    <>
      {topics.map((card: any) => {
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
              {card.list && (
                <ul className={s.list}>
                  {card.list?.map((list: any, id: any) => {
                    return (
                      <li key={id} className={s.listItem}>
                        {list.title}
                      </li>
                    );
                  })}
                </ul>
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
