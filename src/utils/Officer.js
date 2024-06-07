export const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('phoneNumber');
    navigation.navigate(ScreenNames.AUTH_HOME);
  } catch (error) {
    console.error('Failed to logout:', error);
  }
};
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error('Failed to get value:', error);
  }
};

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Failed to set value:', error);
  }
};
