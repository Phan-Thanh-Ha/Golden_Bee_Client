import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {Button, Icon} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {mainAction} from '../Redux/Action';
import BottomSheet from '@gorhom/bottom-sheet';
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
    } catch (error) {}
  };

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = ['25%', '50%', '90%'];

  return (
    <View style={{flex: 1, padding: 24}}>
      <Button
        title="Open Bottom Sheet"
        onPress={() => {
          bottomSheetRef.current.expand();
        }}
      />
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Awesome content goes here</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({});
