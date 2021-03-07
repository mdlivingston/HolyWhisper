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
import { faShareSquare, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as outlinedHeart } from '@fortawesome/free-regular-svg-icons'
import { getRandomWhisper } from '../helpers/Randomizer';
import { ShareWhisper } from '../helpers/Share';
import { db } from '../helpers/Firebase';
import { useAuth } from '../context/AuthContext';
import NetInfo from "@react-native-community/netinfo";

export default function ShowWhisper({ route, navigation })
{
    const fadeAnim = useRef(new Animated.Value(0)).current
    const delayedFadeAnim = useRef(new Animated.Value(0)).current
    const doubleDelayedFadeAnim = useRef(new Animated.Value(0)).current
    const fireMoveAnim = useRef(new Animated.Value(1000)).current
    const fireGrowAnim = useRef(new Animated.Value(1)).current
    const [randomWhisper, setRandomWhisper] = useState()
    const [favoriteWhisper, setFavoriteWhisper] = useState()
    const [disabled, setDisabled] = useState()

    const { currentUser } = useAuth()

    const { forcedWhisper } = route.params;
    useEffect(() =>
    {

        const asyncFunc = async () =>
        {
            let whisper;
            if (forcedWhisper)
            {
                setRandomWhisper(forcedWhisper)
                whisper = forcedWhisper;
            }
            else
            {
                whisper = await getRandomWhisper()
                setRandomWhisper(whisper)
            }

            handleWordAnimationsEnter()

            await grabFavoriteWhisper(whisper)

        }
        asyncFunc()

    }, [])

    React.useLayoutEffect(() =>
    {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity disabled={disabled} onPress={favoriteWhisper ? onUnFavorite : onFavorite}
                        style={styles.heartButton} >
                        <FontAwesomeIcon size={20} icon={favoriteWhisper ? faHeart : outlinedHeart} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => ShareWhisper({
                        title: 'Share this Holy Whisper',
                        message: `${randomWhisper.text} ${randomWhisper.verse} ${randomWhisper.version} - Sent with the Holy Whisper app!.`
                    })}
                        style={styles.shareButton} >
                        <FontAwesomeIcon size={20} icon={faShareSquare} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, randomWhisper, favoriteWhisper, disabled]);

    const grabFavoriteWhisper = async (whisper) =>
    {
        let fbFavoriteArray = await db.favoriteWhispers.where('verse', '==', whisper.verse).where('uid', '==', currentUser.uid).get()

        fbFavoriteArray = fbFavoriteArray.docs.map(doc => db.formatDoc(doc))

        setFavoriteWhisper(fbFavoriteArray[0])
    }

    const onFavorite = async () =>
    {
        NetInfo.fetch().then(async (state) =>
        {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected)
                await addFavorite()
        });
    }

    const onUnFavorite = async () =>
    {
        await deleteFavorite()
        setFavoriteWhisper(null)
    }

    const addFavorite = async () =>
    {
        setDisabled(true)
        await db.favoriteWhispers.add({
            ...randomWhisper,
            createdAt: db.getCurrentTimeStamp(),
            uid: currentUser.uid
        }).then((data) =>
        {
            console.log(data.id)
            setFavoriteWhisper({ ...randomWhisper, id: data.id })
            setDisabled(false)
        })
    }

    const deleteFavorite = async () =>
    {
        setDisabled(true)
        await db.favoriteWhispers.doc(favoriteWhisper.id).delete()
        setDisabled(false)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={styles.container}>
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

            <Animated.View style={{ transform: [{ translateY: fireMoveAnim }, { scaleY: fireGrowAnim }], ...styles.button }}>
                <TouchableWithoutFeedback onPress={() => newWhisper()}>
                    <Image
                        style={styles.blueFire}
                        source={require('../assets/blueFire.gif')}
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
                toValue: 1000,
                duration: 750,
                useNativeDriver: true // Add This line
            },
        ).start();

        handleWordAnimationsExit();

        setTimeout(async () =>
        {
            let randomW = await getRandomWhisper()
            setRandomWhisper(randomW)

            await grabFavoriteWhisper(randomW)

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
    container: {
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
    heartButton: {
        paddingRight: 20
    },
    shareButton: {
        paddingRight: 15,
    },
    blueFire: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 75,
        marginBottom: 25,
    },
    button: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2
    }
});