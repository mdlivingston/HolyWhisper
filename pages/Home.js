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
    Animated
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFire, faCog } from '@fortawesome/free-solid-svg-icons'
import { compareAsc, format, addDays, addHours } from 'date-fns'
import NotificationService from '../notifications/NotificationService';

export default function Home({ navigation })
{
    const notifService = new NotificationService();

    const fadeAnim = useRef(new Animated.Value(0)).current
    useEffect(() =>
    {

        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true // Add This line
            },
        ).start();

        for (let i = 1; i <= 64; i++)
        {
            var now = addDays(new Date(Date.now()), i)
            now.setHours(8);
            now.setMinutes(0);
            now.setMilliseconds(0);

            //console.log(result.toLocaleDateString())
            //notifService.scheduleNotif(now)
        }

    }, [fadeAnim])


    return (
        <View style={styles.center}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AddWhisper', { name: 'Jane' })}
                >
                    <FontAwesomeIcon size={30} style={styles.lightText} icon={faFire} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
                    Add a Whisper
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
        borderColor: 'black',
        borderWidth: 1,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    lightText: {
        fontSize: 20
        // color: 'white',
    },
    settingsIcon: {
        position: 'absolute',
        top: 70,
        right: 20
    }
});