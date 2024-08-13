import {Pressable, View} from 'react-native';
import MainStyles from '../styles/MainStyle';
import {Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const CardChat = ({data}) => {
  const onpenModal = () => {};
  return (
    <View>
      <Pressable onPress={onpenModal}>
        <View style={MainStyles.containerZaloChat}>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.titleChatZalo}>{data.name}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

CardChat.displayName = 'CardChat';

CardChat.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardChat;
