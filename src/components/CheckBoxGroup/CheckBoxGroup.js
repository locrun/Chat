import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxButton from './CheckBoxButton/CheckBoxButton.js';
import s from '../CheckBoxGroup/CheckBoxButton/CheckBoxButton.module.scss';

const CheckBoxGroup = ({ checkboxes, handleChange }) => {
  return (
    <form className={s.checkboxList}>
      {checkboxes.map(checkbox => (
        <CheckBoxButton
          key={checkbox.id}
          checkbox={checkbox}
          onChange={() => handleChange(checkbox.id)}
        />
      ))}
    </form>
  );
};

const objShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired
};
CheckBoxGroup.propTypes = {
  checkboxes: PropTypes.arrayOf(PropTypes.shape(objShape)).isRequired,
  handleChange: PropTypes.func.isRequired
};
export default CheckBoxGroup;
