import React, { useEffect, useRef } from 'react'
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
    Animated,
    Image,
    Platform,
    AppState
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useAuth } from '../context/AuthContext';
import { db, lastActive } from '../helpers/Firebase';
import { allowNotificationKey, getString } from '../helpers/LocalStorage';
import NotificationService from '../notifications/NotificationService';
import messaging from '@react-native-firebase/messaging';

export default function Home({ navigation })
{
    const { currentUser, login, logout } = useAuth()
    const appState = useRef(AppState.currentState);
    const fadeAnim = useRef(new Animated.Value(0)).current
    const notifService = new NotificationService(null, null, navigation);

    useEffect(() =>
    {

        const asyncFunc = async () =>
        {
            try
            {
                if (!currentUser)
                    await login().then((e) => console.log('Login Done'))
                else
                {
                    let fcmToken = await messaging().getToken();
                    await lastActive(currentUser, fcmToken)
                }
            }
            catch (e)
            {
                console.log('Failed to login.' + e)
            }

            if (await getString(allowNotificationKey) === 'true')
                await notifService.fillScheduledNotifications()

            //notifService.getScheduledLocalNotifications(notifs => console.log(notifs))

            //console.log(currentUser)
        }

        asyncFunc();

        AppState.addEventListener("change", _handleAppStateChange);

        return () =>
        {
            AppState.removeEventListener("change", _handleAppStateChange);
        };

    }, [fadeAnim, currentUser])

    useEffect(() =>
    {
        //On screen load no matter the history
        const unsubscribe = navigation.addListener('focus', async () =>
        {
            PushNotification.setApplicationIconBadgeNumber(0);

            if (currentUser)
            {
                await lastActive(currentUser)
            }
        });

        return unsubscribe;
    }, [currentUser])


    React.useLayoutEffect(() =>
    {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings', { name: 'Jane' })}>
                    <Image
                        style={styles.crossIcon}
                        source={require('../assets/cross2.png')}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const _handleAppStateChange = async (nextAppState) =>
    {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        )
        {
            if (currentUser)
            {
                await lastActive(currentUser)
            }
            console.log("App has come to the foreground!");
        }

        appState.current = nextAppState;
        console.log("AppState", appState.current);
    };

    return (
        <View style={styles.center}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShowWhisper', { name: 'Jane' })}>
                <Image
                    style={styles.blueFire}
                    source={require('../assets/blueFire.gif')}
                />
            </TouchableOpacity>

            <Text style={{ textAlign: 'center', fontStyle: 'italic', fontSize: 13 }} onPress={() => navigation.navigate('ShowWhisper', { name: 'Jane' })}>
                Get a Whisper
                </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',

    },
    button: {
        alignItems: "center",
        // borderColor: 'lightgrey',
        //borderWidth: .5,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1
    },
    blueFire: {
        width: 85,
        height: 85,
        resizeMode: 'contain'
    },
    settingsIcon: {
        paddingRight: 15,
        paddingTop: 10
    },
    crossIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
});