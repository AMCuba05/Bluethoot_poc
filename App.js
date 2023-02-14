import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BluetoothScanner from "./src/screens/Bluethoot";
import Webview from "./src/screens/Webview";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={BluetoothScanner} />
                <Stack.Screen name="Webview" component={Webview} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
