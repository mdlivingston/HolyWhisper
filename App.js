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
import RevelationList from './pages/Revelations/RevelationList';
import { handleFirebaseInit } from './helpers/Firebase';
import { allowNotificationKey, getString } from './helpers/LocalStorage';
import { AuthProvider } from './context/AuthContext';
import PrayerRequest from './pages/PrayerRequest';
import Feedback from './pages/Feedback';
import FavoriteWhispers from './pages/FavoriteWhispers';
import Salvation from './pages/Salvation';
import Revelation from './pages/Revelations/Revelation';

const Stack = createStackNavigator();


export default function App()
{

    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            await handleFirebaseInit()

        }
        asyncFunc();

    }, [])

    return (
        <AuthProvider>
            <NavigationContainer>
                {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : <StatusBar barStyle="light-content" />}
                <Stack.Navigator initialRouteName="Home" detachInactiveScreens={true}>
                    <Stack.Screen name="Home" options={{
                        title: '',
                        headerTransparent: true,
                    }} component={Home} />

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

                    <Stack.Screen name="Salvation" options={{
                        title: "Salvation",
                        headerTransparent: false,
                        headerBackTitleVisible: false,
                        headerTintColor: 'black'
                    }} component={Salvation} />

                    <Stack.Screen name="Revelations" options={{
                        title: "Revelations",
                        headerTransparent: false,
                        headerBackTitleVisible: false,
                        headerTintColor: 'black',
                        headerShown: true,
                        headerTitleStyle: {
                            fontSize: 20,
                            fontStyle: 'italic'
                        },
                        headerStyle: {
                            backgroundColor: '#38fdff'
                        },
                    }} component={RevelationList} />

                    <Stack.Screen name="Revelation" options={{
                        title: "Revelation",
                        headerTransparent: false,
                        headerBackTitleVisible: false,
                        headerTintColor: 'black',
                        headerShown: true,
                        headerTitleStyle: {
                            fontSize: 20,
                            fontStyle: 'italic'
                        },
                        headerStyle: {
                            backgroundColor: '#38fdff'
                        },
                    }} component={Revelation} />

                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>

    );
}

const styles = StyleSheet.create({
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
