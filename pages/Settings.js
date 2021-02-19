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
import { requestUserPermission } from '../components/Firebase';
import { allowNotificationKey, getString, storeString } from '../components/LocalStorage';
import NotificationService from '../notifications/NotificationService';

export default function Settings({ route, navigation })
{
    const notifService = new NotificationService(null, null, navigation)
    const { name } = route.params;
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = async () => 
    {
        const enabled = await requestUserPermission()
        setIsEnabled(previousState => enabled ? !previousState : false);

        if (!enabled)
        {
            Linking.openURL('app-settings:');
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

    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            const allowNotif = await getString(allowNotificationKey)

            const enabled = await requestUserPermission()
            if (!enabled) // Force to false if permissions have change
                setIsEnabled(enabled);
            else if (allowNotif === 'true') //
                setIsEnabled(true)
            else
                setIsEnabled(false)

            if (!allowNotif && enabled)
            {
                storeString(allowNotificationKey, 'true')
                setIsEnabled(true)
            }
        }
        asyncFunc()
    }, [])

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PreferredWhispers', { name: 'Jane' })}>
                <Text style={styles.title}>Preferred Whispers</Text>
                <Text style={{ width: 2, flex: 1 }}></Text>
                <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
            </TouchableOpacity>

            <TouchableWithoutFeedback >
                <View style={styles.section}>
                    <Text style={styles.title}>Daily Whisper Notifications</Text>
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

            {/* <TouchableOpacity
                style={styles.button}
                onPress={() => notifService.localNotif()}
            >
                <Text>
                    Test Notification
                </Text>
            </TouchableOpacity> */}

        </View>
    )
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