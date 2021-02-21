import React, { useEffect } from 'react'
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
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useRef } from 'react';
import { db } from '../helpers/Firebase';

export default function PrayerRequest({ navigation: { goBack } })
{
    const [value, onChangeText] = React.useState('Enter prayer request...');
    const fallAnim = useRef(new Animated.Value(-100)).current
    const stokeAmin = useRef(new Animated.Value(1)).current

    const { currentUser, } = useAuth()

    useEffect(() =>
    {
        Animated.timing(
            fallAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true // Add This line
            },
        ).start();

    }, [])

    const stokeFire = () =>
    {
        Animated.timing(
            stokeAmin,
            {
                toValue: 1.3,
                duration: 100,
                useNativeDriver: true // Add This line
            },
        ).start();

        setTimeout(() =>
        {
            Animated.timing(
                stokeAmin,
                {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true // Add This line
                },
            ).start();
        }, 300);
    }
    const sendRequest = async () =>
    {
        if (value && value != 'Enter prayer request...')
            try
            {
                await db.prayers
                    .add({
                        uid: currentUser ? currentUser.uid : 'null',
                        prayer: value,
                        createdAt: db.getCurrentTimeStamp()
                    })

                onChangeText('Enter prayer request...')

                Alert.alert('Success!', 'Your prayer request has been sent. Jesus loves you!')


                goBack();
            }
            catch (e)
            {
                console.error('Prayer error.' + e)
            }
    }
    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateY: fallAnim }, { scaleX: stokeAmin }, { scaleY: stokeAmin }] }}>
                <TouchableOpacity style={styles.stokeButton} onPress={stokeFire}>
                    <Image
                        style={styles.blueFire}
                        source={require('../assets/blueFire.gif')}
                    />
                </TouchableOpacity>
            </Animated.View>
            <TextInput
                multiline
                numberOfLines={4}
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <TouchableOpacity style={styles.button} onPress={sendRequest}>
                <Text style={styles.title}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white'
    },
    textInput: {
        width: '90%',
        height: Platform.OS === 'ios' ? 125 : 75,
        //backgroundColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    button: {
        margin: 25,
        height: 50,
        width: 150,
        backgroundColor: 'aqua',
        alignItems: 'center',
        justifyContent: 'center'
    },
    blueFire: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        margin: 10,
    },
    stokeButton: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2
    }
})