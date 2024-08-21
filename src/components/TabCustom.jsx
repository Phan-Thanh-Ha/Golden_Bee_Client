import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Tab, TabView } from '@ui-kitten/components';
import CardNewJob from './CardNewJob';
import CardDefault from './CardDefault';
import { useSelector } from 'react-redux';
import { checkCaseStatus } from '../utils/CheckCaseStaus';
import { SCREEN_HEIGHT } from '../styles/MainStyle';
import TabJobDone from './TabJobDone';
import { PropTypes } from 'prop-types';
import { myOrderDefault } from '../Screens/data';
import { USER_TEST } from '../Constants';

export const TabCustom = ({ height }) => {
  const userLogin = useSelector(state => state.main.userLogin);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const myOrdersAccepted = useSelector(state => state.main.myOrdersAccepted);

  const renderFooter = () => <View style={styles.footer} />;
  return (
    <View style={{ height, padding: 10 }}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={styles.tabView}>
        {/* Bùa */}
        {
          userLogin?.Phone === USER_TEST ? (
            <Tab style={{ height: 40 }} title="Việc mới">
              <FlatList
                data={[myOrderDefault]}
                renderItem={({ item, index }) => (
                  <CardNewJob key={index} data={item} />
                )}
                ListFooterComponent={renderFooter}
              />
            </Tab>
          ) : (
            <Tab style={{ height: 40 }} title="Việc mới">
              {acceptedOrder?.OrderId ? (
                <FlatList
                  data={[acceptedOrder]}
                  renderItem={({ item, index }) => (
                    <CardNewJob key={index} data={item} />
                  )}
                  ListFooterComponent={renderFooter}
                />
              ) : (
                <CardDefault
                  title={
                    checkCaseStatus(
                      userLogin?.StateOnline,
                      userLogin?.Surplus,
                      myOrdersAccepted?.length,
                      userLogin?.State,
                    ).status
                  }
                />
              )}
            </Tab>
          )
        }
        <Tab style={{ height: 40 }} title="Đã hoàn thành">
          <TabJobDone />
        </Tab>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  footer: {
    height: SCREEN_HEIGHT * 0.05,
  },
});

TabCustom.defaultProps = {
  height: SCREEN_HEIGHT * 0.8,
  modalRef: null,
  modalJobDoneRef: null,
};
TabCustom.propTypes = {
  height: PropTypes.number,
  modalRef: PropTypes.object,
  modalJobDoneRef: PropTypes.object,
};

export default TabCustom;
