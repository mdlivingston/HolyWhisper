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
    Platform
} from 'react-native';
import { compareAsc, format, addDays, addHours } from 'date-fns'
import NotificationService from '../notifications/NotificationService';
import { useAuth } from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore';



export default function Home({ navigation })
{
    const { currentUser, login } = useAuth()

    const notifService = new NotificationService(null, null, navigation);
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            try
            {
                if (!currentUser)
                    await login()
            }
            catch (e)
            {
                console.log('Failed to login.' + e)
            }

            //console.log(currentUser)
        }
        asyncFunc();

        //notifService.schedule5Notif()
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true // Add This line
            },
        ).start();

    }, [fadeAnim])


    return (
        <View style={styles.center}>
            <Animated.View style={{ opacity: fadeAnim }}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShowWhisper', { name: 'Jane' })}>
                    {/* <FontAwesomeIcon size={30} style={styles.lightText} icon={faFire} /> */}
                    <Image
                        style={styles.tinyLogo}
                        source={
                            //uri: 'https://tenor.com/view/fire-flames-blue-fire-burning-embers-gif-16971771.gif',
                            require('../assets/blueFire.gif')
                        }
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
        borderColor: 'black',
        borderWidth: .5,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2
    },
    lightText: {
        fontSize: 20,
        color: '#3104ec',
    },
    settingsIcon: {
        position: 'absolute',
        top: 70,
        right: 20
    },
    tinyLogo: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
});