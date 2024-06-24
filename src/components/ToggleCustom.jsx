import React from 'react';
import { Toggle } from '@ui-kitten/components';
import { Text, View } from 'react-native';
import MainStyles from '../styles/MainStyle';
import { colors } from '../styles/Colors';

export default ToggleCustom = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <View style={MainStyles.flexRowCenter}>
      <Text style={{ marginRight: 5, fontSize: 15, color: colors.MAIN_BLUE_CLIENT }}>{checked ? "Đang bật" : "Đang tắt"}</Text>
      <Toggle
        checked={checked}
        onChange={onCheckedChange}
      />
    </View>
  );
};