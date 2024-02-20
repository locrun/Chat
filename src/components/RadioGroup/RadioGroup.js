import React from 'react';
import PropTypes from 'prop-types';
import classes from './RadioGroup.module.scss';
import RadioButton from './RadioButton/RadioButton';

const RadioGroup = ({ button, selected, handleChange, name = 'Все' }) => {
  return (
    <form className={classes.form}>
      <RadioButton
        name={name}
        value={button}
        checked={selected}
        handleChange={handleChange}
      />
    </form>
  );
};
RadioGroup.propTypes = {
  button: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string
};
export default RadioGroup;
