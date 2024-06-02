import MainStyle from "../styles/MainStyle";
import {Image, Text, View} from "react-native";
import {logo_bee_blue} from "../assets";

const LogoBee = () => {
    return (
        <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    marginTop: 35
                }}>
                <Image
                    source={logo_bee_blue}
                    style={{
                        with: 120,
                        height: 120,
                        resizeMode: 'contain',
                    }}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'blue',
                        fontWeight: 'bold',
                        fontSize: 28,
                    }}
                >
                    Ong Vàng
                </Text>
            </View>
        </>
    )
}

export default LogoBee;
