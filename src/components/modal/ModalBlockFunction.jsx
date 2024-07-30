import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import AlertModal from '../AlertModal';
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import { colors } from '../../styles/Colors';
import axios from 'axios';

const ModalBlockFunction = ({
  data = {},
  isModalVisible,
  setModalVisible,
  onConfirm,
  title,
  amount = 0,
}) => {
  const [imageUrl, setImageUrl] = useState('');

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    onConfirm();
    // console.log('User confirmed');
    hideModal();
  };

  useEffect(() => {
    QRCodeACB(data);
  }, [data]);

  const QRCodeACB = async data => {
    try {
      let requestData = JSON.stringify({
        accountNo: '22772868',
        accountName: 'CTY CP DAU TU THUONG MAI ONG VANG',
        acqId: '970416',
        addInfo: title,
        amount: amount,
        template: 'print',
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.vietqr.io/v2/generate',
        headers: {
          'Content-Type': 'application/json',
          Cookie:
            'connect.sid=s%3A1VQ0Mid2KYT7kJ0rbRr4vmKixGsaBX1n.2frCeq8MFDEjhGWWNqycze3%2FwrcwAOCcgujLV94bTJA',
        },
        data: requestData,
      };

      const response = await axios.request(config);
      if (response.data && response.data.data.qrDataURL) {
        await setImageUrl(response.data.data.qrDataURL);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertModal
      isVisible={isModalVisible}
      onClose={hideModal}
      isAuto={false}
      onConfirm={handleConfirm}
      title="Thông tin thanh toán"
      backdropCloseable={false}
      isCancelable={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          {imageUrl ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
          ) : null}
        </View>
      </View>
    </AlertModal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.6,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
  card: {
    ...MainStyles.cardJob,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.85,
    resizeMode: 'contain',
  },
});

export default ModalBlockFunction;
