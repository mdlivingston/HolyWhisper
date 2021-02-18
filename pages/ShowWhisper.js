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
    Platform
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { getRandomWhisper } from '../components/Categories';
import { removeValue } from '../components/LocalStorage';
import { ShareWhisper } from '../components/Share';


export default function ShowWhisper({ navigation })
{
    const fadeAnim = useRef(new Animated.Value(0)).current
    const delayedFadeAnim = useRef(new Animated.Value(0)).current
    const doubleDelayedFadeAnim = useRef(new Animated.Value(0)).current
    const [randomWhisper, setRandomWhisper] = useState()

    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            let randomW = await getRandomWhisper()
            setRandomWhisper(randomW)

            handleAnimations()
        }
        asyncFunc()
        //removeValue()
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
        </ScrollView>
    )

    function handleAnimations()
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
    }
}

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
        paddingLeft: 25,
        paddingRight: 25
    },
    text: {
        fontSize: 24,
        fontStyle: 'italic',
        alignSelf: "flex-start"
    },
    verse: {
        fontSize: 20,
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

});