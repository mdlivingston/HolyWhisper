import React, { useEffect, useState } from 'react'
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
    Switch,
    TouchableWithoutFeedback,
    Linking
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { requestUserPermission } from '../helpers/Firebase';
import { allowNotificationKey, getString, storeString } from '../helpers/LocalStorage';
import NotificationService from '../notifications/NotificationService';
import { getRandomWhisper, truncate } from '../helpers/Randomizer';

export default function Settings({ navigation })
{
    const notifService = new NotificationService(null, null, navigation)
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            const allowNotif = await getString(allowNotificationKey)

            const enabled = await requestUserPermission()
            if (!enabled) // Force to false if permissions have change
                setIsEnabled(false);
            else if (allowNotif === 'true') //
                setIsEnabled(true)
            else
                setIsEnabled(false)

            if (!allowNotif && enabled) // if there is local storage string && enabled
            {
                storeString(allowNotificationKey, 'true')
                setIsEnabled(true)
            }
        }
        asyncFunc()
    }, [])

    const toggleSwitch = async () => 
    {
        const enabled = await requestUserPermission()
        setIsEnabled(previousState => enabled ? !previousState : false);

        if (!enabled)
        {
            Linking.openURL('app-settings:'); // Go to settings
        }

        storeString(allowNotificationKey, !isEnabled ? 'true' : 'false')

        if (!isEnabled) // True
        {
            await notifService.fillScheduledNotifications()
        }
        else
            notifService.cancelAll()

        notifService.getScheduledLocalNotifications(notifs => console.log(notifs))
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PreferredWhispers', { name: 'Jane' })}>
                    <Text style={styles.title}>Preferred Whispers</Text>
                    <Text style={{ width: 2, flex: 1 }}></Text>
                    <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('FavoriteWhispers', { name: 'Jane' })}>
                    <Text style={styles.title}>Favorite Whispers</Text>
                    <Text style={{ width: 2, flex: 1 }}></Text>
                    <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Salvation', { name: 'Jane' })}>
                    <Text style={styles.title}>Salvation</Text>
                    <Text style={{ width: 2, flex: 1 }}></Text>
                    <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PrayerRequest', { name: 'Jane' })}>
                    <Text style={styles.title}>Prayer Request</Text>
                    <Text style={{ width: 2, flex: 1 }}></Text>
                    <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Feedback', { name: 'Jane' })}>
                    <Text style={styles.title}>Submit Feedback</Text>
                    <Text style={{ width: 2, flex: 1 }}></Text>
                    <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
                </TouchableOpacity>
                <TouchableWithoutFeedback >
                    <View style={styles.section}>
                        <Text style={styles.title}>Daily Whisper Reminders</Text>
                        <Text style={{ width: 2, flex: 1 }}></Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "limegreen" }}
                            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('ReminderTime', { name: 'Jane' })}>
                    <Text style={styles.title}>Reminder Time</Text>
                    <Text style={{ width: 2, flex: 1 }}></Text>
                    <Text style={{ color: 'grey' }}>7:00 AM </Text>
                    <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
                </TouchableOpacity>

                {/* <TouchableOpacity
                style={styles.button}
                onPress={() => testNotif()}
            >
                <Text>
                    Test Notification
                </Text>
            </TouchableOpacity> */}

            </View>
        </ScrollView>
    )

    async function testNotif()
    {
        // let random = await getRandomWhisper();
        // notifService.schedule5Notif(null, 'Your Daily Whisper Has Arrived! 🔥', `${truncate(random.text, 100)} ${random.verse}`, null, random)
        notifService.schedule5Notif(null, 'Your Daily Whisper Has Arrived! 🔥', `Tap to recieve it!`, 'default', {})
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: .5,
    },
    title: {
        width: '80%',
    }
});