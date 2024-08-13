import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const ImageUploader = () => {
  const [imageUri] = useState(null);
  const [previewUri, setPreviewUri] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const previewModalRef = useRef(null);

  const openBottomSheet = () => {
    bottomSheetModalRef.current.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current.dismiss();
  };

  // const openPreviewModal = uri => {
  //   setPreviewUri(uri);
  //   previewModalRef.current.present();
  // };

  const closePreviewModal = () => {
    setPreviewUri(null);
    previewModalRef.current.dismiss();
  };

  // const handleTakePhoto = () => {
  //   ImagePicker.launchCamera({}, response => {
  //     if (response.assets) {
  //       openPreviewModal(response.assets[0].uri);
  //     }
  //   });
  // };

  // const handleChoosePhoto = () => {
  //   ImagePicker.launchImageLibrary({}, response => {
  //     if (response.assets) {
  //       openPreviewModal(response.assets[0].uri);
  //     }
  //   });
  // };

  const handleSaveImage = async () => {
    if (!previewUri) return;

    const formData = new FormData();
    formData.append('file', {
      uri: previewUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
  };

  const handleCancel = () => {
    setPreviewUri(null);
    closePreviewModal();
    closeBottomSheet();
  };

  return (
    <BottomSheetModalProvider>
      <TouchableOpacity style={styles.pressable} onPress={openBottomSheet}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <Text>Update Image</Text>
        )}
      </TouchableOpacity>

      <BottomSheetModal ref={bottomSheetModalRef} snapPoints={['25%']}>
        <View style={styles.sheetContent}>
          <Button title="Take Photo" onPress={handleTakePhoto} />
          <Button title="Choose Photo" onPress={handleChoosePhoto} />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </BottomSheetModal>

      <BottomSheetModal ref={previewModalRef} snapPoints={['50%']}>
        <View style={styles.previewContent}>
          {previewUri && (
            <Image source={{uri: previewUri}} style={styles.previewImage} />
          )}
          <Button title="Save" onPress={handleSaveImage} />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sheetContent: {
    padding: 20,
    alignItems: 'center',
  },
  previewContent: {
    padding: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default ImageUploader;
