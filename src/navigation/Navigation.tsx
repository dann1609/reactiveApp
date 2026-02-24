import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import { useColorScheme } from 'react-native';
import { getTheme } from '../theme';
import { BottomTabBar } from '../components';
import CartScreen from '../screens/cart/CartScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    );
}

export default function Navigation() {

    const scheme = useColorScheme();

    const theme = getTheme(scheme);

    return (
        <NavigationContainer theme={theme}>
            <RootStack />
            <BottomTabBar />
        </NavigationContainer>
    );
}
