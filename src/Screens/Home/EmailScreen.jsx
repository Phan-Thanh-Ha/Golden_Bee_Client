import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import MainStyles from '../../styles/MainStyle';
import Box from '../../components/Box';
import TabNotification from '../../components/TabNotification';

const EmailScreen = () => {
  return (
    <LayoutGradientBlue>
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
