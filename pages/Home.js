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
import { db } from '../helpers/Firebase';
import { allowNotificationKey, getString } from '../helpers/LocalStorage';
import NotificationService from '../notifications/NotificationService';

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
                    await lastActive()
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

        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true // Add This line
            },
        ).start();

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
                await lastActive()
            }
        });

        return unsubscribe;
    }, [currentUser])


    React.useLayoutEffect(() =>
    {
        navigation.setOptions({
            headerRight: () => (
                <Animated.View style={{ opacity: fadeAnim }}>
                    <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings', { name: 'Jane' })}>
                        <Image
                            style={styles.crossIcon}
                            source={require('../assets/cross2.png')}
                        />
                    </TouchableOpacity>
                </Animated.View>
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
                await lastActive()
            }
            console.log("App has come to the foreground!");
        }

        appState.current = nextAppState;
        console.log("AppState", appState.current);
    };

    const lastActive = async () =>
    {
        try
        {
            await db.lastActive.doc(currentUser.uid)
                .set({
                    uid: currentUser.uid,
                    lastActive: db.getCurrentTimeStamp()
                }, { merge: true }).then(() => console.log('Last Active Recorded'))
        }
        catch (e)
        {
            console.error('LastActive update failed.' + e)
        }
    }




    return (
        <View style={styles.center}>
            <Animated.View style={{ opacity: fadeAnim }}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShowWhisper', { name: 'Jane' })}>
                    <Image
                        style={styles.blueFire}
                        source={require('../assets/blueFire.gif')}
                    />
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', fontStyle: 'italic', fontSize: 13 }}>
                    Get a Whisper
                </Text>
            </Animated.View>

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
        borderColor: 'lightgrey',
        borderWidth: .5,
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
        width: 55,
        height: 55,
        resizeMode: 'contain'
    },
    settingsIcon: {
        paddingRight: 15,
    },
    crossIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
});