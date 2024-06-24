import React from 'react';
import { Spinner, Toggle } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const BtnToggle = ({ value, onChange, isLoading }) => {
  return (
    isLoading ?
      <Spinner size='small' />
      :
      <Toggle checked={value} onChange={onChange} />
  );
};

export default BtnToggle;
