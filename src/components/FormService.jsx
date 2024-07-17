import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import InputNumber from "./InputNumber";
import InputCheckBox from "./InputCheckBox";
import { RoundUpNumber } from "../utils/RoundUpNumber";
import MainStyles from "../styles/MainStyle";
import { colors } from "../styles/Colors";

const validationSchema = Yup.object().shape({
  room: Yup.number()
    .required("Vui lòng nhập số phòng")
    .min(1, "Vui lòng nhập số phòng"),
  people: Yup.number()
    .required("Vui lòng nhập số lượng nhân sự")
    .min(1, "Số lượng nhân sự phải lớn hơn 0"),
});

const FormService = ({
  onSubmit,
  onChange,
  timeWorking,
  Service,
  TotalPrice,
}) => {
  const navi = useNavigation();
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          room: 1,
          people: 1,
          premium: false,
          otherService: [],
          note: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // navi.navigate(ScreenNames.CONFIRM_BOOKING, {
          //   dataConfirmService: {
          //     ...Service,
          //     TotalPrice: TotalPrice,
          //     workingTime: timeWorking,
          //     ...values,
          //   },
          // });
          if (onSubmit && typeof onSubmit === "function") {
            onSubmit(values);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          onSubmit.current = handleSubmit;
          if (onChange && typeof onChange === "function") {
            onChange(values);
          }
          return (
            <View>
              <Text style={styles.title}>Số phòng</Text>
              <InputNumber
                value={values.room}
                setFieldValue={setFieldValue}
                fieldName="room"
                min={0}
              />
              {errors.room && touched.room && (
                <Text style={MainStyles.textErr}>{errors.room}</Text>
              )}
              <Text style={styles.title}>Số lượng nhân sự</Text>
              <InputNumber
                value={values.people}
                setFieldValue={setFieldValue}
                fieldName="people"
                min={0}
              />
              {errors.people && touched.people && (
                <Text style={MainStyles.textErr}>{errors.people}</Text>
              )}
              <View
                style={[MainStyles.flexRowFlexStart, { alignItems: "center" }]}
              >
                <Text style={[{ marginRight: 10 }, styles.title]}>
                  Thời lượng :
                </Text>
                <Text
                  style={{
                    color: colors.MAIN_COLOR_CLIENT,
                    fontWeight: "bold",
                  }}
                >
                  Trong {RoundUpNumber(timeWorking, 0)} giờ{" "}
                </Text>
              </View>

              {Service?.Detail.length > 0 && (
                <Text style={styles.title}>Dịch vụ thêm</Text>
              )}
              <InputCheckBox
                data={Service?.Detail}
                selectedValues={values.otherService}
                onChange={(item) => {
                  const newSelectedValues = values.otherService.some(
                    (value) => value.ServiceDetailId === item.ServiceDetailId
                  )
                    ? values.otherService.filter(
                      (value) =>
                        value.ServiceDetailId !== item.ServiceDetailId
                    )
                    : [...values.otherService, item];
                  setFieldValue("otherService", newSelectedValues);
                  if (onChange && typeof onChange === "function") {
                    onChange({ ...values, otherService: newSelectedValues });
                  }
                }}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 10,
    margin: 2,
    borderRadius: 5,
  },
  premium: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderColor: colors.GRAY,
    borderWidth: 1,
  },
  title: {
    margin: 10,
  },
});


export default FormService;