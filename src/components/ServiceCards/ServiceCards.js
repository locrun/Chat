import React from 'react';
import { Link } from 'react-router-dom';
import s from './ServiceCards.module.scss';
import cards from '../../data/serviceCard/serviceCard';

export const ServiceCards = () => {
  return (
    <div className={s.grid}>
      {cards.map(card => {
        return (
          <div key={card.id} className={s.card}>
            <div>
              <div className={s.flex2}>
                <span className={s.image}>
                  <img src={card.icon} alt="" />
                </span>
                <h3 className={s.title}>{card.title}</h3>
              </div>
              {card.text && <span className={s.text}>{card.text}</span>}
              {card.list && (
                <ul className={s.list}>
                  {card.list?.map((list, id) => {
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
    </div>
  );
};
