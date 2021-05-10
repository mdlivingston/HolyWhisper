import React, { useEffect, useState, useCallback } from 'react'
import
{
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
    TextInput,
    Dimensions
} from 'react-native';

import { useAuth } from '../../context/AuthContext';
import { useRef } from 'react';
import { db } from '../../helpers/Firebase';
import { SafeAreaView } from 'react-navigation';

const maryAtFeet = require('../../assets/Forgiven_Much.jpeg');
const sweatBlood = require('../../assets/sweatblood.png');
const pilate = require('../../assets/marypregnant.jpeg');



export default function RevelationList({ navigation })
{
    const { currentUser, } = useAuth()
    const [width, setWidth] = useState(Dimensions.get('window').width)

    const onChange = async () =>
    {
        setWidth(Dimensions.get('window').width)
    };

    useEffect(() =>
    {
        Dimensions.addEventListener("change", onChange);
        return () =>
        {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    React.useLayoutEffect(() =>
    {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Home', { name: 'Jane' })}>
                    <Text style={styles.close}>X</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={{ backgroundColor: 'black' }} forceInset={{ bottom: 'never', top: 'never' }}>
            <ScrollView style={styles.scroll}>
                <TouchableOpacity style={styles.imageBox} onPress={() => navigation.navigate('Revelation', { title: 'It Is Better That I Go', imagePath: maryAtFeet, key: 'betterifigo', imageHeight: 400 })}>
                    <Image
                        style={{ width: width, height: 225, resizeMode: 'cover' }}
                        source={maryAtFeet}
                    />
                    <Text style={styles.text}>It is better that I go...</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageBox} onPress={() => navigation.navigate('Revelation', { title: 'A Humble King', imagePath: pilate, key: 'humbleking', imageHeight: 225 })}>
                    <Image
                        style={{ width: width, height: 225, resizeMode: 'stretch' }}
                        source={pilate}
                    />
                    <Text style={styles.text}>A humble King.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageBox} onPress={() => navigation.navigate('Revelation', { title: 'Not My Will But Yours', imagePath: sweatBlood, key: 'comingsoon', imageHeight: 300 })}>
                    <Image
                        style={{ width: width, height: 225, resizeMode: 'stretch' }}
                        source={sweatBlood}
                    />
                    <Text style={styles.text}>Not my will but yours...</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 50,
        left: 15
    },
    close: {
        fontSize: 25,
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    scroll: {
        height: '100%',
        backgroundColor: 'black',
        //padding: 10,
        //paddingTop: 30
        //paddingRight: 10
    },
    text: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        fontSize: 25,
        color: 'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowRadius: 3
    },
    imageBox: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 225,
        // paddingLeft: 10,
        // paddingRight: 10,
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: .5
    }
});