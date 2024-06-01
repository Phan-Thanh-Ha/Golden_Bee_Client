import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Store } from "./src/Redux";
import { LogBox, Text, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import RootNavigator from "./src/Navigation/RootNavigation";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import Toast from "react-native-toast-message";

const App = () => {
    useEffect(() => {
        LogBox.ignoreAllLogs(true);
    }, []);
    return (
        <Provider store={Store}>
            <ApplicationProvider {...eva} theme={eva.light}>
                <MenuProvider>
                    <RootNavigator />
                    <Toast/>
                </MenuProvider>
            </ApplicationProvider>
        </Provider>
    );
};

export default App;
