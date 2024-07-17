import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {colors} from '../styles/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {mainAction} from '../Redux/Action';

const AdminWebView = () => {
  const userLogin = useSelector(state => state.main.userLogin);
  const [link, setLink] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    getLink();
  }, []);

  const getLink = async () => {
    try {
      const params = {
        Json: userLogin?.Password,
        func: '',
      };
      const password = await mainAction.DecryptString(params, dispatch);
      const linkNew = `https://crm.cak-solution.com/loginmb?username=${userLogin?.Phone}&password=${password}`;
      setLink(linkNew);
    } catch {
      //
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: link}}
        onError={event => alert(`Lỗi ${event.nativeEvent.title}`)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={false}
        mixedContentMode={'compatibility'}
        startInLoadingState={true}
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              zIndex: 1,
              position: 'absolute',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size="large" color={colors.MAIN_BLUE_CLIENT} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    marginTop: 40,
  },
});

export default AdminWebView;
