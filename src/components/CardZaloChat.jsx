import {Image, Pressable, View} from 'react-native';
import {zalo_icon} from '../assets';
import MainStyles from '../styles/MainStyle';
import {Text} from 'react-native';
import React from 'react';

const CardZaloChat = () => {
  const onpenModal = () => {};
  return (
    <View>
      <Pressable onPress={onpenModal}>
        <View style={MainStyles.containerZaloChat}>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.titleChatZalo}>Chat với tổng đài</Text>
            <Image
              source={zalo_icon}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

CardZaloChat.displayName = 'CardZaloChat';

export default CardZaloChat;
