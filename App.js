import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
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
    Platform
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFire, faCog } from '@fortawesome/free-solid-svg-icons'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Settings from './pages/Settings';
import AddWhisper from './pages/AddWhisper';
import BackgroundFetch from 'react-native-background-fetch';
import NotificationService from './notifications/NotificationService';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();
const notifService = new NotificationService();

async function requestUserPermission()
{
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled)
    {
        console.log('Authorization status:', authStatus);
    }
}

export default function App()
{
    const appState = useRef(AppState.currentState);
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() =>
    {
        const handleFirebaseInit = async () =>
        {
            await requestUserPermission()
            let token = await messaging().getToken();
            console.log(token)

            const unsubscribe = messaging().onMessage(async remoteMessage =>
            {
                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            });
            return unsubscribe;
        }

        handleFirebaseInit()

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
        if (appState.current.match(/inactive|background/) && nextAppState === "active")
        {
            PushNotification.setApplicationIconBadgeNumber(0);
            console.log("App has come to the foreground!");
        }

        appState.current = nextAppState;
        console.log("AppState", appState.current);
    };

    return (
        <NavigationContainer>
            {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : <StatusBar barStyle="light-content" />}
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" options={({ navigation, route }) => (
                    {
                        title: '',
                        headerTransparent: true,
                        headerRight: () => (
                            <Animated.View style={{ opacity: fadeAnim }}>
                                <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings', { name: 'Jane' })}>
                                    <FontAwesomeIcon size={20} icon={faCog} />
                                </TouchableOpacity>
                            </Animated.View>
                        ),
                    })} component={Home} />

                <Stack.Screen name="Settings" options={{
                    headerTransparent: false,
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }} component={Settings} />

                <Stack.Screen name="AddWhisper" options={{
                    title: "Add Whisper",
                    headerTransparent: false,
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }} component={AddWhisper} />
            </Stack.Navigator>
        </NavigationContainer>
    );

};

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
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        borderRadius: 5,
        justifyContent: 'center',
    },
    lightText: {
        fontSize: 20
    },
    settingsIcon: {
        paddingRight: 30,
    }
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
