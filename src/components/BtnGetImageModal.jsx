import React, { useRef, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native-compressor';
import FastImage from 'react-native-fast-image';
import ProgressImage from 'react-native-image-progress';
import { ProgressBar } from '@ui-kitten/components';
import Modal from 'react-native-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import { mainAction } from '../Redux/Action';
import { colors } from '../styles/Colors';
import { APIImage } from '../Config/Api';
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/MainStyle';
import { ic_image_edit, ic_trash, ic_upload, ic_upload_image } from '../assets';

const BtnGetImageModal = ({ setImageUrl, btnWidth, btnHeight }) => {
  const dispatch = useDispatch();
  const [isUpload, setIsUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [currentID, setCurrentID] = useState(1);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);

  const optionsMedia = {
    quality: 0.5,
    format: 'JPEG',
  };

  const choosePhoto = async () => {
    setIsOptionsModalVisible(false); // Đóng modal
    try {
      const image = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (image && image.assets && image.assets.length > 0) {
        setImageToCrop(image.assets[0].uri);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error choosing photo:', error);
    }
  };

  const takePhoto = async () => {
    setIsOptionsModalVisible(false); // Đóng modal
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        presentationStyle: 'overFullScreen',
      });
      if (result && result.assets && result.assets.length > 0) {
        setImageToCrop(result.assets[0].uri);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const cropImageAndUpload = async () => {
    try {
      const croppedImage = await ImageCropPicker.openCropper({
        path: imageToCrop,
        width: btnWidth,
        height: btnHeight,
      });
      setIsModalVisible(false);
      uploadImage(croppedImage.path);
    } catch (error) {
      if (error.message.includes('User cancelled image selection')) {
        cancelCrop();
      } else {
        console.error('Error cropping image:', error);
      }
    }
  };

  const uploadImage = async (imageUri) => {
    setIsLoadingMedia(true);
    try {
      const result = await Image.compress(imageUri, optionsMedia);
      if (!result) {
        setIsLoadingMedia(false);
      } else {
        const arrayTempImage = [result];
        setSelectedImage({
          id: currentID,
          source: result,
          name: result.slice(result.lastIndexOf('/') + 1),
        });
        setIsUpload(true); /////////////////////////////////////////////////// ????????
        API_spCallPostImage(arrayTempImage);
      }
    } catch (error) {
      console.error('Lỗi trong quá trình nén ảnh: ', error);
      setIsLoadingMedia(false);
    }
  };

  const API_spCallPostImage = async (arrayTempImage) => {
    try {
      const formData = new FormData();
      formData.append('AppAPIKey', 'netcoApikey2025');
      formData.append('Code', '1234564');
      formData.append('OfficerId', '123456');
      formData.append('Key', `OVG_Booking`);
      formData.append('Type', `1`);
      formData.append('CustomerCode', '73333');

      arrayTempImage.map((img, i) => {
        formData.append('myFile' + i, {
          uri: img,
          type: 'image/jpeg',
          name: img.slice(img.lastIndexOf('/') + 1),
        });
      });

      const result = await mainAction.API_spCallPostImage(formData, dispatch, (event) => {
        const progress = event.loaded / event.total;
        setUploadProgress(progress);
      });
      if (result.length > 0) {
        setIsUpload(true);
      } else {
        setIsUpload(false);
      }
      console.log('API_spCallPostImage result: ', result);
      if (result.length > 0) {
        setIsLoadingMedia(false);
        setSelectedImage({
          source: APIImage + result[0],
        });
        setImageUrl(result);
        setImageList((prevList) => [
          ...prevList,
          { id: currentID, source: APIImage + result[0] },
        ]);
        setCurrentID((prevID) => prevID + 1);
      }
    } catch (error) {
      setIsLoadingMedia(false);
    }
  };

  const deleteImage = () => {
    setIsUpload(false);
    setSelectedImage(null);
    setImageList(imageList.filter((image) => image.source !== selectedImage.source));
  };

  const toggleOptionsModal = () => {
    setIsOptionsModalVisible(!isOptionsModalVisible);
  };

  const toggleImageModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const cancelCrop = () => {
    setIsModalVisible(false);
    setImageToCrop(null);
  };

  const closeModalOnOutsidePress = () => {
    setIsModalVisible(false);
    setImageToCrop(null);
  };

  return (
    <View style={styles.container}>
      {
        isUpload ? (
          null
        ) : (
          <TouchableOpacity onPress={toggleOptionsModal}>
            <View style={[MainStyles.imageUpload,
            { backgroundColor: colors.WHITE, width: btnWidth, height: btnHeight, justifyContent: 'center', alignItems: 'center' },
            ]}>
              <FastImage
                source={ic_upload}
                style={{ width: 45, height: 45 }}
              />
              <Text style={MainStyles.textBtnUpload}>Tải lên hoặc chụp hình ảnh</Text>
            </View>
          </TouchableOpacity>
        )
      }

      {isLoadingMedia && (
        <View style={styles.imageContainer}>
          {selectedImage && (
            <ProgressImage
              source={{ uri: selectedImage.source }}
              indicator={() => (
                <ActivityIndicator animating={true} color={colors.MAIN_BLUE_CLIENT} size={30} />
              )}
              indicatorProps={{
                size: 80,
                borderWidth: 0,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)',
              }}
              style={styles.image}
            />
          )}
          <ProgressBar progress={uploadProgress} width={200} />
        </View>
      )}

      {selectedImage && !isLoadingMedia && (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={toggleImageModal}>
            <FastImage source={{ uri: selectedImage.source }} style={{ width: btnWidth, height: btnHeight, borderRadius: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        isVisible={isOptionsModalVisible}
        onBackdropPress={toggleOptionsModal}
        style={styles.bottomModal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.option} onPress={choosePhoto}>
            <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 16, fontWeight: '700' }}>Chọn ảnh từ thư viện</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={takePhoto}>
            <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 16, fontWeight: '700' }}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={toggleOptionsModal}>
            <Text style={{ color: colors.ERROR, fontSize: 16, fontWeight: '700' }}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        backdropColor="rgba(0,0,0,0.9)"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
        onBackdropPress={closeModalOnOutsidePress}
      >
        <TouchableWithoutFeedback onPress={closeModalOnOutsidePress}>
          <View style={styles.modalContainer}>
            <FastImage
              source={{ uri: imageToCrop }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
            {
              isUpload ? (
                null
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.uploadButton} onPress={() => {
                    setIsModalVisible(false);
                    uploadImage(imageToCrop);
                  }}>
                    <FastImage
                      source={ic_upload_image}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cropButton} onPress={cropImageAndUpload}>
                    <FastImage
                      source={ic_image_edit}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={cancelCrop}>
                    <FastImage
                      source={ic_trash}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.MAIN_COLOR_CLIENT,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    margin: 20,
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  cropButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  uploadButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});


export default BtnGetImageModal;
