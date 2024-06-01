import {Dimensions, StyleSheet} from "react-native";
import {colors} from "./Colors";

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

const MainStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: SCREEN_WIDTH,
    },
    dot: {
        width: 10,
        height: 5,
        borderRadius: 10,
        margin: 2,
        backgroundColor: colors.WHITE,
    },
    dotActive: {
        backgroundColor: colors.YELLOW,
        width: 20,
        height: 5,
        borderRadius: 5,
        margin: 2,
    },
    pagination: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
    },
    regis: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        margin: 10
    },
    regisSub: {
        fontSize: 15,
        marginRight: 10
    },
    regisBtn: {
        fontSize: 15,
        color: colors.MAIN_BLUE_CLIENT
    },
    containerForm: {
        margin: 15,
        backgroundColor: colors.WHITE,
        padding: 15,
        borderRadius: 10,
    },
    subTitleForm: {
        color: colors.MAIN_BLUE_CLIENT,
        textAlign: 'center',
        margin: 10,
        fontSize: 15,
        marginBottom: 100
    },
    subLinkForm: {
        color: colors.MAIN_BLUE_CLIENT
    },
    viewSubLinkForm : {
        alignItems: 'flex-end',
        marginBottom: 20
    },
    containerFormActive: {
        justifyContent: 'center',
        margin: 15,
        borderRadius: 5,
        backgroundColor: colors.WHITE,
        padding: 10
    },
    viewImgFormActive: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    otpFormActive: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textErrFormActive: {
        color: colors.ERROR,
        textAlign: 'center',
    },
    titleFormActive: {
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
        color: colors.MAIN_BLUE_CLIENT
    },
    titleOtpFormActive: {
        color: colors.BLACK,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    subTitleFormActive: {
        fontSize: 16,
        marginTop: 20,
    },
    codeFieldRootFormActive: {
        marginTop: 20,
        width: '70%',
        marginLeft: 20,
        marginRight: 20,
    },
    cellRootFormActive: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    focusCellFormActive: {
        borderColor: 'blue',
    },
    countdownTextFormActive: {
        fontSize: 14,
        margin: 30,
        color: colors.MAIN_BLUE_CLIENT
    },
    boxFormActive: {
        height: 50
    }
});
export default MainStyles;
