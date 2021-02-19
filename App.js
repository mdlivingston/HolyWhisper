import 'react-native-gesture-handler';
import { NavigationContainer, Tab } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import
{
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert,
    Button,
    Animated,
    AppState,
    Platform,
    Image
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Settings from './pages/Settings';
import GetWhisper from './pages/GetWhisper';
import BackgroundFetch from 'react-native-background-fetch';
import NotificationService from './notifications/NotificationService';
import PushNotification from 'react-native-push-notification';
import ShowWhisper from './pages/ShowWhisper';
import PreferredWhispers from './pages/PreferredWhispers';
import { handleFirebaseInit } from './components/Firebase';
import { allowNotificationKey, getString } from './components/LocalStorage';

const Stack = createStackNavigator();
const notifService = new NotificationService();

export default function App()
{

    const appState = useRef(AppState.currentState);

    const fadeAnim = useRef(new Animated.Value(0)).current


    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            await handleFirebaseInit()

            if (await getString(allowNotificationKey) === 'true')
                await notifService.fillScheduledNotifications()

            notifService.getScheduledLocalNotifications(notifs => console.log(notifs))
        }
        asyncFunc();


        setTimeout(() =>
        {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true // Add This line
                },
            ).start();
        }, 2000)

        AppState.addEventListener("change", _handleAppStateChange);

        return () =>
        {
            AppState.removeEventListener("change", _handleAppStateChange);
        };

    }, [fadeAnim])


    const _handleAppStateChange = (nextAppState) =>
    {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        )
        {
            console.log("App has come to the foreground!");
        }

        appState.current = nextAppState;
        console.log("AppState", appState.current);
    };

    return (
        <NavigationContainer>
            {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : <StatusBar barStyle="light-content" />}
            <Stack.Navigator initialRouteName="Home" detachInactiveScreens={true}>
                <Stack.Screen name="Home" options={({ navigation, route }) => (
                    {
                        title: '',
                        headerTransparent: true,
                        headerRight: () => (
                            <Animated.View style={{ opacity: fadeAnim }}>

                                <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings', { name: 'Jane' })}>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('./assets/cross2.png')}
                                    />
                                </TouchableOpacity>

                            </Animated.View>
                        ),
                    })} component={Home} />

                <Stack.Screen name="Settings" options={{
                    headerTransparent: false,
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }} component={Settings} />

                <Stack.Screen name="GetWhisper" options={{
                    title: "Get Whisper",
                    headerTransparent: false,
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }} component={GetWhisper} />

                <Stack.Screen name="ShowWhisper" options={{
                    title: "",
                    headerTransparent: true,
                    headerBackTitleVisible: false,
                    headerTintColor: 'black',

                }} component={ShowWhisper} />

                <Stack.Screen name="PreferredWhispers" options={{
                    title: "Preferred Whispers",
                    headerTransparent: false,
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }} component={PreferredWhispers} />
            </Stack.Navigator>
        </NavigationContainer>
    );


}

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        // backgroundColor: 'red'
    },
    button: {
        alignItems: "center",
        // backgroundColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    lightText: {
        fontSize: 20
    },
    settingsIcon: {
        paddingRight: 15,
    },
    tinyLogo: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
});


// BackgroundFetch.configure(
//     {
//         minimumFetchInterval: 15, // minutes
//         startOnBoot: true,
//     },
//     (id) =>
//     {
//         notifService.localNotif()

//         console.log("Received background fetch event: " + id);
//         BackgroundFetch.finish(id);
//     },
//     (error) =>
//     {
//         console.log("Background fetch failed to start with error: " + error);
//     }
// );
