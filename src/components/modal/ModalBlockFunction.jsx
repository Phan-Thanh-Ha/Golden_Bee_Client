import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import AlertModal from '../AlertModal';
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import { colors } from '../../styles/Colors';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { mainAction } from '../../Redux/Action';
import BtnDouble from '../BtnDouble';

const ModalBlockFunction = ({
  setIsSuccess,
  data = {},
  isModalVisible,
  setModalVisible,
  onConfirm,
  title,
  amount = 0,
  bookingCode = '',
}) => {
  const [imageUrl, setImageUrl] = useState('');
  // region xử lý thanh toán
  const [start, setStart] = useState(false);
  const [result, setResult] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const dispatch = useDispatch();

  const startChecking = () => {
    setStart(true);
    setCountdown(30);
    setResult(false);
  };
  const handleReset = () => {
    setStart(false);
    setCountdown(30);
    setResult(false);
  }
  const OVG_ACB_spBankRecordTransaction_Check = async () => {
    try {
      const pr = {
        Id: 0,
        // TransactionContent: "OVG-24072405065960"
        TransactionContent: bookingCode
      }
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_ACB_spBankRecordTransaction_Check",
      }
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result[0]?.TransactionStatus === "COMPLETED") {
        return "OK";
      }
      return "NOTOK";
    } catch (e) {
      return "NOTOK";
    }
  }

  //region kiểm tra hóa đơn thanh toán chuyển khoản
  useEffect(() => {
    let intervalId;
    let timeoutId;
    let countdownIntervalId;

    if (start) {
      // kiểm tra sau mỗi 5s
      intervalId = setInterval(async () => {
        const result = await OVG_ACB_spBankRecordTransaction_Check();
        // cons
        if (result === "OK") {
          // nếu kết quả trả về OK thì dừng lại
          setResult(true);
          setTimeout(() => {
            setIsSuccess(true);
            setModalVisible(false);
          }, 2000);
          setStart(false);
        }
      }, 5000);

      countdownIntervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // dừng sau 30 s đếm ngược
      timeoutId = setTimeout(() => {
        handleReset();
      }, 30000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearInterval(countdownIntervalId);
      setCountdown(30); // làm mới lại thời gian
    };
  }, [start]);
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
      backdropCloseable={true}
      isCancelable={false}
      isConfirmable={false}
    >

      <View style={styles.container}>
        <View style={styles.card}>
          {imageUrl ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
          ) : null}
          {
            result ? (
              <View style={MainStyles.flexRowCenter}>
                <Text
                  style={{
                    color: colors.MAIN_BLUE_CLIENT,
                    margin: 10,
                    fontSize: 18,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}
                >Thanh toán thành công 🎉</Text>
              </View>
            ) : (
              <View style={MainStyles.flexRow}>
                <BtnDouble
                  title2={"Đóng"}
                  title1={start ? ` Đang kiểm tra - 🕛 ${countdown} s ` : "Kiểm tra thanh toán"}
                  onConfirm1={() => {
                    startChecking();
                  }}
                  btn1Disable={start}
                  btn2Visible={result}
                />
              </View>
            )
          }

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
