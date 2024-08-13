import React from 'react';
import {Spinner, Toggle} from '@ui-kitten/components';
import {PropTypes} from 'prop-types';

const BtnToggle = ({value, onChange, isLoading}) => {
  return isLoading ? (
    <Spinner size="small" />
  ) : (
    <Toggle checked={value} onChange={onChange} />
  );
};
BtnToggle.defaultProps = {
  value: false,
  isLoading: false,
};
BtnToggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default BtnToggle;
