import React, { useRef, useEffect, useState } from 'react'
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
    Platform,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { getRandomWhisper } from '../components/Randomizer';
import { removeValue } from '../components/LocalStorage';
import { ShareWhisper } from '../components/Share';

export default function ShowWhisper({ navigation })
{
    const fadeAnim = useRef(new Animated.Value(0)).current
    const delayedFadeAnim = useRef(new Animated.Value(0)).current
    const doubleDelayedFadeAnim = useRef(new Animated.Value(0)).current
    const fireMoveAnim = useRef(new Animated.Value(1000)).current
    const fireGrowAnim = useRef(new Animated.Value(1)).current
    const [randomWhisper, setRandomWhisper] = useState()

    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            let randomW = await getRandomWhisper()
            setRandomWhisper(randomW)

            handleWordAnimationsEnter(1)
        }
        asyncFunc()

    }, [])

    React.useLayoutEffect(() =>
    {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => ShareWhisper({
                    title: 'Share this Holy Whisper',
                    message: `${randomWhisper.text} ${randomWhisper.verse} ${randomWhisper.version}`
                })}
                    style={styles.shareButton} >
                    <FontAwesomeIcon size={20} icon={faShareSquare} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, randomWhisper]);


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={styles.center}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={{ ...styles.text }}>
                    {randomWhisper ? randomWhisper.text : ''}
                </Text>
            </Animated.View>
            <Animated.View style={{ opacity: delayedFadeAnim }}>
                <Text style={styles.verse}>
                    {randomWhisper ? randomWhisper.verse : ''} &nbsp;
                    <Text style={styles.version}>
                        {randomWhisper ? randomWhisper.version : ''}
                    </Text>
                </Text>
                <Animated.View style={{ opacity: doubleDelayedFadeAnim }}>
                    <Text style={styles.category}>
                        {randomWhisper ? `-${randomWhisper.category}` : ''}
                    </Text>
                </Animated.View>
            </Animated.View>

            <Animated.View style={{ transform: [{ translateY: fireMoveAnim }, { scaleY: fireGrowAnim }], }}>
                <TouchableWithoutFeedback onPress={() => newWhisper()}>
                    <Image
                        style={styles.tinyLogo}
                        source={
                            //uri: 'https://tenor.com/view/fire-flames-blue-fire-burning-embers-gif-16971771.gif',
                            require('../assets/blueFire.gif')
                        }
                    />
                </TouchableWithoutFeedback>
            </Animated.View>
        </ScrollView>
    )

    async function newWhisper()
    {
        Animated.timing(
            fireGrowAnim,
            {
                toValue: 1.9,
                duration: 500,
                useNativeDriver: true // Add This line
            },

        ).start();

        Animated.timing(

            fireMoveAnim,
            {
                toValue: 500,
                duration: 750,
                useNativeDriver: true // Add This line
            },
        ).start();

        handleWordAnimationsExit();

        setTimeout(async () =>
        {
            let randomW = await getRandomWhisper()
            setRandomWhisper(randomW)

            handleWordAnimationsEnter()
        }, 1000);
    }

    function handleWordAnimationsEnter()
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
        }, 2000);

        setTimeout(() =>
        {
            Animated.timing(
                doubleDelayedFadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true // Add This line
                },
            ).start();
        }, 3000);

        Animated.timing(
            fireGrowAnim,
            {
                toValue: 1,
                duration: 100,
                useNativeDriver: true // Add This line
            },

        ).start();

        Animated.timing(
            fireMoveAnim,
            {
                toValue: 0,
                duration: 8000,
                useNativeDriver: true // Add This line
            },
        ).start();
    }

    function handleWordAnimationsExit()
    {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true // Add This line
            },
        ).start();


        Animated.timing(
            delayedFadeAnim,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true // Add This line
            },
        ).start();

        Animated.timing(
            doubleDelayedFadeAnim,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true // Add This line
            },
        ).start();

    }
}

const styles = StyleSheet.create({
    center: {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 20
    },
    text: {
        fontSize: Platform.OS == 'ios' ? 24 : 20,
        fontStyle: 'italic',
        alignSelf: "flex-start",
        paddingTop: 10,
    },
    verse: {
        fontSize: Platform.OS == 'ios' ? 20 : 16,
        fontWeight: 'bold',
        padding: 10,
        alignSelf: 'flex-end'
    },
    version: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    category: {
        fontSize: 12,
        fontStyle: 'italic',
        alignSelf: 'flex-end'
    },
    shareButton: {
        paddingRight: 15,
    },
    tinyLogo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 75,
        marginBottom: 25
    },

});