import React, { ChangeEvent } from 'react';

import s from './RadioButton.module.scss';

interface RadioButtonProps {
  value: string;
  name: string;
  checked: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  value,
  handleChange,
  name,
  checked
}: RadioButtonProps) => {
  return (
    <label className={s.label}>
      <input
        name={name}
        value={value}
        className={s.inputRadio}
        type="radio"
        checked={checked}
        onChange={e => handleChange(e)}
      />
      <span className={s.customRadio}></span>
      <span className={s.text}>Все</span>
    </label>
  );
};

export default RadioButton;
