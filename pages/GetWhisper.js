import React, { useEffect } from 'react'
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
    Animated
} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
import NotificationService from '../notifications/NotificationService';


export default function GetWhisper()
{
    function onNotif(notif)
    {
        Alert.alert(notif.title, notif.message);
    }

    const notifService = new NotificationService(null, onNotif.bind());

    function sendTestNotification()
    {
        notifService.localNotif()
    }
    function sendScheduledTestNoftification()
    {
        notifService.scheduleNotif(new Date(Date.now() + 10 * 1000))
    }
    useEffect(() =>
    {

    }, [])
    return (
        <View style={styles.center}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => sendTestNotification()}
            >
                <Text>
                    Test Notification
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => sendScheduledTestNoftification()}
            >
                <Text>
                    Test Notification in 10 seconds
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => notifService.getScheduledLocalNotifications(notifs => console.log(notifs))}
            >
                <Text>
                    Get Scheduled Notifications
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                {
                    notifService.cancelAll();
                }}>
                <Text>Cancel all notifications</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white'
    },
    button: {
        alignItems: "center",
        // backgroundColor: Colors.dark,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '60%',
        borderRadius: 5,
        justifyContent: 'center',
        margin: 10
    },
    lightText: {
        fontSize: 20
        // color: 'white',
    },
    settingsIcon: {
        paddingRight: 30,
        // paddingTop: 30
        // position: 'absolute',
        // top: 70,
        // right: 20
    }
});