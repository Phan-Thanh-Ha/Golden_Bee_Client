import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {mainAction} from '../Redux/Action';

const Demo = () => {
  const dispatch = useDispatch();

  const clickdemo01 = async () => {
    try {
      const pr = {
        AreaId: 0,
        Code: 4737,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'CPN_spPostOffice_ByAreaId',
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      console.log('🚀 ~ clickdemo01 ~ result:', result);
    } catch (error) {}
  };
  return (
    <View>
      <Button
        onPress={() => {
          clickdemo01();
        }}>
        Click me
      </Button>
      <Text>Demo</Text>
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({});
