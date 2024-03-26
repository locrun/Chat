import React, { useState } from 'react';
import { ButtonType } from '../ProfileUserCard';
import { buttons } from 'data/menuPanelButtons';
import cn from 'classnames';
import s from './UserMenuPanel.module.scss';

interface MenuPanelProps {
  renderByButtonType: (buttonType: ButtonType) => void;
}

export const MenuPanel = ({ renderByButtonType }: MenuPanelProps) => {
  const [active, setActive] = useState('history');
  return (
    <div className={s.container}>
      {buttons.map(btn => {
        return (
          <div key={btn.id}>
            <button
              className={cn(s.button, {
                [s.active]: btn.name === active
              })}
              onClick={() => {
                renderByButtonType(
                  ButtonType[btn.name as keyof typeof ButtonType]
                ),
                  setActive(btn.name);
              }}
            >
              {btn.icon}
            </button>
          </div>
        );
      })}
    </div>
  );
};
