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
    Linking,
    Platform
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { requestUserPermission } from '../helpers/Firebase';
import { allowNotificationKey, getString, reminderTime, storeString } from '../helpers/LocalStorage';
import NotificationService from '../notifications/NotificationService';
import { getRandomWhisper, truncate } from '../helpers/Randomizer';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Settings({ navigation })
{
    const notifService = new NotificationService(null, null, navigation)
    const [isEnabled, setIsEnabled] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const onChange = async (event, selectedDate) =>
    {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        await storeString(reminderTime, currentDate.toLocaleString())
        await notifService.fillScheduledNotifications()
        console.log(currentDate)
    };

    const showTimepicker = () =>
    {
        setShow(!show)
    };

    function formatAMPM(date)
    {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            // HANDLE LOCAL STORAGE REMINDER TIME
            var defaultTime = new Date(Date.now())
            defaultTime.setHours(7);
            defaultTime.setMinutes(0);
            defaultTime.setSeconds(0)
            defaultTime.setMilliseconds(0);

            const storedReminderTime = await getString(reminderTime)

            if (storedReminderTime)
                setDate(new Date(storedReminderTime))
            else
                setDate(defaultTime)

            // HANDLE NOTIFCATION SWITCH AND PERMISSIONS
            const allowNotif = await getString(allowNotificationKey)
            const hasPermission = await requestUserPermission()

            if (!hasPermission) // Force to false if permissions have change
                setIsEnabled(false);
            else if (allowNotif === 'true') //
                setIsEnabled(true)
            else
                setIsEnabled(false)

            if (!allowNotif && hasPermission) // if there is local storage string && enabled
            {
                storeString(allowNotificationKey, 'true')
                setIsEnabled(true)
            }
        }
        asyncFunc()
    }, [])

    const toggleSwitch = async () => 
    {
        const accessGranted = await requestUserPermission()
        setIsEnabled(previousState => accessGranted ? !previousState : false);

        if (!accessGranted)
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
                <TouchableOpacity style={styles.section} onPress={showTimepicker}>
                    <Text style={styles.title}>Reminder Time</Text>
                    <Text style={{ width: 2, flex: 1 }}></Text>
                    <Text style={{ color: 'grey' }}>{formatAMPM(date)}</Text>
                    {/* <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} /> */}
                </TouchableOpacity>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'time'}
                        is24Hour={false}
                        display="spinner"
                        onChange={onChange}
                        textColor="black"
                        style={{ height: 200 }}
                    />
                )}

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

    // async function testNotif()
    // {
    //     let random = await getRandomWhisper();
    //     notifService.schedule5Notif(null, 'Your Daily Whisper Has Arrived! 🔥', `${truncate(random.text, 100)} ${random.verse}`, null, random)
    //     //notifService.schedule5Notif(null, 'Your Daily Whisper Has Arrived! 🔥', `Tap to recieve it!`, 'default', {})
    // }
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