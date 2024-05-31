import {StyleSheet, Text, View} from "react-native";
import {colors} from "../../styles/Colors";

const FormActiveAccount = ({isSubmit}) => {
    return (
        <View style={styles.form}>
            <Text>FormActive</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    form : {
        justifyContent: 'center',
        margin : 15,
        borderRadius : 5,
        backgroundColor: colors.WHITE,

    }
})
export default FormActiveAccount;