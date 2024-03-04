import React from 'react';
import PropTypes from 'prop-types';
import s from './RadioButton.module.scss';

const RadioButton = ({ value, handleChange, name }) => {
  return (
    <label className={s.label}>
      <input
        name={name}
        value={value}
        className={s.inputRadio}
        type="radio"
        onChange={e => {
          handleChange(e);
        }}
      />
      <span className={s.customRadio}></span>
      <span className={s.text}>Все</span>
    </label>
  );
};
RadioButton.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  name: PropTypes.string
};
export default RadioButton;
