import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import MainStyles from '../../styles/MainStyle';
import { TabCustom } from '../../components/TabCustom';
import Box from '../../components/Box';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <LayoutGradientBlue>
      <LogoBeeBox color={colors.WHITE} sizeImage={70} sizeText={20} />
      <View style={MainStyles.containerTabContent}>
        <TabCustom />
      </View>
      <Box height={100} />
    </LayoutGradientBlue>
  );
};

export default HomeScreen;
