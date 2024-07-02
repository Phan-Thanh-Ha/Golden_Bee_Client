import React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
import MainStyles from '../styles/MainStyle';
import CardNewJob from './CardNewJob';
import CardJobDone from './CardJobDone';
import CardZaloChat from './CardZaloChat';
import CardChat from './CardChat';
import { color } from 'react-native-reanimated';
import { colors } from '../styles/Colors';
import CardDefault from './CardDefault';
import { dataNotifi } from '../Screens/data';
import CardNotifi from './CardNotifi';

export default TabNotification = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab
        style={{ height: 40 }}
        title='Chat'>
        <View>
          <CardZaloChat />
          <Layout style={MainStyles.tabContainerDefault}>
            <Text style={MainStyles.textDefault}></Text>
          </Layout>
        </View>
      </Tab>
      <Tab style={{ height: 40 }} title="Thông báo">
        {dataNotifi?.length > 0 ? (
          <FlatList
            data={dataNotifi}
            renderItem={({ item, index }) => (
              <CardNotifi
                key={index}
                data={item}
              />
            )}
          />
        ) : (
          <CardDefault title="Chưa có việc làm hoàn thành" />
        )}
      </Tab>
    </TabView>
  );
}