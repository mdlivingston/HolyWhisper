import React, { useEffect, useRef, useState } from 'react'
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
    AppState,
    Dimensions,
    Button
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useAuth } from '../context/AuthContext';
import { db, lastActive } from '../helpers/Firebase';
import { allowNotificationKey, getString } from '../helpers/LocalStorage';
//import the TrackPlayer  
import TrackPlayer from 'react-native-track-player';

//function to initialize the Track Player 
const trackPlayerInit = async () =>
{
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add([{
        id: '1',
        url: require('../assets/test.m4a'),
        type: 'default',
        title: 'My Title',
        album: 'My Album',
        artist: 'Rohan Bhatia',
        artwork: 'https://picsum.photos/100',
    },
    {
        id: '2',
        url: require('../assets/test.m4a'),
        type: 'default',
        title: 'My Title',
        album: 'My Album',
        artist: 'Rohan Bhatia',
        artwork: 'https://picsum.photos/100',
    }]);
    await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_JUMP_FORWARD,
            TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
    });
    return true;
};

export default function Lullaby({ navigation })
{
    const { currentUser, login, logout } = useAuth()

    //state to manage whether track player is initialized or not
    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    //initialize the TrackPlayer when the App component is mounted
    useEffect(() =>
    {
        const startPlayer = async () =>
        {
            let isInit = await trackPlayerInit();
            setIsTrackPlayerInit(isInit);
        }
        startPlayer();
    }, []);

    //start playing the TrackPlayer when the button is pressed 
    const onButtonPressed = () =>
    {
        if (!isPlaying)
        {
            TrackPlayer.play();
            setIsPlaying(true);
        } else
        {
            TrackPlayer.pause();
            setIsPlaying(false);
        }
    }
    const onButtonPressedStop = async () =>
    {
        await TrackPlayer.stop();
        setIsPlaying(false);
        await TrackPlayer.add([{
            id: '1',
            url: require('../assets/test.m4a'),
            type: 'default',
            title: 'My Title',
            album: 'My Album',
            artist: 'Rohan Bhatia',
            artwork: 'https://picsum.photos/100',
        },
        {
            id: '2',
            url: require('../assets/test.m4a'),
            type: 'default',
            title: 'My Title',
            album: 'My Album',
            artist: 'Rohan Bhatia',
            artwork: 'https://picsum.photos/100',
        }]);
        console.log(await TrackPlayer.getQueue())
    };


    return (
        <View>

            <View style={styles.center}>


                <Button
                    title="Play"
                    onPress={onButtonPressed}
                    disabled={!isTrackPlayerInit}
                />

                <Button
                    title="Stop"
                    onPress={onButtonPressedStop}
                    disabled={!isTrackPlayerInit}
                />

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
        paddingTop: 10
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