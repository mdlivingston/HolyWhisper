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
import { useAuth } from '../context/AuthContext';
import { db } from '../helpers/Firebase';

export default function Home({ navigation })
{
    const { currentUser, login } = useAuth()
    const appState = useRef(AppState.currentState);
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

            console.log(currentUser)
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

    }, [fadeAnim])

    const _handleAppStateChange = async (nextAppState) =>
    {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        )
        {
            if (currentUser)
            {
                try
                {
                    await db.lastActive.doc(currentUser.uid)
                        .set({
                            uid: currentUser ? currentUser.uid : 'null',
                            lastActive: db.getCurrentTimeStamp()
                        })
                }
                catch (e)
                {
                    console.error('LastActive update failed.' + e)
                }
            }
            console.log("App has come to the foreground!");
        }

        appState.current = nextAppState;
        console.log("AppState", appState.current);
    };


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
    blueFire: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
});