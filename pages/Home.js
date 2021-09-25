import React, { useEffect, useRef } from 'react'
import
{
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    //TouchableOpacity,
    Alert,
    Animated,
    Image,
    Platform,
    AppState,
    Dimensions
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useAuth } from '../context/AuthContext';
import { db, lastActive } from '../helpers/Firebase';
import { allowNotificationKey, getString } from '../helpers/LocalStorage';
import NotificationService from '../notifications/NotificationService';
import messaging from '@react-native-firebase/messaging';

// Had to import this because header buttons in android did not work
import { TouchableOpacity } from 'react-native-gesture-handler'

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
            // Workaround for killed app notification bug https://github.com/zo0r/react-native-push-notification/issues/1955#issuecomment-821520367
            notifService.popInitialNotification()

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

        const sub = AppState.addEventListener("change", _handleAppStateChange);

        return () =>
        {
            sub.remove()
            //AppState.removeEventListener("change", _handleAppStateChange);
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
                        source={require('../assets/gear.gif')}
                    />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity style={styles.revelationIcon} onPress={() => navigation.navigate('Revelations', { name: 'Jane' })}>
                    <Image
                        style={styles.revelationGif}
                        source={require('../assets/revelation.gif')}
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
        <View>

            <View style={styles.center}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShowWhisper', { name: 'Jane' })}>
                    <Image
                        style={styles.blueFire}
                        source={require('../assets/blueFire.gif')}
                    />
                </TouchableOpacity>



                <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'ShadowsIntoLight' }} onPress={() => navigation.navigate('ShowWhisper', { name: 'Jane' })}>
                    Get a Whisper
                </Text>
            </View>

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
    blueLight: {
        position: 'absolute',
        top: 0
    },
    blueFire: {
        width: 85,
        height: 85,
        resizeMode: 'contain'
    },
    settingsIcon: {
        paddingRight: 15,
        paddingTop: 10,
        zIndex: 99,
    },
    revelationIcon: {
        paddingLeft: 15,
        paddingTop: 0
    },
    crossIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    revelationGif: {
        width: 45,
        height: 45,
        resizeMode: 'contain'
    }
});