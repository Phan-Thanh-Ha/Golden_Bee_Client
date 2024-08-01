import React from 'react';
import { View } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import MainStyles from '../../styles/MainStyle';
import TabNotification from '../../components/TabNotification';
import { responsivescreen } from '../../utils/responsive-screen';

const EmailScreen = () => {
  return (
    <LayoutGradientBlue>
      <LogoBeeBox color={colors.MAIN_BLUE_CLIENT} sizeImage={70} sizeText={20} />
      <View style={MainStyles.containerTabContent}>
        <TabNotification height={responsivescreen.height('77%')} />
      </View>
    </LayoutGradientBlue>
  );
};

export default EmailScreen;
