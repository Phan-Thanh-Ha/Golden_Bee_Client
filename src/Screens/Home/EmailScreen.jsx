import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import MainStyles from '../../styles/MainStyle';
import Box from '../../components/Box';
import TabNotification from '../../components/TabNotification';
import { useSelector } from 'react-redux';
import BackButton from '../../components/BackButton';

const EmailScreen = () => {
  const userLogin = useSelector((state) => state.main.userLogin);
  return (
    <LayoutGradientBlue>
      {
        userLogin?.OfficerID === 7347 ? (
          <BackButton />
        ) : null
      }
      <ScrollView>
        <LogoBeeBox color={colors.WHITE} sizeImage={70} sizeText={20} />
        <View style={MainStyles.containerTabContent}>
          <TabNotification />
        </View>
        <Box height={100} />
      </ScrollView>
    </LayoutGradientBlue>
  );
}

export default EmailScreen;
