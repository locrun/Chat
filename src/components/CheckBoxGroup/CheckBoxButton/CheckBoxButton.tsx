import React from 'react';

import s from './CheckBoxButton.module.scss';
import { CheckBoxData } from 'data/checkboxData';

interface CheckBoxButtonProps {
  checkbox: CheckBoxData;
  onChange: (checkbox: CheckBoxData) => void;
}

const CheckBoxButton = ({ checkbox, onChange }: CheckBoxButtonProps) => {
  return (
    <div className={s.checkBoxWrapper}>
      <input
        type="checkbox"
        className={s.checkbox}
        name={checkbox.title}
        checked={checkbox.isChecked}
        onChange={() => onChange(checkbox)}
      />
      <label
        key={checkbox.title}
        htmlFor={checkbox.title}
        className={s.label}
        onClick={() => onChange(checkbox)}
      >
        {checkbox.title}
      </label>
    </div>
  );
};

export default CheckBoxButton;
