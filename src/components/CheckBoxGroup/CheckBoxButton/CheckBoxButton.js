import React from 'react';
import PropTypes from 'prop-types';
import s from './CheckBoxButton.module.scss';

const CheckBoxButton = ({ checkbox, onChange }) => {
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
// CheckBoxButton.propTypes = {
//   checkbox: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired
// };

const objShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired
};
CheckBoxButton.propTypes = {
  checkbox: PropTypes.shape(objShape).isRequired,
  onChange: PropTypes.func.isRequired
};
export default CheckBoxButton;
