import React from 'react';
import s from './ServiceCard.module.scss';
import cards from '../../data/serviceCard/serviceCard';

export const ServiceCard = () => {
  return (
    <div className={s.flex}>
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

            <button className={s.button}>Написать</button>
          </div>
        );
      })}
    </div>
  );
};
