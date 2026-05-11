import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    TouchableWithoutFeedback,
    Linking,
    Platform,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faChevronRight,
    faSlidersH,
    faHeart,
    faBook,
    faCross,
    faComments,
    faComment,
    faGift,
    faBell,
    faClock,
} from '@fortawesome/free-solid-svg-icons'
import { requestUserPermission } from '../helpers/Firebase';
import { allowNotificationKey, getString, reminderTime, storeString } from '../helpers/LocalStorage';
import NotificationService from '../notifications/NotificationService';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Settings({ navigation }) {
    const notifService = new NotificationService(null, null, navigation)
    const [isEnabled, setIsEnabled] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const onChange = async (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        await storeString(reminderTime, currentDate.toLocaleString())
        await notifService.fillScheduledNotifications()
    };

    const showTimepicker = () => setShow(!show);

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    useEffect(() => {
        const asyncFunc = async () => {
            var defaultTime = new Date(Date.now())
            defaultTime.setHours(7);
            defaultTime.setMinutes(0);
            defaultTime.setSeconds(0)
            defaultTime.setMilliseconds(0);

            const storedReminderTime = await getString(reminderTime)
            if (storedReminderTime) setDate(new Date(storedReminderTime))
            else setDate(defaultTime)

            const allowNotif = await getString(allowNotificationKey)
            const hasPermission = await requestUserPermission()

            if (!hasPermission) setIsEnabled(false);
            else if (allowNotif === 'true') setIsEnabled(true)
            else setIsEnabled(false)

            if (!allowNotif && hasPermission) {
                storeString(allowNotificationKey, 'true')
                setIsEnabled(true)
            }
        }
        asyncFunc()
    }, [])

    const toggleSwitch = async () => {
        const accessGranted = await requestUserPermission()
        setIsEnabled(previousState => accessGranted ? !previousState : false);
        if (!accessGranted) Linking.openURL('app-settings:');
        storeString(allowNotificationKey, !isEnabled ? 'true' : 'false')
        if (!isEnabled) await notifService.fillScheduledNotifications()
        else notifService.cancelAll()
    }

    const SettingRow = ({ icon, iconBg, label, onPress, right, isLast }) => (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.row, isLast && styles.rowLast]}
            activeOpacity={onPress ? 0.6 : 1}
        >
            <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
                <FontAwesomeIcon icon={icon} size={15} color="#fff" />
            </View>
            <Text style={styles.rowLabel}>{label}</Text>
            <View style={styles.rowRight}>{right}</View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

            {/* My Whispers */}
            <Text style={styles.sectionHeader}>MY WHISPERS</Text>
            <View style={styles.card}>
                <SettingRow
                    icon={faSlidersH} iconBg="#5856d6"
                    label="Preferred Whispers"
                    onPress={() => navigation.navigate('PreferredWhispers')}
                    right={<FontAwesomeIcon icon={faChevronRight} size={13} color="#c7c7cc" />}
                />
                <SettingRow
                    icon={faHeart} iconBg="#ff3b30"
                    label="Favorite Whispers"
                    onPress={() => navigation.navigate('FavoriteWhispers')}
                    right={<FontAwesomeIcon icon={faChevronRight} size={13} color="#c7c7cc" />}
                />
                <SettingRow
                    icon={faBook} iconBg="#34aadc"
                    label="My Journal"
                    onPress={() => navigation.navigate('JournalList')}
                    right={<FontAwesomeIcon icon={faChevronRight} size={13} color="#c7c7cc" />}
                    isLast
                />
            </View>

            {/* Spiritual */}
            <Text style={styles.sectionHeader}>SPIRITUAL</Text>
            <View style={styles.card}>
                <SettingRow
                    icon={faCross} iconBg="#ff9500"
                    label="Salvation"
                    onPress={() => navigation.navigate('Salvation')}
                    right={<FontAwesomeIcon icon={faChevronRight} size={13} color="#c7c7cc" />}
                />
                <SettingRow
                    icon={faComments} iconBg="#4cd964"
                    label="Prayer Request"
                    onPress={() => navigation.navigate('PrayerRequest')}
                    right={<FontAwesomeIcon icon={faChevronRight} size={13} color="#c7c7cc" />}
                    isLast
                />
            </View>

            {/* Support */}
            <Text style={styles.sectionHeader}>SUPPORT</Text>
            <View style={styles.card}>
                <SettingRow
                    icon={faComment} iconBg="#007aff"
                    label="Submit Feedback"
                    onPress={() => navigation.navigate('Feedback')}
                    right={<FontAwesomeIcon icon={faChevronRight} size={13} color="#c7c7cc" />}
                />
                <SettingRow
                    icon={faGift} iconBg="#ff2d55"
                    label="Donate"
                    onPress={() => Linking.openURL('https://paypal.me/HolyWhisper')}
                    right={<FontAwesomeIcon icon={faChevronRight} size={13} color="#c7c7cc" />}
                    isLast
                />
            </View>

            {/* Notifications */}
            <Text style={styles.sectionHeader}>NOTIFICATIONS</Text>
            <View style={styles.card}>
                <TouchableWithoutFeedback>
                    <View style={styles.row}>
                        <View style={[styles.iconWrap, { backgroundColor: '#ff9500' }]}>
                            <FontAwesomeIcon icon={faBell} size={15} color="#fff" />
                        </View>
                        <Text style={styles.rowLabel}>Daily Whisper Reminders</Text>
                        <View style={styles.rowRight}>
                            <Switch
                                trackColor={{ false: '#d1d1d6', true: '#38fdff' }}
                                thumbColor="#fff"
                                ios_backgroundColor="#d1d1d6"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <SettingRow
                    icon={faClock} iconBg="#5ac8fa"
                    label="Reminder Time"
                    onPress={showTimepicker}
                    right={<Text style={styles.timeText}>{formatAMPM(date)}</Text>}
                    isLast
                />
            </View>

            {show && (
                <View style={styles.pickerWrap}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="time"
                        is24Hour={false}
                        display="spinner"
                        onChange={onChange}
                        textColor="black"
                        style={{ height: 200 }}
                    />
                </View>
            )}

            <Text style={styles.versionText}>Holy Whisper ✦ Made with love for the Kingdom</Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#f2f2f7',
    },
    content: {
        paddingTop: 20,
        paddingBottom: 50,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8e8e93',
        letterSpacing: 0.5,
        marginBottom: 8,
        marginTop: 24,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e5ea',
        minHeight: 52,
    },
    rowLast: {
        borderBottomWidth: 0,
    },
    iconWrap: {
        width: 30,
        height: 30,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    rowLabel: {
        flex: 1,
        fontSize: 16,
        color: '#1c1c1e',
    },
    rowRight: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    timeText: {
        fontSize: 16,
        color: '#8e8e93',
        marginRight: 4,
    },
    pickerWrap: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 12,
        overflow: 'hidden',
    },
    versionText: {
        textAlign: 'center',
        color: '#c7c7cc',
        fontSize: 12,
        marginTop: 36,
    },
});
