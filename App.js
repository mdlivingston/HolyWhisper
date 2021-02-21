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
import ShowWhisper from './pages/ShowWhisper';
import PreferredWhispers from './pages/PreferredWhispers';
import { handleFirebaseInit } from './helpers/Firebase';
import { allowNotificationKey, getString } from './helpers/LocalStorage';
import { AuthProvider } from './context/AuthContext';
import PrayerRequest from './pages/PrayerRequest';
import Feedback from './pages/Feedback';
import FavoriteWhispers from './pages/FavoriteWhispers';

const Stack = createStackNavigator();
const notifService = new NotificationService();

export default function App()
{
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

    }, [fadeAnim])

    return (
        <AuthProvider>
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
                                            style={styles.crossIcon}
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
                        headerTransparent: false,
                        headerBackTitleVisible: false,
                        headerTintColor: 'black',

                    }} component={ShowWhisper} />

                    <Stack.Screen name="PreferredWhispers" options={{
                        title: "Preferred Whispers",
                        headerTransparent: false,
                        headerBackTitleVisible: false,
                        headerTintColor: 'black'
                    }} component={PreferredWhispers} />

                    <Stack.Screen name="PrayerRequest" options={{
                        title: "Prayer Request",
                        headerTransparent: false,
                        headerBackTitleVisible: false,
                        headerTintColor: 'black'
                    }} component={PrayerRequest} />

                    <Stack.Screen name="Feedback" options={{
                        title: "Feedback",
                        headerTransparent: false,
                        headerBackTitleVisible: false,
                        headerTintColor: 'black'
                    }} component={Feedback} />

                    <Stack.Screen name="FavoriteWhispers" options={{
                        title: "Favorite Whispers",
                        headerTransparent: false,
                        headerBackTitleVisible: false,
                        headerTintColor: 'black'
                    }} component={FavoriteWhispers} />

                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    settingsIcon: {
        paddingRight: 15,
    },
    crossIcon: {
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
