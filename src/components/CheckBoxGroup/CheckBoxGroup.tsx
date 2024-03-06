import React from 'react';
import CheckBoxButton from './CheckBoxButton/CheckBoxButton';
import { CheckBoxData } from 'data/checkboxData';
import s from '../CheckBoxGroup/CheckBoxButton/CheckBoxButton.module.scss';

interface CheckboxGroupProps {
  checkboxList: CheckBoxData[];
  handleChange: (id: number) => void;
}

const CheckBoxGroup = ({ checkboxList, handleChange }: CheckboxGroupProps) => {
  return (
    <form className={s.checkboxList}>
      {checkboxList.map(checkbox => (
        <CheckBoxButton
          key={checkbox.id}
          checkbox={checkbox}
          onChange={() => handleChange(checkbox.id)}
        />
      ))}
    </form>
  );
};

export default CheckBoxGroup;
