import React, { useRef, useEffect } from 'react'
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
    Platform
} from 'react-native';
import { ShareWhisper } from '../components/Share';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { identity } from '../whispers/Identity';

function getRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

export default function ShowWhisper({ navigation })
{
    const fadeAnim = useRef(new Animated.Value(0)).current
    const delayedFadeAnim = useRef(new Animated.Value(0)).current
    const randomIndex = getRandomInt(identity.length - 1)

    let shareOptions = {
        title: 'Share this Holy Whisper',
        message: `"${identity[randomIndex].text}" ${identity[randomIndex].verse} ${identity[randomIndex].version}`
    };

    React.useLayoutEffect(() =>
    {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => ShareWhisper(shareOptions)} style={styles.shareButton} >
                    <FontAwesomeIcon size={20} icon={faShareSquare} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

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

        setTimeout(() =>
        {
            Animated.timing(
                delayedFadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true // Add This line
                },
            ).start();
        }, 1000)


    }, [fadeAnim, delayedFadeAnim])

    return (
        <View style={styles.center}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={{ ...styles.text }}>
                    {identity[randomIndex].text}
                </Text>
            </Animated.View>
            <Animated.View style={{ opacity: delayedFadeAnim }}>
                <Text style={styles.verse}>
                    {identity[randomIndex].verse} &nbsp;
                    <Text style={styles.version}>
                        {identity[randomIndex].version}
                    </Text>
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
        paddingLeft: 25,
        paddingRight: 25
    },
    text: {
        fontSize: 24,
        fontStyle: 'italic',
        textAlign: 'left'
    },
    verse: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    version: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    shareButton: {
        paddingRight: 15,
    }
});